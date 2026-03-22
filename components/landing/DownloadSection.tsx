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

  const handleDownload = () => {
    // TODO: Firebase Storage 또는 GitHub Releases에서 DMG 다운로드
    // Google Analytics 이벤트 트래킹 추가
    console.log('Download initiated');
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
            macOS 10.13 이상 지원
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

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="w-full md:w-auto px-12 py-4 bg-white text-primary rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg mb-6"
            >
              macOS용 다운로드 (DMG)
            </button>

            {/* Features List */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white/90">
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Intel & Apple Silicon</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>무료 체험 가능</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>클릭 한 번으로 설치</span>
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
