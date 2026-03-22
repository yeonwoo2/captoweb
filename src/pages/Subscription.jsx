import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function Subscription() {
  const { user, userData, setUserData } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(userData?.plan);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentPlan, setPaymentPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvc: ''
  });

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '무료',
      description: '입문 사용자를 위한',
      features: [
        { text: '일일 10회 캡쳐', included: true },
        { text: '자동 캡쳐 불가', included: false },
        { text: '고급 기능 미지원', included: false }
      ]
    },
    {
      id: 'basic',
      name: 'Basic',
      price: '₩4,990',
      priceUnit: '/월',
      description: '활발한 테스팅을 위한',
      features: [
        { text: '일일 100회 캡쳐', included: true },
        { text: '자동 캡쳐 가능', included: true },
        { text: '일부 고급 기능', included: false }
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '₩14,990',
      priceUnit: '/월',
      description: '전문가를 위한',
      features: [
        { text: '무제한 캡쳐', included: true },
        { text: '자동 캡쳐', included: true },
        { text: '모든 기능 사용 가능', included: true }
      ]
    }
  ];

  const handleSelectPlan = (planId) => {
    if (planId !== selectedPlan) {
      setPaymentPlan(planId);
      setShowPaymentModal(true);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock payment
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update user plan in Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        plan: paymentPlan,
        subscriptionStartDate: new Date()
      });

      // Update local state
      setUserData({
        ...userData,
        plan: paymentPlan
      });

      setSelectedPlan(paymentPlan);
      setShowPaymentModal(false);
      setCardInfo({ number: '', expiry: '', cvc: '' });
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">구독 관리</h1>
          <p className="text-gray-400">당신의 필요에 맞는 플랜을 선택하세요</p>
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative p-8 rounded-2xl transition transform ${
                selectedPlan === plan.id
                  ? 'bg-gradient-to-b from-blue-600 to-blue-900 bg-opacity-20 border-2 border-blue-600 scale-105'
                  : 'bg-gray-900 bg-opacity-50 backdrop-blur border border-opacity-10 border-white hover:scale-105'
              }`}
            >
              {selectedPlan === plan.id && (
                <div className="absolute top-6 right-6 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  현재 플랜
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-6">{plan.description}</p>

              <div className="mb-8">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.priceUnit && <span className="text-gray-400">{plan.priceUnit}</span>}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    {feature.included ? (
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </svg>
                    )}
                    <span className={feature.included ? 'text-gray-300' : 'text-gray-400'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan.id)}
                disabled={selectedPlan === plan.id}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  selectedPlan === plan.id
                    ? 'bg-gray-700 text-gray-400 cursor-default'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {selectedPlan === plan.id ? '현재 플랜' : '선택'}
              </button>
            </div>
          ))}
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl max-w-md w-full p-8">
              <h2 className="text-2xl font-bold text-white mb-6">결제</h2>

              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    카드 번호
                  </label>
                  <input
                    type="text"
                    value={cardInfo.number}
                    onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      만료일
                    </label>
                    <input
                      type="text"
                      value={cardInfo.expiry}
                      onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      CVC
                    </label>
                    <input
                      type="text"
                      value={cardInfo.cvc}
                      onChange={(e) => setCardInfo({ ...cardInfo, cvc: e.target.value })}
                      placeholder="123"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600"
                      required
                    />
                  </div>
                </div>

                <p className="text-gray-500 text-xs bg-gray-800 p-3 rounded-lg">
                  ⚠️ 이것은 데모입니다. 실제 결제는 처리되지 않습니다.
                </p>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-2 rounded-lg transition"
                  >
                    {loading ? '처리 중...' : '결제'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
