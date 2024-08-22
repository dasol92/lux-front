// app/components/Post.js
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatDistanceToNow, format } from 'date-fns'
import BookReference from './BookReference'
import Comment from './Comment'
import RichTextEditor from './RichTextEditor'

export default function Post({ post: initialPost, isDetailView = false }) {
  const [post, setPost] = useState(initialPost)
  const [expanded, setExpanded] = useState(false)
  const router = useRouter()
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

  const handleContentClick = () => {
    if (!isDetailView) {
      router.push(`/posts/${post.id}`)
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()

    // Send the new comment to the backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/new/${post.id}`, {
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
      const newComment = await response.json()
      setPost(prevPost => ({
        ...prevPost,
        comments: [...prevPost.comments, newComment],
      }))
      setCommentContent('') // Clear the comment field
      alert('댓글 작성 완료!')
    } else {
      alert('댓글 작성에 실패했습니다.')
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-2 dark:text-white">{post.title}</h2>
      <div className="flex items-center mb-2">
        <h3 className="text-base font-semibold mr-2 dark:text-gray-200">{post.authorName}</h3>
        {(() => {
          const { displayTime, exactTime } = formatCreatedAt(post.createdAt)
          return (
            <span 
              className="text-sm text-gray-500 dark:text-gray-400" 
              title={exactTime}
            >
              {displayTime}
            </span>
          )
        })()}
      </div>
      <div 
        className={`content dark:text-gray-300 ${expanded || isDetailView ? 'expanded' : ''}`}
        onClick={handleContentClick} // Toggle expanded state on click
      >
        {expanded || isDetailView ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: truncatedContent }} />
        )}
      </div>
      {(expanded || isDetailView) && (
        <div>
          <BookReference references={post.references} />
        </div>
      )}
      <div className="mt-4 flex justify-between items-center">
        {(!expanded && !isDetailView) && (
          <button 
            onClick={(e) => {
              e.stopPropagation()
              handleToggleExpand()
            }}
            className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            더 보기
          </button>
        )}
      </div>
      {(expanded || isDetailView) ? (
        <div className="mt-2">
          {/* <h4 className="text-lg font-semibold mb-2"></h4> 댓글 */}
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
              <Comment onClick={handleContentClick} comment={post.comments[post.comments.length - 1]} />
            </>
          )}
        </div>
      )}

      {(expanded || isDetailView) ? (
      <div className="mt-4">
        <form onSubmit={handleCommentSubmit}>
          <RichTextEditor
            value={commentContent}
            onChange={setCommentContent}
          />
          <button type="submit" className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700 mt-2">
            댓글 작성
          </button>
        </form>
      </div>
      ) : null}
    </div>
  )
}
