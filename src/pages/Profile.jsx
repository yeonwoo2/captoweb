import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { updateProfile, updatePassword, deleteUser } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

export default function Profile() {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(userData?.displayName || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (displayName !== user.displayName) {
        await updateProfile(user, {
          displayName: displayName
        });
      }
      setMessage({ type: 'success', text: '프로필이 업데이트되었습니다.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: '새 비밀번호가 일치하지 않습니다.' });
      setLoading(false);
      return;
    }

    try {
      await updatePassword(user, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setMessage({ type: 'success', text: '비밀번호가 변경되었습니다.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      // Delete user data from Firestore
      await deleteDoc(doc(db, 'users', user.uid));
      // Delete user account
      await deleteUser(user);
      navigate('/');
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">계정 설정</h1>
          <p className="text-gray-400">프로필 정보를 관리하세요</p>
        </div>

        {/* Success/Error Message */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-900 bg-opacity-20 border border-green-500 text-green-400'
                : 'bg-red-900 bg-opacity-20 border border-red-500 text-red-400'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Profile Section */}
        <div className="bg-gray-900 bg-opacity-50 backdrop-blur border border-opacity-10 border-white p-8 rounded-2xl mb-8">
          <h2 className="text-xl font-bold text-white mb-6">기본 정보</h2>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                이메일
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">이메일은 변경할 수 없습니다.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                이름
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-2 rounded-lg transition"
            >
              {loading ? '업데이트 중...' : '프로필 업데이트'}
            </button>
          </form>
        </div>

        {/* Password Change Section */}
        <div className="bg-gray-900 bg-opacity-50 backdrop-blur border border-opacity-10 border-white p-8 rounded-2xl mb-8">
          <h2 className="text-xl font-bold text-white mb-6">비밀번호 변경</h2>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                새 비밀번호
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                비밀번호 확인
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호 확인"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-2 rounded-lg transition"
            >
              {loading ? '변경 중...' : '비밀번호 변경'}
            </button>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-900 bg-opacity-10 border border-red-600 p-8 rounded-2xl">
          <h2 className="text-xl font-bold text-red-400 mb-4">위험 영역</h2>
          <p className="text-gray-400 mb-6">
            계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 취소할 수 없습니다.
          </p>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            계정 삭제
          </button>
        </div>

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-red-600 rounded-2xl max-w-md w-full p-8">
              <h2 className="text-2xl font-bold text-white mb-4">계정 삭제</h2>
              <p className="text-gray-400 mb-6">
                정말로 계정을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  취소
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={loading}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  {loading ? '삭제 중...' : '삭제'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
