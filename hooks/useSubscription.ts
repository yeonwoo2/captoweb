'use client';

import { useEffect, useState } from 'react';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export interface Subscription {
  plan: 'free' | 'basic' | 'pro';
  status: 'active' | 'expired' | 'suspended';
  startDate: Date;
  endDate: Date | null;
  captureLimit: number;
  features: {
    canCapture: boolean;
    canUseAutoCapture: boolean;
    maxCapturesPerMonth: number;
  };
}

export interface UsageData {
  captureCount: number;
  lastCaptureAt: Date | null;
  month: string; // Format: "2026-03"
}

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setSubscription(null);
      setUsage(null);
      setLoading(false);
      return;
    }

    // 1. users 컬렉션에서 사용자 구독 정보 실시간 구독
    const userRef = doc(db, 'users', user.uid);
    const unsubscribeUser = onSnapshot(
      userRef,
      async (userDoc) => {
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const subscriptionPlan = userData.subscription_plan || 'free';

          console.log('🔍 [useSubscription] userData:', userData);
          console.log('🔍 [useSubscription] subscriptionPlan:', subscriptionPlan);

          // 2. subscriptions 컬렉션에서 플랜 정의 조회 (JOIN)
          const planRef = doc(db, 'subscriptions', subscriptionPlan);
          const planDoc = await getDoc(planRef);

          console.log('🔍 [useSubscription] planDoc exists:', planDoc.exists());

          if (planDoc.exists()) {
            const planData = planDoc.data();
            console.log('🔍 [useSubscription] planData:', planData);

            // 3. 두 데이터 병합
            setSubscription({
              plan: subscriptionPlan,
              status: userData.status || 'active',
              startDate: userData.start_date?.toDate() || new Date(),
              endDate: userData.end_date?.toDate() || null,
              captureLimit: planData.features?.max_captures_per_month || 100,
              features: {
                canCapture: planData.features?.can_capture ?? true,
                canUseAutoCapture: planData.features?.can_use_auto_capture ?? false,
                maxCapturesPerMonth: planData.features?.max_captures_per_month || 100,
              },
            });
          } else {
            // subscriptions 문서가 없으면 기본 Free 플랜 설정
            setSubscription({
              plan: 'free',
              status: 'active',
              startDate: new Date(),
              endDate: null,
              captureLimit: 100,
              features: {
                canCapture: true,
                canUseAutoCapture: false,
                maxCapturesPerMonth: 100,
              },
            });
          }
        } else {
          // users 문서가 없으면 기본 Free 플랜 설정 (회원가입 실패 케이스)
          setSubscription({
            plan: 'free',
            status: 'active',
            startDate: new Date(),
            endDate: null,
            captureLimit: 100,
            features: {
              canCapture: true,
              canUseAutoCapture: false,
              maxCapturesPerMonth: 100,
            },
          });
        }
      },
      (error) => {
        console.error('Error fetching user subscription:', error);
        // 에러 발생 시에도 기본 Free 플랜으로 설정
        setSubscription({
          plan: 'free',
          status: 'active',
          startDate: new Date(),
          endDate: null,
          captureLimit: 100,
          features: {
            canCapture: true,
            canUseAutoCapture: false,
            maxCapturesPerMonth: 100,
          },
        });
        setLoading(false);
      }
    );

    // 4. 현재 월의 사용량 가져오기
    const currentMonth = new Date().toISOString().slice(0, 7); // "2026-03"
    const usageRef = doc(db, 'usage', user.uid, 'monthly', currentMonth);

    const unsubscribeUsage = onSnapshot(
      usageRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setUsage({
            captureCount: data.capture_count || 0,
            lastCaptureAt: data.last_capture_at?.toDate() || null,
            month: currentMonth,
          });
        } else {
          // 사용량 정보가 없으면 기본값으로 설정 (첫 캡처 전)
          setUsage({
            captureCount: 0,
            lastCaptureAt: null,
            month: currentMonth,
          });
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching usage:', error);
        // 에러 발생 시에도 기본값 설정
        setUsage({
          captureCount: 0,
          lastCaptureAt: null,
          month: currentMonth,
        });
        setLoading(false);
      }
    );

    return () => {
      unsubscribeUser();
      unsubscribeUsage();
    };
  }, [user]);

  return { subscription, usage, loading };
}
