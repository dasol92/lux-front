import Link from 'next/link';
import { Suspense } from 'react';
import PostList from './components/PostList';

async function getPosts() {
  const res = await fetch('http://localhost:8080/api/posts', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="container mx-auto px-4">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">게시글 목록</h1>
        <Link href="/posts/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          새 글 작성
        </Link>
      </div>
      <Suspense fallback={<div>로딩 중...</div>}>
        <PostList initialPosts={posts} />
      </Suspense>
    </main>
  );
}