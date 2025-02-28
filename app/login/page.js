import LoginForm from '../components/LoginForm';

export default function LoginPage() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>
          <LoginForm />
        </div>
      </div>
    );
  }