'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

export default function VerifyEmailPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState<'free' | 'basic' | 'pro'>('free');
  const [isChecking, setIsChecking] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // 세션 스토리지에서 이메일과 플랜 정보 가져오기
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('verifyEmail');
    const storedPlan = sessionStorage.getItem('selectedPlan');

    if (!storedEmail || !storedPlan) {
      // 정보가 없으면 회원가입 페이지로 리다이렉트
      router.push('/signup');
      return;
    }

    setEmail(storedEmail);
    if (storedPlan === 'free' || storedPlan === 'basic' || storedPlan === 'pro') {
      setPlan(storedPlan);
    }
  }, [router]);

  // 이메일 인증 상태 주기적으로 확인
  useEffect(() => {
    if (!user || loading) return;

    const checkEmailVerification = async () => {
      setIsChecking(true);

      // Firebase user 정보 새로고침
      await user.reload();

      if (user.emailVerified) {
        // 이메일 인증 완료!
        sessionStorage.removeItem('verifyEmail');

        // 플랜에 따라 분기
        if (plan === 'free') {
          // Free 플랜은 대시보드로
          sessionStorage.removeItem('selectedPlan');
          router.push('/dashboard');
        } else {
          // 유료 플랜은 결제 페이지로
          router.push('/signup/payment');
        }
      }

      setIsChecking(false);
    };

    // 5초마다 확인
    const interval = setInterval(checkEmailVerification, 5000);

    // 최초 1번 즉시 확인
    checkEmailVerification();

    return () => clearInterval(interval);
  }, [user, loading, plan, router]);

  // 인증 메일 재전송 (사용자가 버튼 클릭 시에만)
  const handleResendEmail = async () => {
    if (!user || resendCooldown > 0) return;

    try {
      const { sendEmailVerification } = await import('firebase/auth');
      await sendEmailVerification(user);

      alert('인증 메일을 다시 발송했습니다. 이메일함을 확인해주세요.');

      // 60초 쿨다운
      setResendCooldown(60);
      const countdown = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error: any) {
      console.error('이메일 재전송 실패:', error);
      if (error.code === 'auth/too-many-requests') {
        alert('너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        alert('이메일 재전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  const planInfo = {
    free: { name: 'Free', emoji: '✨' },
    basic: { name: 'Basic', emoji: '⭐' },
    pro: { name: 'Pro', emoji: '🚀' },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-dark px-4">
      <motion.div
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <Link href="/" className="inline-block mb-8">
          <span className="text-4xl font-bold text-primary">Capto</span>
        </Link>

        {/* Card */}
        <div className="bg-bg-medium rounded-2xl p-8 shadow-xl">
          {/* Icon */}
          <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            이메일을 확인해주세요
          </h1>

          <p className="text-text-secondary mb-2">
            {planInfo[plan].emoji} {planInfo[plan].name} 플랜으로 가입하셨습니다
          </p>

          <p className="text-text-secondary mb-8">
            <span className="text-primary font-semibold">{email}</span>
            <br />
            위 주소로 인증 메일을 발송했습니다.
          </p>

          {/* 인증 확인 중 상태 */}
          {isChecking && (
            <div className="mb-6 flex items-center justify-center gap-2 text-text-secondary">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span>인증 확인 중...</span>
            </div>
          )}

          {/* 안내 사항 */}
          <div className="bg-bg-dark rounded-lg p-6 mb-6 text-left">
            <h3 className="text-white font-semibold mb-3">📧 다음 단계</h3>
            <ol className="text-text-secondary text-sm space-y-2">
              <li>1. 이메일함을 확인하세요</li>
              <li>2. Capto에서 보낸 인증 메일을 찾으세요</li>
              <li>3. 메일 안의 인증 링크를 클릭하세요</li>
              <li>4. 자동으로 다음 단계로 이동합니다</li>
            </ol>
          </div>

          {/* 재전송 버튼 */}
          <button
            onClick={handleResendEmail}
            disabled={resendCooldown > 0}
            className="w-full py-3 bg-bg-light text-white rounded-lg font-semibold hover:bg-bg-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {resendCooldown > 0
              ? `${resendCooldown}초 후 재전송 가능`
              : '인증 메일 다시 보내기'}
          </button>

          {/* 이메일 못 받았을 때 */}
          <div className="text-text-tertiary text-sm">
            <p className="mb-2">이메일을 받지 못하셨나요?</p>
            <ul className="text-left space-y-1">
              <li>• 스팸함을 확인해보세요</li>
              <li>• 이메일 주소가 올바른지 확인하세요</li>
              <li>• 몇 분 후에 다시 시도해보세요</li>
            </ul>
          </div>
        </div>

        {/* 로그인 링크 */}
        <p className="text-center text-text-secondary mt-6">
          이미 인증하셨나요?{' '}
          <Link
            href="/login"
            className="text-primary hover:text-[#4752c4] transition-colors font-semibold"
          >
            로그인
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
