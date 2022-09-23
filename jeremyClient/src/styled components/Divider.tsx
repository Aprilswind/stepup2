import { Container } from '@mui/material'
import React from 'react'

export default function Divider({className}: {className?: string}) {

  return (
    <Container className={`h-[1px] rounded my-12 bg-gray-300 ${className}`}></Container>
  )
}
