import React from 'react'
import { Container as C } from '@mui/material'

export default function Container({className, children}: {className?: string, children: React.ReactNode}) {
  return (
    <C className={`bg-white p-4 rounded my-4 ${className}`}> 
          {children}
    </C>
  )
}
