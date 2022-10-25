import React from 'react'
import { Breakpoint, Container as C } from '@mui/material'

export default function Container({className, children, maxWidth}: {className?: string, children: React.ReactNode, maxWidth?: Breakpoint | false}) {
  return (
    <C maxWidth={maxWidth || "md"} className={`bg-white p-4 rounded my-4 ${className}`}> 
          {children}
    </C>
  )
}
