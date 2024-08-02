// app/components/Comment.js
import { format } from 'date-fns'

export default function Comment({ comment }) {
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return format(date, 'yyyy. M. d. HH:mm:ss')
  };

  return (
    <div className="comment bg-gray-100 p-3 mb-2 rounded">
    <div className="flex items-center mb-1">
        <h5 className="text-sm font-semibold mr-2">{comment.authorName}</h5>
        <span className="text-xs text-gray-500">{formatCreatedAt(comment.createdAt)}</span>
    </div>
    <p className="text-sm">{comment.content}</p>
    </div>
  )
}