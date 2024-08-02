// app/components/Comment.js

export default function Comment({ comment }) {
  return (
    <div className="comment bg-gray-100 p-3 mb-2 rounded">
    <div className="flex items-center mb-1">
        <h5 className="text-sm font-semibold mr-2">{comment.authorName}</h5>
        <span className="text-xs text-gray-500">{comment.createdAt}</span>
    </div>
    <p className="text-sm">{comment.content}</p>
    </div>
  )
}