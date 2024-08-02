import SignupForm from '../components/SignupForm';

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>
        <SignupForm />
      </div>
    </div>
  );
}