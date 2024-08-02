// app/components/Header.js
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          LUX
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/search" className="hover:underline">
              검색
            </Link>
          </li>          
          <li>
            <Link href="/login" className="hover:underline">
              로그인
            </Link>
          </li>
          <li>
            <Link href="/signup" className="hover:underline">
              회원가입
            </Link>
          </li><
            li>
            <Link href="/settings" className="hover:underline">
              설정
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}