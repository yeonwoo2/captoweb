import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!agreed) {
      setError('이용약관에 동의해주세요.');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, {
        displayName: displayName
      });

      // Store user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: displayName,
        plan: 'free',
        subscriptionStartDate: new Date(),
        captureUsage: {
          today: 0,
          total: 0,
          limit: 10
        },
        createdAt: new Date()
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
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
            이름
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600 transition"
            placeholder="이름"
            required
          />
        </div>

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
            placeholder="비밀번호 (6자 이상)"
            required
            minLength="6"
          />
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="agreed"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-4 h-4 bg-gray-800 border border-gray-700 rounded cursor-pointer"
          />
          <label htmlFor="agreed" className="text-sm text-gray-400 cursor-pointer">
            <a href="#" className="text-blue-500 hover:text-blue-400">
              이용약관
            </a>
            과{' '}
            <a href="#" className="text-blue-500 hover:text-blue-400">
              개인정보처리방침
            </a>
            에 동의합니다.
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-2 rounded-lg transition"
        >
          {loading ? '가입 중...' : '회원가입'}
        </button>
      </form>

      <div className="mt-6 text-center text-gray-400">
        이미 계정이 있으신가요?{' '}
        <Link to="/login" className="text-blue-500 hover:text-blue-400 font-semibold">
          로그인하기
        </Link>
      </div>
    </div>
  );
}
