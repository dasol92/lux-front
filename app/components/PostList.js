// app/components/PostList.js
'use client'

import Post from './Post'

export default function PostList({ posts }) {
  if (!posts || posts.length === 0) {
    return <div>No posts available.</div>; // Fallback if posts are empty
  }

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}
