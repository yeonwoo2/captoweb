'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const router = useRouter();

  const handleSelectPlan = (planId: string) => {
    // 세션 스토리지에 플랜 정보 저장
    sessionStorage.setItem('selectedPlan', planId);
    // 회원가입 페이지로 이동
    router.push('/signup/register');
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '무료',
      priceKRW: null,
      badge: null,
      description: '개인 사용자를 위한 무료 플랜',
      features: [
        '월 100회 캡처',
        '기본 캡처 기능',
        '고품질 PNG 저장',
        '갤러리 관리',
      ],
      notIncluded: [
        '자동 캡처',
        '우선 지원',
        'API 접근',
      ],
    },
    {
      id: 'basic',
      name: 'Basic',
      price: '₩9,900',
      priceKRW: 9900,
      badge: '⭐ 인기',
      description: '전문가를 위한 베스트 초이스',
      features: [
        '월 500회 캡처',
        '모든 캡처 기능',
        '자동 캡처 지원',
        '고품질 PNG 저장',
        '갤러리 관리',
      ],
      notIncluded: [
        '우선 지원',
        'API 접근',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '₩29,900',
      priceKRW: 29900,
      badge: '🚀 최고',
      description: '팀과 기업을 위한 프리미엄 플랜',
      features: [
        '무제한 캡처',
        '모든 캡처 기능',
        '자동 캡처 지원',
        '우선 지원',
        'API 접근',
        '고급 분석',
      ],
      notIncluded: [],
    },
  ];

  return (
    <div className="min-h-screen bg-bg-dark py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="inline-block mb-8">
            <span className="text-4xl font-bold text-primary">Capto</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            시작할 플랜을 선택하세요
          </h1>
          <p className="text-xl text-text-secondary">
            언제든지 플랜을 변경할 수 있습니다
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`bg-bg-medium rounded-2xl p-8 relative ${
                plan.id === 'basic' ? 'ring-2 ring-primary transform md:-translate-y-4' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                  {plan.badge}
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-text-tertiary text-sm mb-4">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <div className="text-4xl font-bold text-white mb-1">
                  {plan.price}
                </div>
                {plan.priceKRW && (
                  <div className="text-text-secondary">
                    /월 (VAT 포함)
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-3 rounded-lg font-semibold mb-8 transition-colors ${
                  plan.id === 'basic'
                    ? 'bg-primary text-white hover:bg-[#4752c4]'
                    : 'bg-bg-light text-white hover:bg-bg-dark'
                }`}
              >
                {plan.id === 'free' ? '무료로 시작하기' : '시작하기'}
              </button>

              {/* Features */}
              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-success mr-3 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-text-secondary">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feature) => (
                  <div key={feature} className="flex items-start opacity-50">
                    <svg
                      className="w-5 h-5 text-text-tertiary mr-3 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="text-text-tertiary">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-text-secondary mb-4">
            💰 모든 플랜 7일 무료 체험 가능
          </p>
          <p className="text-text-secondary">
            이미 계정이 있나요?{' '}
            <Link
              href="/login"
              className="text-primary hover:text-[#4752c4] transition-colors font-semibold"
            >
              로그인
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
