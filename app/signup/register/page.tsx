'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState<'free' | 'basic' | 'pro'>('free');

  // 세션 스토리지에서 플랜 정보 가져오기
  useEffect(() => {
    const selectedPlan = sessionStorage.getItem('selectedPlan');

    // 유효한 플랜만 허용
    if (selectedPlan === 'free' || selectedPlan === 'basic' || selectedPlan === 'pro') {
      setPlan(selectedPlan);
    } else {
      // 유효하지 않은 경우 플랜 선택 페이지로 리다이렉트
      router.push('/signup');
    }
  }, [router]);

  const planInfo = {
    free: { name: 'Free', emoji: '✨', description: '무료로 시작합니다' },
    basic: { name: 'Basic', emoji: '⭐', description: 'Basic 플랜으로 시작합니다' },
    pro: { name: 'Pro', emoji: '🚀', description: 'Pro 플랜으로 시작합니다' },
  };

  const currentPlan = planInfo[plan];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    if (!agreedToTerms) {
      setError('이용약관에 동의해주세요.');
      return;
    }

    setLoading(true);

    try {
      // 선택한 플랜과 함께 회원가입
      await signUp(email, password, plan);

      // 이메일 주소를 세션 스토리지에 저장 (인증 페이지에서 사용)
      sessionStorage.setItem('verifyEmail', email);

      // 이메일 인증 페이지로 리다이렉트 (플랜 정보는 이미 selectedPlan에 저장됨)
      router.push('/signup/verify-email');
    } catch (err: any) {
      // Firebase 에러 코드를 사용자 친화적인 메시지로 변환
      const errorCode = err.code;
      let errorMessage = '회원가입에 실패했습니다.';

      if (errorCode === 'auth/email-already-in-use') {
        errorMessage = '이미 사용 중인 이메일 주소입니다.';
      } else if (errorCode === 'auth/invalid-email') {
        errorMessage = '유효하지 않은 이메일 주소입니다.';
      } else if (errorCode === 'auth/operation-not-allowed') {
        errorMessage = '이메일/비밀번호 계정이 활성화되어 있지 않습니다.';
      } else if (errorCode === 'auth/weak-password') {
        errorMessage = '비밀번호가 너무 약합니다. 더 강력한 비밀번호를 사용해주세요.';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-dark px-4 py-12">
      <motion.div
        className="max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back to Plans */}
        <Link
          href="/signup"
          className="inline-flex items-center text-text-secondary hover:text-white transition-colors mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          플랜 다시 선택
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-4xl font-bold text-primary">Capto</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-bg-medium rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            Capto 계정 만들기
          </h1>
          <p className="text-text-secondary text-center mb-8">
            {currentPlan.emoji} {currentPlan.description}
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-danger/10 border border-danger text-danger px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-text-secondary mb-2">
                이메일
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-bg-dark text-white rounded-lg border border-bg-light focus:border-primary focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-text-secondary mb-2">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-bg-dark text-white rounded-lg border border-bg-light focus:border-primary focus:outline-none transition-colors"
                placeholder="••••••••"
              />
              <p className="text-text-tertiary text-sm mt-1">
                최소 6자 이상
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-text-secondary mb-2">
                비밀번호 확인
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-bg-dark text-white rounded-lg border border-bg-light focus:border-primary focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            {/* Terms Agreement */}
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 mr-2"
              />
              <span className="text-text-secondary text-sm">
                <Link href="/terms" className="text-primary hover:underline">
                  이용약관
                </Link>
                {' '}및{' '}
                <Link href="/privacy" className="text-primary hover:underline">
                  개인정보처리방침
                </Link>
                에 동의합니다
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-[#4752c4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '회원가입 중...' : '회원가입'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-text-secondary mt-8">
            이미 계정이 있나요?{' '}
            <Link
              href="/login"
              className="text-primary hover:text-[#4752c4] transition-colors font-semibold"
            >
              로그인
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
