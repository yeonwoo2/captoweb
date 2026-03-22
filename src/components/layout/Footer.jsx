export default function Footer() {
  return (
    <footer className="border-t border-opacity-10 border-white py-12 px-6 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <span className="font-bold text-white">captoweb</span>
            </div>
            <p className="text-gray-400 text-sm">자동 스크린 캡쳐 앱</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">제품</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/#features" className="hover:text-white transition">기능</a></li>
              <li><a href="/#pricing" className="hover:text-white transition">요금</a></li>
              <li><a href="/#download" className="hover:text-white transition">다운로드</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">회사</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">블로그</a></li>
              <li><a href="#" className="hover:text-white transition">문서</a></li>
              <li><a href="#" className="hover:text-white transition">지원</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">법률</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">개인정보</a></li>
              <li><a href="#" className="hover:text-white transition">이용약관</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-opacity-10 border-white pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2024 captoweb. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
