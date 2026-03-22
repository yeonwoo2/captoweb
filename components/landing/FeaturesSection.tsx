'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const features = [
  {
    icon: '📱',
    title: 'iOS & Android 지원',
    description: 'USB 연결만으로 간편하게',
  },
  {
    icon: '⚡',
    title: '실시간 캡처',
    description: '현재 화면 즉시 캡처',
  },
  {
    icon: '🎨',
    title: '고품질 이미지',
    description: '원본 해상도 PNG 저장',
  },
  {
    icon: '🤖',
    title: '자동 캡처',
    description: 'UI 탐색 중 자동 스크린샷',
  },
  {
    icon: '💾',
    title: '갤러리 관리',
    description: '캡처한 이미지 쉽게 관리',
  },
  {
    icon: '🔍',
    title: 'UI 요소 탐색',
    description: '앱 UI 계층 구조 파악',
  },
];

export default function FeaturesSection() {
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
      id="features"
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
            강력한 기능
          </h2>
          <p className="text-xl text-text-secondary">
            Capto가 제공하는 핵심 기능을 확인하세요
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-bg-medium rounded-xl p-8 hover:bg-bg-light transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{feature.icon}</div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
