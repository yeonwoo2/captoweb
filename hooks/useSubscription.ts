'use client';

import { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
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

    // Firestore에서 구독 정보 실시간 구독
    const subscriptionRef = doc(db, 'subscriptions', user.uid);
    const unsubscribeSubscription = onSnapshot(
      subscriptionRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setSubscription({
            plan: data.plan || 'free',
            status: data.status || 'active',
            startDate: data.startDate?.toDate() || new Date(),
            endDate: data.endDate?.toDate() || null,
            captureLimit: data.captureLimit || 100,
            features: data.features || {
              canCapture: true,
              canUseAutoCapture: false,
              maxCapturesPerMonth: 100,
            },
          });
        } else {
          // 구독 정보가 없으면 기본 Free 플랜으로 설정 (로컬만)
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
        console.error('Error fetching subscription:', error);
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

    // 현재 월의 사용량 가져오기
    const currentMonth = new Date().toISOString().slice(0, 7); // "2026-03"
    const usageRef = doc(db, 'usage', user.uid, 'monthly', currentMonth);

    const unsubscribeUsage = onSnapshot(
      usageRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setUsage({
            captureCount: data.captureCount || 0,
            lastCaptureAt: data.lastCaptureAt?.toDate() || null,
            month: currentMonth,
          });
        } else {
          // 사용량 정보가 없으면 기본값으로 설정 (로컬만)
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
      unsubscribeSubscription();
      unsubscribeUsage();
    };
  }, [user]);

  return { subscription, usage, loading };
}
