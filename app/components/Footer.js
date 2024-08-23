// app/components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2024. Toucan All rights reserved.</p>
        <p className="mt-2">
          <a href="#" className="hover:underline hover:text-gray-900 dark:hover:text-gray-100">이용약관</a> | 
          <a href="#" className="hover:underline hover:text-gray-900 dark:hover:text-gray-100 ml-2">개인정보처리방침</a>
        </p>
      </div>
    </footer>
  );
}