import { faUser, faEnvelope, faLock, faPhoneAlt, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TextField, InputAdornment, Button, Avatar, Badge, IconButton } from '@mui/material'
import { useFormik } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import * as yup from 'yup'
import { LoadingButton } from '@mui/lab'
import axios from "axios"

export default function CreateAccount () {

    const [ next, setNext ] = useState( true )
    const [ user, setUser ] = useState<any>( {} )
    const validationSchema = yup.object( {
        username: yup.string().required( 'Username is required' ),
        displayName: yup.string().required( 'Display Name is required' ),
        email: yup.string().email( 'Enter a valid email address' ).required( 'Email is required' ),
        password: yup.string().min( 8, 'Password should be at least 8 characters long' ).required( 'Password is required' ),
        phone: yup.number().typeError( 'Enter a valid phone number' ).min( 10, 'Phone number should be at least 10 characters long' ).required( 'Phone number is required' )
    } )

    const formik = useFormik( {
        initialValues: {
            email: '',
            password: '',
            phone: '',
            username: '',
            displayName: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            // axios.post( 'http://localhost:1337/api/users', { ...values, laptopStatus: 4 } ).then( ( resp ) => {
            //     let {displayName, email, username, phone} = resp.data
            //     setUser( { displayName, email, username, phone } )
            //     setNext( true )
            // }).catch(err => console.log("err", err.response))
            setNext( true )
        }
    } )

    const handleImage = () => {

    }

    return (
        <>
            <AnimatePresence exitBeforeEnter>
                { next ? ( <motion.div key='step1' initial={ { opacity: 0, x: "200px" } } animate={ { opacity: 1, x: "0px" } } exit={ { opacity: 0, x: "-200px" } } transition={ { duration: 0.2 } }>
                    <div className='flex flex-col justify-center items-baseline'>
                        <div className='flex mb-20 justify-between items-center'>
                            <h1 className='m-4'> Setup your account </h1>
                            <Button onClick={ ( () => setNext( false ) ) }> SKIP </Button>
                        </div>
                        <div className="my-4 flex justify-center items-center">
                            <div>
                            <Avatar sx={ { width: '160px', height: '160px', m: 4 } } />
                            </div>
                            <div className="m-4">
                                <h2> Add a Profile Picture </h2>
                                <p className="text-gray-600 bg-black">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, voluptate?
                                </p>
                            </div>
                        </div>
                        <Button sx={ { background: 'black', "&:hover": { background: 'black' } } } variant='contained' >
                            Connect your GitHub account
                        </Button>
                    </div>
                </motion.div> ) : ( <motion.div key='step2' transition={ { duration: 0.2 } } initial={ { opacity: 0, x: "200px" } } animate={ { opacity: 1, x: "0px" } } exit={ { opacity: 0, x: "-200px" } } className="w-full flex flex-col justify-center items-center">
                    <h1 className='my-4 text-center'> Create You Account </h1>
                    <form className='w-full' onSubmit={ formik.handleSubmit }>
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
                            placeholder='Enter your name'
                        />
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
                            id='username'
                            name='username'
                            label='Username'
                            value={ formik.values.username }
                            onChange={ formik.handleChange }
                            error={ formik.touched.username && Boolean( formik.errors.username ) }
                            helperText={ formik.touched.username && formik.errors.username }
                            placeholder='Enter your name'
                        />
                        <TextField
                            InputProps={ {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FontAwesomeIcon icon={ faEnvelope } />
                                    </InputAdornment>
                                )
                            }
                            }
                            margin='normal'
                            fullWidth
                            id='email'
                            name='email'
                            label='Email'
                            value={ formik.values.email }
                            onChange={ formik.handleChange }
                            error={ formik.touched.email && Boolean( formik.errors.email ) }
                            helperText={ formik.touched.email && formik.errors.email }
                            placeholder='Enter your email'
                        />
                        <TextField
                            InputProps={ {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FontAwesomeIcon icon={ faLock } />
                                    </InputAdornment>
                                )
                            }
                            }
                            margin='normal'
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={ formik.values.password }
                            onChange={ formik.handleChange }
                            error={ formik.touched.password && Boolean( formik.errors.password ) }
                            helperText={ formik.touched.password && formik.errors.password }
                            placeholder='Enter password'
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
                            id='phone'
                            name='phone'
                            label='Phone'
                            value={ formik.values.phone }
                            onChange={ formik.handleChange }
                            error={ formik.touched.phone && Boolean( formik.errors.phone ) }
                            helperText={ formik.touched.phone && formik.errors.phone }
                            placeholder='Enter your phone number'
                        />
                        <Button className='my-4' variant="contained" fullWidth type="submit">
                            Create Account
                        </Button>
                    </form>
                    <LoadingButton className='mt-5' fullWidth variant='outlined'>
                        Login with Existing Account
                    </LoadingButton>
                </motion.div> ) }
            </AnimatePresence>
        </>
    )
}
