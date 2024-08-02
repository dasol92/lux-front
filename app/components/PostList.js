'use client'

import { useState } from 'react'
import Post from './Post'

export default function PostList({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts)
  const [visiblePosts, setVisiblePosts] = useState(10)

  const loadMore = () => {
    setVisiblePosts(prevVisible => prevVisible + 10)
  }

  return (
    <div>
      {posts.slice(0, visiblePosts).map(post => (
        <Post key={post.id} post={post} />
      ))}
      {visiblePosts < posts.length && (
        <button 
          onClick={loadMore}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          더 보기
        </button>
      )}
    </div>
  )
}