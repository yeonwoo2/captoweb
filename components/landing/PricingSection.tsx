'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '무료',
    badge: null,
    monthly: '100회',
    features: [
      { text: '월 100회 캡처', included: true },
      { text: '기본 갤러리 관리', included: true },
      { text: '자동 캡처', included: false },
      { text: '우선 지원', included: false },
      { text: 'API 접근', included: false },
    ],
    cta: '시작하기',
    highlighted: false,
  },
  {
    id: 'basic',
    name: 'Basic',
    price: '₩9,900',
    priceUnit: '/월',
    badge: '⭐ 인기',
    monthly: '500회',
    features: [
      { text: '월 500회 캡처', included: true },
      { text: '무제한 갤러리 저장', included: true },
      { text: '자동 캡처', included: true },
      { text: 'UI 요소 탐색', included: true },
      { text: 'API 접근', included: false },
    ],
    cta: '지금 구독',
    highlighted: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₩29,900',
    priceUnit: '/월',
    badge: '🚀 최고',
    monthly: '무제한',
    features: [
      { text: '무제한 캡처', included: true },
      { text: '무제한 갤러리 저장', included: true },
      { text: '자동 캡처', included: true },
      { text: 'UI 요소 탐색', included: true },
      { text: 'API 접근', included: true },
      { text: '우선 지원', included: true },
    ],
    cta: '지금 구독',
    highlighted: false,
  },
];

export default function PricingSection() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleSelectPlan = (planId: string) => {
    // 세션 스토리지에 플랜 정보 저장
    sessionStorage.setItem('selectedPlan', planId);
    // 회원가입 페이지로 바로 이동
    router.push('/signup/register');
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-20 bg-bg-medium"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            요금제
          </h2>
          <p className="text-xl text-text-secondary">
            필요에 맞는 플랜을 선택하세요
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-primary transform md:-translate-y-4 shadow-2xl border-2 border-white/20'
                  : 'bg-bg-dark hover:bg-bg-light hover:-translate-y-2'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-warning text-bg-dark px-4 py-1 rounded-full text-sm font-bold">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className={`text-2xl font-bold mb-4 ${plan.highlighted ? 'text-white' : 'text-white'}`}>
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <span className={`text-5xl font-bold ${plan.highlighted ? 'text-white' : 'text-white'}`}>
                  {plan.price}
                </span>
                {plan.priceUnit && (
                  <span className={`text-lg ${plan.highlighted ? 'text-white/80' : 'text-text-secondary'}`}>
                    {plan.priceUnit}
                  </span>
                )}
              </div>

              {/* Monthly Limit */}
              <p className={`text-lg mb-6 ${plan.highlighted ? 'text-white/90' : 'text-text-secondary'}`}>
                {plan.monthly} / 월
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className={`mr-2 ${feature.included ? (plan.highlighted ? 'text-white' : 'text-success') : 'text-text-tertiary'}`}>
                      {feature.included ? '✓' : '✗'}
                    </span>
                    <span className={plan.highlighted ? 'text-white/90' : 'text-text-secondary'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`block w-full py-3 px-6 rounded-lg font-semibold text-center transition-all ${
                  plan.highlighted
                    ? 'bg-white text-primary hover:bg-gray-100'
                    : 'bg-primary text-white hover:bg-[#4752c4]'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Message */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-text-secondary text-lg">
            💰 모든 플랜 7일 무료 체험 가능
          </p>
        </motion.div>
      </div>
    </section>
  );
}
