import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useState } from 'react';

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-opacity-80 backdrop-blur-lg bg-gray-950 z-50 border-b border-opacity-10 border-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white">captoweb</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="/#features" className="text-gray-300 hover:text-white transition">
            기능
          </a>
          <a href="/#pricing" className="text-gray-300 hover:text-white transition">
            요금
          </a>

          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white transition"
              >
                대시보드
              </Link>
              <button
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                회원가입
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800 px-6 py-4 space-y-4">
          <a href="/#features" className="block text-gray-300 hover:text-white">
            기능
          </a>
          <a href="/#pricing" className="block text-gray-300 hover:text-white">
            요금
          </a>
          {user ? (
            <>
              <Link to="/dashboard" className="block text-gray-300 hover:text-white">
                대시보드
              </Link>
              <button
                onClick={handleLogout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-gray-300 hover:text-white">
                로그인
              </Link>
              <Link
                to="/signup"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition text-center"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
