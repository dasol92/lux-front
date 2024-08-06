// app/posts/new/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from '../../components/RichTextEditor';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        // 여기에 추가 필드를 포함할 수 있습니다 (예: author 정보)
      }),
    });

    if (response.ok) {
      router.push('/'); // 홈페이지로 리다이렉트
    } else {
      alert('게시글 작성에 실패했습니다.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 ml-1 mr-1">
      <h1 className="text-2xl font-bold mb-4">새 게시글 작성</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block mb-2">내용</label>
          <RichTextEditor
            value={content}
            onChange={setContent}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          게시글 작성
        </button>
      </form>
    </div>
  );
}