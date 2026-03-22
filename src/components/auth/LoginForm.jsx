import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, 'demo@captoweb.app', 'demo123456');
      navigate('/dashboard');
    } catch (err) {
      setError('Demo login failed. Please try with demo@captoweb.app / demo123456');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-900 bg-opacity-20 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            이메일
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600 transition"
            placeholder="이메일 주소"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            비밀번호
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600 transition"
            placeholder="비밀번호"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-2 rounded-lg transition"
        >
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-900 text-gray-400">또는</span>
        </div>
      </div>

      <button
        onClick={handleDemoLogin}
        disabled={loading}
        className="w-full bg-gray-800 hover:bg-gray-700 disabled:bg-gray-600 text-gray-300 font-semibold py-2 rounded-lg transition border border-gray-700"
      >
        데모 계정으로 로그인
      </button>

      <div className="mt-6 text-center text-gray-400">
        계정이 없으신가요?{' '}
        <Link to="/signup" className="text-blue-500 hover:text-blue-400 font-semibold">
          가입하기
        </Link>
      </div>
    </div>
  );
}
