// app/components/Post.js
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BookReference from './BookReference'

export default function Post({ post, isDetailView = false }) {
  const [expanded, setExpanded] = useState(false)
  const router = useRouter()
  const maxLength = 100 // 초기에 보여줄 최대 글자 수

  const truncatedContent = post.content.length > maxLength 
    ? post.content.slice(0, maxLength) + '...' 
    : post.content

  const handleContentClick = () => {
    if (!isDetailView) {
      router.push(`/posts/${post.id}`)
    }
  }

  return (
    <div className="post bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4">{post.authorName}</p>
      <div 
        className={`content cursor-pointer ${expanded || isDetailView ? 'expanded' : ''}`}
        onClick={handleContentClick}
      >
        {isDetailView || expanded ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: truncatedContent }} />
        )}
      </div>
      {(isDetailView || expanded) && (
        <BookReference references={post.references} />
      )}
      <div className="mt-4 flex justify-between items-center">
        {!isDetailView && (post.content.length > maxLength || post.references.length > 0) && !expanded && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(true);
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            더 보기
          </button>
        )}
        {!isDetailView && (
          <Link 
            href={`/posts/${post.id}`} 
            className="text-blue-500 hover:text-blue-700 ml-auto"
            onClick={(e) => e.stopPropagation()}
          >
            상세보기
          </Link>
        )}
      </div>
    </div>
  )
}