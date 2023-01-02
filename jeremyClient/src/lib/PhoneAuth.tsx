import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button, TextField } from '@mui/material'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import axios from 'axios'
import { FirebaseError } from 'firebase/app'

const OTPInput = require("otp-input-react")

const PhoneAuth = ( { done, updateData }: { done: any, updateData: any } ) => {
	// Inputs
	const [ mynumber, setNumber ] = useState<any>()
	const [ otp, setotp ] = useState( '' )
	const [ show, setshow ] = useState( false )
	const [ final, setFinal ] = useState<any>( '' )

	// Sent OTP
	const signin = () => {
		const auth = getAuth()
		const appVerifier = new RecaptchaVerifier( 'recaptcha-container', {}, auth )
		signInWithPhoneNumber( auth, mynumber, appVerifier )
			.then( ( confirmationResult ) => {
				setshow( true )
				setFinal( confirmationResult )
			} ).catch( ( error: FirebaseError ) => {
				toast.error( error.code === "auth/invalid-phone-number" ? "Invalid phone number or phone number format" : error.code)
			} )
	}
	const ValidateOtp = () => {
		if ( otp === null || final === null ) {
			alert( 'No' )
			return
		}
		final.confirm( otp ).then( ( result: any ) => {
			toast.success( 'User verified successfully' )
			axios.get( 'https://laptopapp.onrender.com/api/users?filters[$and][0][phno][$eq]=' + mynumber.slice(3) ).then( ( resp ) => {
				if ( resp.data.length ) {
					console.log(resp.data[0])
					updateData( {
						...resp.data[ 0 ],
						authenticated: true
					} )
				}
				else {
					updateData( ( prev: any ) => ( {
						...prev,
						phNo: mynumber,
						authenticated: true
					} ) )
				}
				done()
			} )
		} ).catch( ( err: any ) => toast.error( err.code ) )
		console.log( otp, final )
	}

	return (
		<div className='bg-blue-700 w-[calc(100%-2rem)] lg:w-[calc(50%-2rem)] rounded flex flex-col justify-center items-center m-4 p-4'>
			<p className='mt-4 w-full md:w-2/3 text-center ml-0 pl-0 text-white text-xl font-extra-bold'>
				Enter your phone number. We will send you an OTP to verify your phone number.
			</p>
			<p className="text-gray-400 mb-4"> Format : +91860850XXXX </p>
			<div className='bg-white flex flex-col justify-evenly items-center h-[300px] p-4 rounded w-full' style={ { display: !show ? "flex" : "none" } }>
				<TextField fullWidth onChange={ ( e ) => setNumber( e.target.value ) } placeholder='Enter phone number' label='Phone' />
				<div className='w-[calc(100%-0rem)]' id="recaptcha-container"></div>
				<Button fullWidth className='' onClick={ signin }>Send OTP</Button>
			</div>
			<div className='bg-white flex flex-col justify-evenly items-center h-[300px] p-4 rounded w-[calc(300px+2rem)]' style={ { display: show ? "flex" : "none" } }>
				<TextField onChange={(e) => setotp(e.target.value)} className="w-1/2 m-4" label="Enter OTP" placeholder="OTP ..."/>
				<Button fullWidth variant='text' onClick={ ValidateOtp }>Verify</Button>
			</div>
			<ToastContainer />
		</div>
	)
}

export default PhoneAuth
