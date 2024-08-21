// app/posts/[id]/page.js

import { Suspense } from 'react';
import Post from '../../components/Post';

async function getPost(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  return res.json();
}

export default async function PostPage({ params }) {
  const post = await getPost(params.id);

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4"></h1>
      <Suspense fallback={<div>로딩 중...</div>}>
        <Post post={post} isDetailView={true} />
      </Suspense>
    </main>
  );
}