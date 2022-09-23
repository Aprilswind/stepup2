import { faUser, faEnvelope, faLock, faPhoneAlt, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TextField, InputAdornment, Button, Avatar, Badge, IconButton } from '@mui/material'
import { useFormik } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { LoadingButton } from '@mui/lab'
import axios from "axios"
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import useAxios from 'axios-hooks'
import { useSession, signIn, signOut } from "next-auth/react"
import { Session } from 'next-auth'

export default function CreateAccount ( { nextProp }: { nextProp: ( bool: boolean ) => void } ) {
    const { data: session }: {data: any} = useSession();

    const [ next, setNext ] = useState( false )
    const [ user, setUser ] = useState<any>( {} )
    const validationSchema = yup.object( {
        displayName: yup.string().required( 'Display Name is required' ),
        phoneNumber: yup.number().typeError( 'Enter a valid phone number' ).min( 10, 'PhoneNumber number should be at least 10 characters long' ).required( 'Phone number is required' )
    } )

    const formik = useFormik( {
        initialValues: {
            phoneNumber: '',
            displayName: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log(values)
        }
    } )

    const submit = async () => {
        await axios.post( 'http://localhost:1337/api/users', {
                ...formik.values, laptopStatus: 4,
                email: session.user.email,
                profilePicture: session.user.image,
                username: session.user.name,
                password: formik.values.phoneNumber,
                displayName: formik.values.displayName
            } ).then((res) => console.log(res))
    }

    useEffect( () => {
        // step1( { })
        nextProp( next )
    }, [ next ] )

    useEffect( () => {
        if ( session && session.user ) {
            console.log(session.user)
            session as any
            if ( !session.user.displayName ) {
                setNext( true )
            }
            if ( !session.user.displayName && session.user.image.split( '.com' )[ 0 ] === 'https://avatars.githubusercontent' ) { 
                axios.post( `http://localhost:1337/api/users/5 }`, {
                    githubUsername: session.user.name
                })
            }
        }
    }, [session])

    return (
        <>
            <AnimatePresence exitBeforeEnter>
                { !next ? ( <motion.div className="flex flex-col justify-center" key='step1' initial={ { opacity: 0, x: "200px" } } animate={ { opacity: 1, x: "0px" } } exit={ { opacity: 0, x: "-200px" } } transition={ { duration: 0.2 } }>
                    <div className='flex flex-col justify-center'>
                        <div className="flex flex-col justify-between items-center">
                            <div>
                                <h1 className='m-0'> Join our community </h1>
                                <p className="text-gray-400 text-sm"> Lorem ipsum dolor sit amet.  </p>
                            </div>
                        </div>
                        <div className="flex items-start justify-between my-12">
                            <img className="object-contain w-1/2" src="github.jpg" alt="" />
                            <p className="text-gray-400 w-60"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ab molestiae qui totam accusantium, doloribus a vel quibusdam error expedita! <span className="text-black"> Lorem ipsum dolor sit amet. </span> </p>
                        </div>
                        <Button sx={ { background: 'black', mx: "auto", width: "100%", "&:hover": { background: 'black' } } } variant='contained' onClick={ () => signIn("github") }>
                                Login with your GitHub account
                        </Button>
                        <Button sx={ { background: 'blue', mt: '1rem', mx: "auto", width: "100%" } } variant='contained' onClick={ () => signIn("google") }>
                                Login with your Google account
                        </Button>
                    </div>
                </motion.div> ) : ( <motion.div className="flex flex-col justify-center" key='step2' transition={ { duration: 0.2 } } initial={ { opacity: 0, x: "200px" } } animate={ { opacity: 1, x: "0px" } } exit={ { opacity: 0, x: "-200px" } }>
                    <h1 className='my-4 text-center mb-0'> Set up your Account </h1>
                    <p className="text-sm text-gray-400"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, voluptas. </p>
                    <form className='w-full rounded-lg p-4 my-12' onSubmit={ formik.handleSubmit }>
                        <TextField
                            InputProps={ {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FontAwesomeIcon icon={ faUser } />
                                    </InputAdornment>
                                )
                            }
                            }
                            margin='normal'
                            fullWidth
                            id='displayName'
                            name='displayName'
                            label='Display Name'
                            value={ formik.values.displayName }
                            onChange={ formik.handleChange }
                            error={ formik.touched.displayName && Boolean( formik.errors.displayName ) }
                            helperText={ formik.touched.displayName && formik.errors.displayName }
                            placeholder='How we should call you ?'
                        />
                        <TextField
                            InputProps={ {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FontAwesomeIcon icon={ faPhoneAlt } />
                                    </InputAdornment>
                                )
                            }
                            }
                            margin='normal'
                            fullWidth
                            id='phoneNumber'
                            name='phoneNumber'
                            label='Phone Number'
                            value={ formik.values.phoneNumber }
                            onChange={ formik.handleChange }
                            error={ formik.touched.phoneNumber && Boolean( formik.errors.phoneNumber ) }
                            helperText={ formik.touched.phoneNumber && formik.errors.phoneNumber }
                            placeholder='Enter your phone number'
                        />
                        <LoadingButton sx={ { background: 'secondary' } } className='my-4' variant="contained" fullWidth type="submit" onClick={() => submit()}>
                            Create Account
                        </LoadingButton>
                    </form>
                </motion.div> ) }
            </AnimatePresence>
        </>
    )
}
