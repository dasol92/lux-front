'use client'

import { useState } from 'react'
import Link from 'next/link'
import BookReference from './BookReference'

export default function Post({ post }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="post bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4">{post.authorName}</p>
      <div className={`content ${expanded ? 'expanded' : 'h-12 overflow-hidden'}`}>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      {!expanded && (
        <button 
          onClick={() => setExpanded(true)}
          className="text-blue-500 hover:text-blue-700 mt-2"
        >
          더 보기
        </button>
      )}
      <BookReference references={post.references} />
      <Link href={`/posts/${post.id}`} className="text-blue-500 hover:text-blue-700 mt-4 inline-block">
        상세보기
      </Link>
    </div>
  )
}