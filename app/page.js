// app/page.js
'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Suspense } from 'react';
import PostList from './components/PostList';
import Pagination from './components/Pagination';

async function fetchPosts(page = 0, size = 5) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?page=${page}&size=${size}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export default function Home() {
  const [posts, setPosts] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track any errors
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts(currentPage);
        setPosts(data.content || []); // Default to empty array if content is undefined
        setTotalPages(data.totalPages || 0); // Default to 0 if totalPages is undefined
      } catch (error) {
        console.error('Failed to load posts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Show an error message
  }

  return (
    <main className="container mx-auto px-4">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">게시글 목록</h1>
        <Link href="/posts/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          새 글 작성
        </Link>
      </div>
      <Suspense fallback={<div>로딩 중...</div>}>
        <PostList posts={posts} />
      </Suspense>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </main>
  );
}
