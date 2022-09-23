import { Button, Divider } from "@mui/material"
import type { NextPage } from "next"
import { useState } from "react"
import CreateAccount from "../components/Create"
const Home: NextPage = () => {
  const [ create, setCreate ] = useState( true )
  const [ next, setNext ] = useState( false )
  const nextProp = ( bool: boolean ) => {
    setNext(bool)
  }
  return (
    <div className="flex justify-around items-center">
      <div className="h-screen flex flex-col justify-center items-center w-1/4">
        <div>
          <h1 className="text-center mb-0"> STEP UP </h1>
          <p className="text-gray-600 mt-2 mb-8"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, magni? </p>
          <Divider></Divider>
          <p className="text-gray-600 bg-gray-100 p-4 my-4"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. <span className="text-black font-semibold"> Lorem ipsum dolor, sit amet consectetur adipisicing elit </span> Cupiditate suscipit consequuntur placeat reiciendis, architecto dolorum nisi minima veritatis praesentium itaque tempora sed assumenda magnam fuga totam cum amet inventore? Perferendis? </p>
          <Divider></Divider>
          <div className="flex mt-10 justify-between items-center">
            <Button> Home </Button>
            <Button> Telegram </Button>
          </div>
          <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, quia? </p>
        </div>
      </div>
      <div className="w-1/3">
        { create ?
          ( <div className="h-screen px-4 flex flex-col justify-center items-center">
            <CreateAccount nextProp={nextProp} />
          </div> )
          : ( <></> ) }
      </div>
    </div>
  )
}

export default Home
