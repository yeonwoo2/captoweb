export default function DownloadSection() {
  return (
    <section id="download" className="py-20 px-6 border-t border-opacity-10 border-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Windows와 macOS 모두에서 사용 가능합니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Windows Download */}
          <div className="bg-gray-900 bg-opacity-50 backdrop-blur border border-opacity-10 border-white p-8 rounded-2xl text-center group hover:border-blue-600 transition">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 5v14h18V5H3zm16 12H5V7h14v10zm-6-3h4v2h-4zm0-4h4v2h-4zM9 9h4v2H9zm0 4h4v2H9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Windows</h3>
            <p className="text-gray-400 mb-6">Windows 10 이상</p>
            <a
              href="https://download.captoweb.app/windows"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold block text-center transition transform hover:scale-105"
            >
              다운로드
            </a>
          </div>

          {/* macOS Download */}
          <div className="bg-gray-900 bg-opacity-50 backdrop-blur border border-opacity-10 border-white p-8 rounded-2xl text-center group hover:border-blue-600 transition">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 13.5c-.91 0-1.82.35-2.49 1.01.9 1.41 1.4 3.08 1.4 4.89 0 .37-.02.74-.07 1.1.98.86 1.6 2.12 1.6 3.49 0 2.61-2.11 4.73-4.73 4.73-2.61 0-4.73-2.11-4.73-4.73 0-1.21.46-2.32 1.22-3.15-.77-.32-1.5-.77-2.14-1.34.62.93 1.38 1.74 2.24 2.4-1.07-1.02-1.75-2.49-1.75-4.14 0-3.27 2.65-5.92 5.92-5.92 1.27 0 2.45.4 3.42 1.08-.64 1.13-1 2.44-1 3.83zm4.14-9.38l-5.31 1.48c-.51.14-1.05-.19-1.19-.7l-2.69-10.63c-.14-.51-.69-.87-1.2-.87-.51 0-1.06.36-1.2.87L7.07 4.9c-.14.51-.68.84-1.19.7L.57 3.12C.06 2.98-.28 2.43.14 1.85 2.99-1.4 9.27-2.67 15 .48c3.45 2 5.93 5.31 6.36 9.42.17 1.53-.25 2.81-1.17 3.61zM12 6.68c-1.73 0-3.13 1.4-3.13 3.13 0 1.73 1.4 3.13 3.13 3.13s3.13-1.4 3.13-3.13c0-1.73-1.4-3.13-3.13-3.13z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">macOS</h3>
            <p className="text-gray-400 mb-6">macOS 10.15 이상</p>
            <a
              href="https://download.captoweb.app/macos"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold block text-center transition transform hover:scale-105"
            >
              다운로드
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
