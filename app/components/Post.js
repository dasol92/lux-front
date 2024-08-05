// app/components/Post.js
'use client'

import { useState } from 'react'
import { formatDistanceToNow, format } from 'date-fns'
import BookReference from './BookReference'
import Comment from './Comment'
import RichTextEditor from './RichTextEditor'

export default function Post({ post }) {
  const [expanded, setExpanded] = useState(false)
  const [commentContent, setCommentContent] = useState('')
  const maxLength = 100 // Maximum length for truncated content

  const truncatedContent = post.content.length > maxLength 
    ? post.content.slice(0, maxLength) + '...' 
    : post.content

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt)
    return {
      displayTime: formatDistanceToNow(date, { addSuffix: true }),
      exactTime: format(date, 'yyyy. M. d. HH:mm:ss'),
    }
  }

  const handleToggleExpand = () => {
    setExpanded(prevExpanded => !prevExpanded)
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()

    // Send the new comment to the backend
    const response = await fetch(`http://localhost:8080/api/comments/new/${post.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: commentContent,
        authorEmail: 'yskim@naver.com', // Replace with actual author information
      }),
    })

    if (response.ok) {
      // Optionally refresh the comments or show a success message
      alert('댓글 작성 완료!')
      setCommentContent('') // Clear the comment field
      // You might want to reload comments here or update the state
    } else {
      alert('댓글 작성에 실패했습니다.')
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
        onClick={handleToggleExpand} // Toggle expanded state on click
      >
        {expanded ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: truncatedContent }} />
        )}
      </div>
      {expanded && (
        <div onClick={handleToggleExpand}> {/* Make BookReference clickable for toggle */}
          <BookReference references={post.references} />
        </div>
      )}
      <div className="mt-4 flex justify-between items-center">
        {!expanded && (
          <button 
            onClick={(e) => {
              e.stopPropagation()
              handleToggleExpand()
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

      {/* Comment form */}
      <div className="mt-4">
        <form onSubmit={handleCommentSubmit}>
          <RichTextEditor
            value={commentContent}
            onChange={setCommentContent}
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2">
            댓글 작성
          </button>
        </form>
      </div>
    </div>
  )
}
