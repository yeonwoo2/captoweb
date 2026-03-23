'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

export default function PaymentPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [plan, setPlan] = useState<'free' | 'basic' | 'pro'>('free');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'kakao' | 'naver' | 'virtual'>('card');
  const [country, setCountry] = useState('대한민국');
  const [city, setCity] = useState('');
  const [saveAddress, setSaveAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  // 세션 스토리지에서 플랜 정보 가져오기
  useEffect(() => {
    if (!user) {
      router.push('/signup');
      return;
    }

    const selectedPlan = sessionStorage.getItem('selectedPlan');
    if (selectedPlan === 'free' || selectedPlan === 'basic' || selectedPlan === 'pro') {
      setPlan(selectedPlan);
    } else {
      router.push('/signup');
    }
  }, [user, router]);

  const planPrices = {
    free: 0,
    basic: 9900,
    pro: 29900,
  };

  const planNames = {
    free: 'Free 플랜',
    basic: 'Basic 플랜',
    pro: 'Pro 플랜',
  };

  const planFeatures = {
    free: ['월 100회 캡처', '기본 캡처 기능', '고품질 PNG 저장'],
    basic: ['월 500회 캡처', '자동 캡처 지원', '고품질 PNG 저장'],
    pro: ['무제한 캡처', '자동 캡처 지원', '우선 지원', 'API 접근'],
  };

  const price = planPrices[plan];
  const vat = Math.round(price * 0.1);
  const total = price + vat;

  const handlePayment = async () => {
    if (plan === 'free') {
      // Free 플랜은 결제 없이 바로 대시보드로
      sessionStorage.removeItem('selectedPlan');
      router.push('/dashboard');
      return;
    }

    setLoading(true);

    // TODO: 실제 결제 API 연동
    // - Stripe
    // - 토스페이먼츠
    // - 카카오페이 등

    setTimeout(() => {
      sessionStorage.removeItem('selectedPlan');
      router.push('/dashboard');
    }, 2000);
  };

  const handleSkip = () => {
    sessionStorage.removeItem('selectedPlan');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-bg-dark py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-block mb-4">
            <span className="text-3xl font-bold text-primary">Capto</span>
          </Link>
          <button
            onClick={() => router.push('/signup')}
            className="flex items-center text-text-secondary hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            플랜 구성
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Method & Address */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method */}
            <motion.div
              className="bg-bg-medium rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-xl font-bold text-white mb-6">결제 방법</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-primary bg-primary/10'
                      : 'border-bg-light bg-bg-dark hover:border-bg-light'
                  }`}
                >
                  <div className="text-2xl mb-2">💳</div>
                  <div className="text-sm text-white font-medium">국내 카드</div>
                </button>

                <button
                  onClick={() => setPaymentMethod('kakao')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === 'kakao'
                      ? 'border-primary bg-primary/10'
                      : 'border-bg-light bg-bg-dark hover:border-bg-light'
                  }`}
                >
                  <div className="text-2xl mb-2">💬</div>
                  <div className="text-sm text-white font-medium">카카오페이</div>
                </button>

                <button
                  onClick={() => setPaymentMethod('naver')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === 'naver'
                      ? 'border-primary bg-primary/10'
                      : 'border-bg-light bg-bg-dark hover:border-bg-light'
                  }`}
                >
                  <div className="text-2xl mb-2">🟢</div>
                  <div className="text-sm text-white font-medium">네이버페이</div>
                </button>

                <button
                  onClick={() => setPaymentMethod('virtual')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === 'virtual'
                      ? 'border-primary bg-primary/10'
                      : 'border-bg-light bg-bg-dark hover:border-bg-light'
                  }`}
                >
                  <div className="text-2xl mb-2">🏦</div>
                  <div className="text-sm text-white font-medium">글로벌결제 카드</div>
                </button>
              </div>

              {/* Payment Info */}
              {paymentMethod === 'card' && (
                <div className="bg-bg-dark rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">💳</div>
                    <div className="flex-1">
                      <p className="text-white text-sm mb-2">
                        제출 후, NICEPAY로 리디렉션이 카드 발급기관을 선택하고 안전하게 가입을 완료할 수 있습니다.
                      </p>
                      <p className="text-text-tertiary text-xs">
                        NICEPAY 결제는 학외되면 OpenAI OpCo, LLC에서 해당 회사의 약관에 따라 청구 이 결제
                        방식에 대해로 청구할 수 있습니다.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Billing Address */}
            <motion.div
              className="bg-bg-medium rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-xl font-bold text-white mb-6">결제 주소</h2>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-text-secondary mb-2 text-sm">성명</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-bg-dark text-white rounded-lg border border-bg-light focus:border-primary focus:outline-none transition-colors"
                    placeholder="홍길동"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-text-secondary mb-2 text-sm">
                    국가 또는 지역
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 bg-bg-dark text-white rounded-lg border border-bg-light focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="대한민국">대한민국</option>
                    <option value="미국">미국</option>
                    <option value="일본">일본</option>
                    <option value="중국">중국</option>
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-text-secondary mb-2 text-sm">도시</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 bg-bg-dark text-white rounded-lg border border-bg-light focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="">선택하세요</option>
                    <option value="서울">서울</option>
                    <option value="부산">부산</option>
                    <option value="대구">대구</option>
                    <option value="인천">인천</option>
                    <option value="광주">광주</option>
                    <option value="대전">대전</option>
                    <option value="울산">울산</option>
                    <option value="세종">세종</option>
                    <option value="경기">경기</option>
                  </select>
                </div>

                {/* Save Address */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={saveAddress}
                    onChange={(e) => setSaveAddress(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-text-secondary text-sm">사업자로 구매합니다</span>
                </label>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-bg-medium rounded-xl p-6 sticky top-8">
              <h2 className="text-xl font-bold text-white mb-6">Go 플랜</h2>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">핵심 기능</h3>
                <div className="space-y-2">
                  {planFeatures[plan].map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="text-primary mt-1">⚡</div>
                      <span className="text-text-secondary text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-bg-light">
                <div className="flex justify-between text-text-secondary">
                  <span>매월 금액</span>
                  <span>₩{price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>VAT (10%)</span>
                  <span>₩{vat.toLocaleString()}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between mb-6">
                <span className="text-white font-bold">결제 금액</span>
                <span className="text-white font-bold text-xl">₩{total.toLocaleString()}</span>
              </div>

              {/* Purchase Button */}
              <button
                onClick={handlePayment}
                disabled={loading || (plan !== 'free' && !city)}
                className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-[#4752c4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3"
              >
                {loading ? '처리 중...' : plan === 'free' ? '무료로 시작하기' : '구독'}
              </button>

              {/* Skip Button for Free Plan */}
              {plan === 'free' && (
                <button
                  onClick={handleSkip}
                  className="w-full py-3 bg-bg-dark text-text-secondary rounded-lg hover:bg-bg-light transition-colors"
                >
                  건너뛰기
                </button>
              )}

              {/* Terms */}
              <p className="text-text-tertiary text-xs mt-4">
                구독은 취소할 때까지 매월 갱신됩니다. ₩{total.toLocaleString()}/월로 청구됩니다.{' '}
                <Link href="/terms" className="text-primary hover:underline">
                  이용약관
                </Link>
                에 동의하며, OpenAI 가입할 경비 조건을 자유 하고 납부는 것을 충전하는 것으로 간주합니다.{' '}
                <Link href="/cancel" className="text-primary hover:underline">
                  취소에 대해 자세히 알아보세요
                </Link>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
