// app/components/Post.js
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BookReference from './BookReference'
import Comment from './Comment'
import { formatDistanceToNow, format } from 'date-fns'

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

  const formatCreatedAt = (createdAt, isDetailView) => {
    const date = new Date(createdAt);
    
    if (isDetailView) {
      return {
        displayTime: format(date, 'yyyy. M. d. H시 m분'),
        exactTime: format(date, 'yyyy. M. d. HH:mm:ss')
      };
    } else {
      return {
        displayTime: formatDistanceToNow(date, { addSuffix: true }),
        exactTime: format(date, 'yyyy. M. d. HH:mm:ss')
      };
    }
  };

  return (
    <div className="post bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <div className="flex items-center mb-2">
        <h3 className="text-base font-semibold mr-2">{post.authorName}</h3>
        {(() => {
          const { displayTime, exactTime } = formatCreatedAt(post.createdAt, isDetailView);
          return (
            <span 
              className="text-sm text-gray-500" 
              title={exactTime}
            >
              {displayTime}
            </span>
          );
        })()}
      </div>
      <div 
        className={`content ${expanded || isDetailView ? 'expanded' : ''}`}
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
          <button 
            onClick={() => router.push(`/posts/${post.id}`)}
            className="text-blue-500 hover:text-blue-700 ml-auto"
          >
            상세보기
          </button>
        )}
      </div>
      {isDetailView && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">댓글</h4>
          {post.comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  )
}