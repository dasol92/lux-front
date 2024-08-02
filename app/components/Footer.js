// app/components/Footer.js
export default function Footer() {
    return (
      <footer className="bg-gray-200 text-gray-700 p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 게시판 앱. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="hover:underline">이용약관</a> | 
            <a href="#" className="hover:underline ml-2">개인정보처리방침</a>
          </p>
        </div>
      </footer>
    );
  }