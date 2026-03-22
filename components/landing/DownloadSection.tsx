'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function DownloadSection() {
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

  const handleDownload = (platform: 'macos' | 'windows') => {
    // TODO: Firebase Storage 또는 GitHub Releases에서 다운로드
    // Google Analytics 이벤트 트래킹 추가
    console.log(`Download initiated for ${platform}`);
  };

  return (
    <section
      id="download"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-primary via-[#7983f5] to-primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            지금 바로 Capto를
            <br />
            다운로드하세요
          </h2>

          <p className="text-xl text-white/90 mb-12">
            macOS 10.13 이상 • Windows 10 이상 지원
          </p>

          {/* App Icon & Info */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 mb-8 border border-white/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Icon */}
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <Image
                src="/images/capto-icon.svg"
                alt="Capto Icon"
                width={96}
                height={96}
                className="w-full h-full"
              />
            </div>

            {/* Version Info */}
            <h3 className="text-2xl font-bold text-white mb-2">
              Capto 1.0.0
            </h3>
            <p className="text-white/70 mb-8">81MB</p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button
                onClick={() => handleDownload('macos')}
                className="px-12 py-4 bg-white text-primary rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                macOS 다운로드
              </button>
              <button
                onClick={() => handleDownload('windows')}
                className="px-12 py-4 bg-white text-primary rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 12V6.75l6-1.32v6.48L3 12m6-7.25L21 3v9h-12V4.75M3 13l6 .09v6.81l-6-1.15V13m6 .09L21 13v9l-12-1.65V13.09Z"/>
                </svg>
                Windows 다운로드
              </button>
            </div>

            {/* Platform Support */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white/90 text-sm">
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Intel & Apple Silicon</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Windows 10/11</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>무료 체험 가능</span>
              </div>
            </div>
          </motion.div>

          {/* Alternative CTA */}
          <motion.p
            className="text-white/80 text-lg"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            또는 계정을 만들고 웹에서 시작하기
            <br />
            <Link
              href="/signup"
              className="text-white underline hover:text-white/80 transition-colors font-semibold"
            >
              회원가입 →
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
