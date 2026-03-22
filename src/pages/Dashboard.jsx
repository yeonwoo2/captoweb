import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { userData } = useAuth();

  const planColors = {
    free: 'bg-gray-600',
    basic: 'bg-blue-600',
    pro: 'bg-purple-600'
  };

  const planNames = {
    free: 'Free',
    basic: 'Basic',
    pro: 'Pro'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            환영합니다, {userData?.displayName}! 👋
          </h1>
          <p className="text-gray-400">captoweb 대시보드에서 모든 것을 관리하세요.</p>
        </div>

        {/* Current Plan */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Plan Status */}
          <div className="bg-gray-900 bg-opacity-50 backdrop-blur border border-opacity-10 border-white p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-6">현재 플랜</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">플랜 타입</span>
                <span className={`${planColors[userData?.plan]} text-white px-4 py-1 rounded-full font-semibold text-sm`}>
                  {planNames[userData?.plan]}
                </span>
              </div>
              <div className="border-t border-gray-700"></div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">월간 가격</span>
                <span className="text-white font-semibold">
                  {userData?.plan === 'free' ? '무료' : userData?.plan === 'basic' ? '₩4,990' : '₩14,990'}
                </span>
              </div>
              <div className="border-t border-gray-700"></div>
              <div className="pt-4">
                <Link
                  to="/subscription"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition text-center block"
                >
                  플랜 변경
                </Link>
              </div>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="bg-gray-900 bg-opacity-50 backdrop-blur border border-opacity-10 border-white p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-6">사용량</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">오늘 캡쳐</span>
                  <span className="text-white font-semibold">
                    {userData?.captureUsage?.today || 0}/{userData?.captureUsage?.limit || 10}
                  </span>
                </div>
                <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-300"
                    style={{
                      width: `${((userData?.captureUsage?.today || 0) / (userData?.captureUsage?.limit || 10)) * 100}%`
                    }}
                  ></div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">총 캡쳐</span>
                  <span className="text-white font-semibold">{userData?.captureUsage?.total || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="bg-gray-900 bg-opacity-50 backdrop-blur border border-opacity-10 border-white p-8 rounded-2xl mb-12">
          <h2 className="text-xl font-bold text-white mb-6">앱 다운로드</h2>
          <p className="text-gray-400 mb-6">captoweb 데스크톱 앱을 다운로드하여 지금 바로 사용을 시작하세요.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://download.captoweb.app/windows"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition text-center flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 5v14h18V5H3zm16 12H5V7h14v10zm-6-3h4v2h-4zm0-4h4v2h-4zM9 9h4v2H9zm0 4h4v2H9z" />
              </svg>
              Windows 다운로드
            </a>
            <a
              href="https://download.captoweb.app/macos"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition text-center flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 13.5c-.91 0-1.82.35-2.49 1.01.9 1.41 1.4 3.08 1.4 4.89 0 .37-.02.74-.07 1.1.98.86 1.6 2.12 1.6 3.49 0 2.61-2.11 4.73-4.73 4.73-2.61 0-4.73-2.11-4.73-4.73 0-1.21.46-2.32 1.22-3.15-.77-.32-1.5-.77-2.14-1.34.62.93 1.38 1.74 2.24 2.4-1.07-1.02-1.75-2.49-1.75-4.14 0-3.27 2.65-5.92 5.92-5.92 1.27 0 2.45.4 3.42 1.08-.64 1.13-1 2.44-1 3.83zm4.14-9.38l-5.31 1.48c-.51.14-1.05-.19-1.19-.7l-2.69-10.63c-.14-.51-.69-.87-1.2-.87-.51 0-1.06.36-1.2.87L7.07 4.9c-.14.51-.68.84-1.19.7L.57 3.12C.06 2.98-.28 2.43.14 1.85 2.99-1.4 9.27-2.67 15 .48c3.45 2 5.93 5.31 6.36 9.42.17 1.53-.25 2.81-1.17 3.61zM12 6.68c-1.73 0-3.13 1.4-3.13 3.13 0 1.73 1.4 3.13 3.13 3.13s3.13-1.4 3.13-3.13c0-1.73-1.4-3.13-3.13-3.13z" />
              </svg>
              macOS 다운로드
            </a>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 bg-opacity-50 backdrop-blur border border-opacity-10 border-white p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {userData?.captureUsage?.today || 0}
            </div>
            <p className="text-gray-400 text-sm">오늘의 캡쳐</p>
          </div>

          <div className="bg-gray-900 bg-opacity-50 backdrop-blur border border-opacity-10 border-white p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {userData?.captureUsage?.total || 0}
            </div>
            <p className="text-gray-400 text-sm">총 캡쳐</p>
          </div>

          <div className="bg-gray-900 bg-opacity-50 backdrop-blur border border-opacity-10 border-white p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {planNames[userData?.plan]}
            </div>
            <p className="text-gray-400 text-sm">현재 플랜</p>
          </div>
        </div>
      </div>
    </div>
  );
}
