import { Divider } from '@mui/material'
import React from 'react'

export default function Trending() {
  return (
    <div className="bg-[#e9eaee] w-1/5 h-[calc(100vh-1rem)] p-4 m-2 rounded">
      <h3 className="text-center text-primary font-bold"> Github Stats </h3>
      <Divider className="my-4 bg-gray-300"></Divider>  
      <h3 className="text-black font-bold"> Top Contributors of all Time </h3>
      <Divider className="my-4 bg-gray-300"></Divider>  
      <h3 className="text-black font-bold"> Top Contributors of this week </h3>
      <Divider className="my-4 bg-gray-300"></Divider>  
      <h3 className="text-black font-bold"> Top Contributors of Today </h3>
      <Divider className="my-4 bg-gray-300"></Divider>  
    </div>
  )
}
