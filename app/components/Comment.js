// app/components/Comment.js
import { format } from 'date-fns'
import DOMPurify from 'dompurify'

export default function Comment({ comment }) {
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return format(date, 'yyyy. M. d. HH:mm:ss')
  };

  const sanitizedContent = DOMPurify.sanitize(comment.content);

  return (
    <div className="comment-container">
      <div className="comment-header">
        <span className="comment-author">{comment.authorName}</span>
        <span className="comment-date">{formatCreatedAt(comment.createdAt)}</span>
      </div>
      <div 
        className="comment-content ql-editor"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
      />
    </div>
  )
}