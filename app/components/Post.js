// app/components/Post.js
'use client'

import { useState } from 'react'
import { formatDistanceToNow, format } from 'date-fns'
import BookReference from './BookReference'
import Comment from './Comment'

export default function Post({ post }) {
  const [expanded, setExpanded] = useState(false)
  const maxLength = 100 // Maximum length for truncated content

  const truncatedContent = post.content.length > maxLength 
    ? post.content.slice(0, maxLength) + '...' 
    : post.content

  const formatCreatedAt = (createdAt, isDetailView) => {
    const date = new Date(createdAt)
    return {
      displayTime: formatDistanceToNow(date, { addSuffix: true }),
      exactTime: format(date, 'yyyy. M. d. HH:mm:ss'),
    }
  }

  return (
    <div className="post bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <div className="flex items-center mb-2">
        <h3 className="text-base font-semibold mr-2">{post.authorName}</h3>
        {(() => {
          const { displayTime, exactTime } = formatCreatedAt(post.createdAt)
          return (
            <span 
              className="text-sm text-gray-500" 
              title={exactTime}
            >
              {displayTime}
            </span>
          )
        })()}
      </div>
      <div 
        className={`content ${expanded ? 'expanded' : ''}`}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: truncatedContent }} />
        )}
      </div>
      {expanded && (
        <BookReference references={post.references} />
      )}
      <div className="mt-4 flex justify-between items-center">
        {!expanded && (
          <button 
            onClick={(e) => {
              e.stopPropagation()
              setExpanded(true)
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            더 보기
          </button>
        )}
      </div>
      {expanded ? (
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">댓글</h4>
          {post.comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        // Display the last comment when not expanded
        <div className="mt-4">
          {post.comments.length > 0 && (
            <>
              <h4 className="text-lg font-semibold mb-2">마지막 댓글</h4>
              <Comment comment={post.comments[post.comments.length - 1]} />
            </>
          )}
        </div>
      )}
    </div>
  )
}
