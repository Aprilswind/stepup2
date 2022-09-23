import React from 'react'

export default function GradientHead({text, size = '4xl', className = ''}: {text: string, size?: string, className?: string}) {
  return (
    <p className={`font-extrabold text-transparent text-${size} bg-clip-text bg-gradient-to-r from-sky-300 via-sky-500 to-blue-700 py-4 ${className}`}>
        {text}
    </p>
  )
}
