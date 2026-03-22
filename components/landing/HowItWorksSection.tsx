'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    number: '1',
    title: 'Capto 다운로드',
    description: 'macOS 10.13 이상에서 무료 사용',
    icon: '💻',
  },
  {
    number: '2',
    title: '기기 연결',
    description: 'USB로 iPhone/iPad 또는 Android 연결',
    icon: '🔌',
  },
  {
    number: '3',
    title: '캡처 시작',
    description: '원클릭으로 고품질 스크린샷 저장',
    icon: '📸',
  },
];

export default function HowItWorksSection() {
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

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-20 bg-bg-dark"
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
            사용 방법
          </h2>
          <p className="text-xl text-text-secondary">
            3단계로 간편하게 시작하세요
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative flex items-start mb-12 last:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Timeline Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-12 top-24 w-0.5 h-full bg-primary/30" />
              )}

              {/* Step Number Circle */}
              <div className="relative z-10 flex-shrink-0 w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {step.number}
              </div>

              {/* Step Content */}
              <div className="ml-8 flex-1">
                <div className="bg-bg-medium rounded-xl p-8 hover:bg-bg-light transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <span className="text-5xl mr-4">{step.icon}</span>
                    <h3 className="text-2xl font-bold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-text-secondary text-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            href="/signup"
            className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-[#4752c4] transition-all transform hover:scale-105 shadow-lg"
          >
            지금 무료로 시작하기
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
