'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-dark/95 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Capto</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-text-secondary hover:text-primary transition-colors"
            >
              기능
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-text-secondary hover:text-primary transition-colors"
            >
              요금제
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-text-secondary hover:text-primary transition-colors"
            >
              사용법
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-text-secondary hover:text-primary transition-colors"
            >
              FAQ
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => scrollToSection('download')}
              className="px-4 py-2 text-text-secondary hover:text-primary transition-colors"
            >
              다운로드
            </button>

            {/* 로그인 상태에 따라 다른 버튼 표시 */}
            {loading ? (
              // 로딩 중일 때는 기존 버튼 표시
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-text-secondary hover:text-primary transition-colors"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-[#4752c4] transition-colors font-semibold"
                >
                  시작하기
                </Link>
              </>
            ) : user ? (
              // 로그인된 사용자는 대시보드 버튼 표시
              <Link
                href="/dashboard"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-[#4752c4] transition-colors font-semibold"
              >
                대시보드
              </Link>
            ) : (
              // 로그인하지 않은 사용자는 로그인/회원가입 버튼 표시
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-text-secondary hover:text-primary transition-colors"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-[#4752c4] transition-colors font-semibold"
                >
                  시작하기
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-text-primary">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
