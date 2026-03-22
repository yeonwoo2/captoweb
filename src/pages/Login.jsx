import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pt-32 pb-20 px-6 flex items-center">
      <div className="max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">로그인</h1>
          <p className="text-gray-400">captoweb에 로그인하세요</p>
        </div>

        <div className="bg-gray-900 bg-opacity-50 backdrop-blur border border-opacity-10 border-white p-8 rounded-2xl">
          <LoginForm />
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          Demo 계정: demo@captoweb.app / demo123456
        </p>
      </div>
    </div>
  );
}
