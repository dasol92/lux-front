// app/components/RichTextEditor.js

'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

export default function RichTextEditor({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }]
    ],
  }

  return (
    <ReactQuill 
      value={value} 
      onChange={onChange}
      modules={modules}
      theme="snow"
    />
  )
}