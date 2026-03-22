'use client';

import Link from 'next/link';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-bg-dark border-t border-bg-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-primary">Capto</span>
            </Link>
            <p className="text-text-tertiary text-sm">
              iOS & Android 화면 캡처
              <br />
              전문 도구
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">제품</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-text-tertiary hover:text-primary transition-colors text-sm"
                >
                  기능
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-text-tertiary hover:text-primary transition-colors text-sm"
                >
                  요금제
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('download')}
                  className="text-text-tertiary hover:text-primary transition-colors text-sm"
                >
                  다운로드
                </button>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">지원</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/docs"
                  className="text-text-tertiary hover:text-primary transition-colors text-sm"
                >
                  문서
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/guides"
                  className="text-text-tertiary hover:text-primary transition-colors text-sm"
                >
                  가이드
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-text-tertiary hover:text-primary transition-colors text-sm"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">회사</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-text-tertiary hover:text-primary transition-colors text-sm"
                >
                  소개
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-text-tertiary hover:text-primary transition-colors text-sm"
                >
                  블로그
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@capto.app"
                  className="text-text-tertiary hover:text-primary transition-colors text-sm"
                >
                  연락처
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-bg-light my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-text-tertiary text-sm mb-4 md:mb-0">
            © 2026 Capto. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link
              href="/privacy"
              className="text-text-tertiary hover:text-primary transition-colors text-sm"
            >
              개인정보처리방침
            </Link>
            <Link
              href="/terms"
              className="text-text-tertiary hover:text-primary transition-colors text-sm"
            >
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
