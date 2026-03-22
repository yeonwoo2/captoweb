export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-6 border-t border-opacity-10 border-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            강력한 기능들
          </h2>
          <p className="text-xl text-gray-400">
            디자이너, 기획자, 마케터를 위한 완벽한 솔루션
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="bg-gray-900 bg-opacity-50 backdrop-blur border border-opacity-10 border-white p-8 rounded-2xl hover:border-blue-600 transition transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              현재화면 캡쳐
            </h3>
            <p className="text-gray-400 leading-relaxed">
              핸드폰 화면의 특정 부분을 원클릭으로 캡쳐하세요. 고품질 이미지로 즉시 PC에 저장됩니다.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-900 bg-opacity-50 backdrop-blur border border-opacity-10 border-white p-8 rounded-2xl hover:border-blue-600 transition transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-5.04-6.71l-2.75 3.54-2.96-3.83c-.375-.48-.96-.77-1.6-.77-.84 0-1.54.52-1.84 1.25-.05.12-.07.24-.07.37 0 1.66 1.34 3 3 3 .13 0 .25-.02.37-.07.73-.3 1.25-1 1.25-1.84 0-.64-.29-1.225-.77-1.6z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              자동 캡쳐
            </h3>
            <p className="text-gray-400 leading-relaxed">
              앱을 탐색할 때 자동으로 모든 화면을 캡쳐합니다. 수동 작업 없이 완벽한 스크린샷 세트를 얻으세요.
            </p>
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-900 bg-opacity-50 backdrop-blur border border-opacity-10 border-white p-6 rounded-xl text-center hover:border-blue-600 transition">
            <svg className="w-8 h-8 mx-auto mb-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
            <h4 className="text-white font-semibold mb-2">iOS & Android</h4>
            <p className="text-gray-400 text-sm">양쪽 플랫폼 모두 지원</p>
          </div>
          <div className="bg-gray-900 bg-opacity-50 backdrop-blur border border-opacity-10 border-white p-6 rounded-xl text-center hover:border-blue-600 transition">
            <svg className="w-8 h-8 mx-auto mb-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 2h-2v3h2V2zm0 16h-2v3h2v-3zM5 13H2v-2h3v2zm16 0h-3v-2h3v2zM6.3 6.71L4.21 4.62 2.8 6.03l2.09 2.09 1.41-1.41zM17.79 17.79l-2.09-2.09-1.41 1.41 2.09 2.09 1.41-1.41zM6.29 17.79l1.41 1.41 2.09-2.09-1.41-1.41-2.09 2.09zm11.5-11.5l-2.09-2.09-1.41 1.41 2.09 2.09 1.41-1.41zM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" />
            </svg>
            <h4 className="text-white font-semibold mb-2">빠른 동기화</h4>
            <p className="text-gray-400 text-sm">USB 연결로 즉시 동기화</p>
          </div>
          <div className="bg-gray-900 bg-opacity-50 backdrop-blur border border-opacity-10 border-white p-6 rounded-xl text-center hover:border-blue-600 transition">
            <svg className="w-8 h-8 mx-auto mb-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10z" />
            </svg>
            <h4 className="text-white font-semibold mb-2">자동 정리</h4>
            <p className="text-gray-400 text-sm">모든 파일이 자동으로 정렬됨</p>
          </div>
        </div>
      </div>
    </section>
  );
}
