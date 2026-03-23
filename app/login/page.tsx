'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      // Firebase 에러 코드를 사용자 친화적인 메시지로 변환
      const errorCode = err.code;
      let errorMessage = '로그인에 실패했습니다.';

      if (errorCode === 'auth/invalid-credential' || errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
        errorMessage = '이 정보와 일치하는 계정을 찾을 수 없어요.';
      } else if (errorCode === 'auth/invalid-email') {
        errorMessage = '유효하지 않은 이메일 주소입니다.';
      } else if (errorCode === 'auth/user-disabled') {
        errorMessage = '비활성화된 계정입니다. 고객 지원팀에 문의하세요.';
      } else if (errorCode === 'auth/too-many-requests') {
        errorMessage = '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-dark px-4">
      <motion.div
        className="max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-4xl font-bold text-primary">Capto</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-bg-medium rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Capto에 로그인
          </h1>

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
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-text-secondary text-sm">
                  로그인 상태 유지
                </span>
              </label>
              <Link
                href="/forgot-password"
                className="text-primary hover:text-[#4752c4] transition-colors text-sm"
              >
                비밀번호 찾기
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-[#4752c4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-text-secondary mt-8">
            계정이 없으신가요?{' '}
            <Link
              href="/signup"
              className="text-primary hover:text-[#4752c4] transition-colors font-semibold"
            >
              회원가입
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
