'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const scrollToDownload = () => {
    router.push('/#download');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-text-secondary">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Header */}
      <header className="bg-bg-medium border-b border-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Capto</h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-bg-dark text-text-secondary rounded-lg hover:bg-bg-light transition-colors"
          >
            로그아웃
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            안녕하세요, {user.email}님
          </h2>
          <p className="text-text-secondary">
            Capto 대시보드에 오신 것을 환영합니다
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Plan Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-bg-medium rounded-xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-4">현재 플랜</h3>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-primary">Free</span>
                <span className="px-3 py-1 bg-success/20 text-success rounded-full text-sm font-semibold">
                  활성화 ✓
                </span>
              </div>
              <p className="text-text-secondary">무료 플랜</p>
            </div>
            <div className="space-y-2">
              <button className="w-full py-2 bg-primary text-white rounded-lg hover:bg-[#4752c4] transition-colors font-semibold">
                플랜 업그레이드
              </button>
              <button className="w-full py-2 bg-bg-dark text-text-secondary rounded-lg hover:bg-bg-light transition-colors">
                구독 취소
              </button>
            </div>
          </motion.div>

          {/* Usage Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-bg-medium rounded-xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-4">이번 달 사용량</h3>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-text-secondary">캡처 횟수</span>
                <span className="text-white font-semibold">0 / 100 회</span>
              </div>
              <div className="w-full bg-bg-dark rounded-full h-3">
                <div className="bg-primary h-3 rounded-full" style={{ width: '0%' }} />
              </div>
            </div>
            <p className="text-text-tertiary text-sm">
              남은 횟수: 100회
            </p>
          </motion.div>

          {/* Quick Start Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-bg-medium rounded-xl p-8 lg:col-span-2"
          >
            <h3 className="text-xl font-bold text-white mb-6">빠른 시작</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={scrollToDownload}
                className="p-6 bg-bg-dark rounded-lg hover:bg-bg-light transition-colors text-left"
              >
                <div className="text-3xl mb-3">💻</div>
                <h4 className="text-white font-semibold mb-2">
                  1. Capto 다운로드
                </h4>
                <p className="text-text-tertiary text-sm">
                  macOS용 앱 설치하기
                </p>
              </button>

              <button className="p-6 bg-bg-dark rounded-lg hover:bg-bg-light transition-colors text-left">
                <div className="text-3xl mb-3">🔌</div>
                <h4 className="text-white font-semibold mb-2">
                  2. 기기 연결 방법
                </h4>
                <p className="text-text-tertiary text-sm">
                  USB 연결 가이드 보기
                </p>
              </button>

              <button className="p-6 bg-bg-dark rounded-lg hover:bg-bg-light transition-colors text-left">
                <div className="text-3xl mb-3">📸</div>
                <h4 className="text-white font-semibold mb-2">
                  3. 첫 캡처 시작
                </h4>
                <p className="text-text-tertiary text-sm">
                  화면 캡처하는 방법
                </p>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
