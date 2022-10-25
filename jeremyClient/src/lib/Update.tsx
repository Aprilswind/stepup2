import { Button, Checkbox } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserObjectContext } from '../context/user'
import Divider from '../styled components/Divider'
import GradientHead from '../styled components/GradientHead'

export default function Update () {
  const {userObject, setUserObject} = useContext(UserObjectContext)
  const [ received, setReceived ] = useState( false )
  const [ para, setPara ] = useState( '' )
  const [ err, setErr ] = useState( '' )
  const handleSubmit = () => {
    if ( err ) return
    else {
      if(!userObject.statusUpdate.length) {
        userObject.statusUpdate = []
      }
      axios.put( `https://stepup-laptopapp.herokuapp.com/api/users/${ userObject.id }`, {
        lastUpdate: Date.now().toString(),  
        statusUpdate: [...userObject.statusUpdate, {
          date: yyyymmdd(new Date()),
          content: para
        }]
      } ).then( () => {
        setUserObject((prev) => ({...prev, lastUpdate: Date.now()}))
      })
    }
  }
  useEffect( () => {
    if ( para.length < 100 ) {
      setErr( 'Your Essay should atleast contain 100 characters' )
    }
    else {
      if ( err ) {
        setErr( '' )
      }
    }
  }, [ para ] )
  const yyyymmdd = (date: Date) => {
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  return [date.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
};

  return (
    <div className='w-full'>
      <GradientHead text={ 'Update your skill progress' } />
      <Divider />
      {Date.now() - parseInt(userObject.lastUpdate) > 86400000  ? (<div>
        <p className='my-4'> Update your scholastic progress, you have done for the past one week. </p>
        <textarea onChange={ ( e ) => setPara( e.target.value ) } value={ para } className='lvl1Field w-full h-[300px]'>
        </textarea>
        { err !== '' && ( <p className='text-red-600'>
          { err }
        </p> ) }
        <button className='myBtn my-4' onClick={ handleSubmit }> Submit </button>
      </div>) : (
        <div className='my-4'>
            <p className='my-4'>
              You have already updated your progress for this day.
              <span className='text-black'> Please comeback tomorrow </span>
            </p>    
        </div>
      )}
      <Divider />
    </div>
  )
}
