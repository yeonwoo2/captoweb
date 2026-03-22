import SignupForm from '../components/auth/SignupForm';

export default function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pt-32 pb-20 px-6 flex items-center">
      <div className="max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">회원가입</h1>
          <p className="text-gray-400">captoweb에 가입하세요</p>
        </div>

        <div className="bg-gray-900 bg-opacity-50 backdrop-blur border border-opacity-10 border-white p-8 rounded-2xl">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
