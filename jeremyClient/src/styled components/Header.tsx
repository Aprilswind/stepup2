import React from 'react'

export default function Header({para, className}: {para: string, className: string}) {
  return (
      <>
        <p className={`${className}`}> 
           {para}   
        </p>
      </>
  )
}
