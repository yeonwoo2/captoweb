import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              앱 테스팅을<br />
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                자동화하세요
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              핸드폰을 USB로 연결하고 앱을 탐색하기만 하면,<br />
              captoweb이 모든 스크린샷을 자동으로 캡쳐합니다.<br />
              iOS와 Android 모두 지원합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg text-center transition transform hover:scale-105"
              >
                무료로 시작하기
              </Link>
              <a
                href="#features"
                className="bg-opacity-10 bg-blue-600 border border-blue-600 text-blue-400 hover:bg-opacity-20 px-8 py-3 rounded-lg font-semibold text-lg text-center transition"
              >
                더 알아보기
              </a>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="relative w-64 h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl opacity-20 blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-opacity-20 border-white h-full flex flex-col items-center justify-center">
                <div className="text-center space-y-6">
                  <svg className="w-20 h-20 mx-auto text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  </svg>
                  <p className="text-sm text-gray-400">핸드폰 + USB 연결</p>
                  <div className="text-3xl text-gray-300">⚡</div>
                  <p className="text-sm text-gray-400">자동 캡쳐 시작</p>
                  <div className="text-3xl text-gray-300">📸</div>
                  <p className="text-sm text-gray-400">완료!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
