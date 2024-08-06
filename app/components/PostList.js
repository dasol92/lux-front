// app/components/PostList.js
'use client'

import Post from './Post'

export default function PostList({ posts }) {
  if (!posts || posts.length === 0) {
    return <div className="dark:text-gray-300">No posts available.</div>;
  }

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}
