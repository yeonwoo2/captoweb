import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function PricingSection() {
  const { user } = useAuth();

  const plans = [
    {
      name: 'Free',
      price: '무료',
      description: '입문 사용자를 위한',
      features: [
        { text: '일일 10회 캡쳐', included: true },
        { text: '자동 캡쳐 불가', included: false },
        { text: '고급 기능 미지원', included: false }
      ],
      cta: '시작하기',
      featured: false
    },
    {
      name: 'Basic',
      price: '₩4,990',
      priceUnit: '/월',
      description: '활발한 테스팅을 위한',
      features: [
        { text: '일일 100회 캡쳐', included: true },
        { text: '자동 캡쳐 가능', included: true },
        { text: '일부 고급 기능', included: false }
      ],
      cta: '구독하기',
      featured: true
    },
    {
      name: 'Pro',
      price: '₩14,990',
      priceUnit: '/월',
      description: '전문가를 위한',
      features: [
        { text: '무제한 캡쳐', included: true },
        { text: '자동 캡쳐', included: true },
        { text: '모든 기능 사용 가능', included: true }
      ],
      cta: '구독하기',
      featured: false
    }
  ];

  return (
    <section id="pricing" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            간단한 요금제
          </h2>
          <p className="text-xl text-gray-400">
            당신의 필요에 맞는 플랜을 선택하세요
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl transition transform hover:scale-105 ${
                plan.featured
                  ? 'bg-gradient-to-b from-blue-600 from-0% to-blue-900 to-100% bg-opacity-20 border border-blue-600 scale-105'
                  : 'bg-gray-900 bg-opacity-50 backdrop-blur border border-opacity-10 border-white'
              }`}
            >
              {plan.featured && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  추천
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

              {user ? (
                <Link
                  to="/subscription"
                  className={`w-full py-3 rounded-lg font-semibold transition text-center block ${
                    plan.featured
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-opacity-10 bg-blue-600 border border-blue-600 text-blue-400 hover:bg-opacity-20'
                  }`}
                >
                  {plan.cta}
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className={`w-full py-3 rounded-lg font-semibold transition text-center block ${
                    plan.featured
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-opacity-10 bg-blue-600 border border-blue-600 text-blue-400 hover:bg-opacity-20'
                  }`}
                >
                  {plan.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
