import React, { useContext, useEffect, useState } from "react";
import { Navbar as Nav } from "../components/navbar/Navbar";
import Navbar from "../components/Navbar";
import Stepper from "react-stepper-horizontal";
import { useNavigate } from "react-router-dom";
import PhoneAuth from "./PhoneAuth";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify"
import Divider from "../styled components/Divider"
import Container from "../styled components/Container"
import GradientHead from "../styled components/GradientHead"
import { motion, AnimatePresence } from "framer-motion"
import { UserObjectContext } from "../context/user"
import { lvl1InitialForm, lvl2InitialForm, lvl3InitialForm } from "../constants/formInit"
import { Button } from "@mui/material"
import { userType } from "../types/user"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { storage } from "../sdks/firebase"
import { parse } from "path"
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const lvl1Schema = Yup.object().shape({
	name: Yup.string()
	  .min(2, 'Name too short!')
	  .max(50, 'Name too long!'),
	Native: Yup.string()
		.min(2, 'Native too short!')
		.max(50, 'Native too long!'),
	RollNo: Yup.string() 
		.min(7, 'Roll Number must have exactly 7 digits')
		.max(7, 'Roll Number must have exactly 7 digits'),
	address: Yup.string()
		.min(10, 'Address too short!')
		.max(200, 'Address too long!'),
	dob: Yup.string()
	.min(2, 'DOB too short!')
	.max(10, 'DOB too long!')
	.matches(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/, 'DOB should be in format yyyy-mm-dd'),
} );

const lvl2Schema = Yup.object().shape( {
	department: Yup.string()
	  .min(2, 'Department name too short!')
	  .max(50, 'Department name too long!'),
	batch: Yup.string()
	  .min(2, 'Batch name too short!')
	  .max(50, 'Batch name too long!'),
	cgpa: Yup.string()
		.min(1, 'CGPA too short!')
		.max(5, 'CGPA too long!'),
	interest: Yup.string()
	  .min(2, 'Interest too short!')
	  .max(50, 'Interest too long!'),
	description: Yup.string()
	  .min(1, 'Description too short!')
	  .max(50, 'Description too long!'),
	Marks_10th: Yup.string()
	  .min(1, '10th CGPA too short!')
	  .max(5, '10th CGPA too long!'),
	Marks_12th: Yup.string()
	  .min(1, '12th CGPA too short!')
	  .max(5, '12th CGPA too long!'),
})

const lvl3Schema = Yup.object().shape( {
	collegeEssay: Yup.string()
		.max( 2000, 'College Essay too long!' )
		.min( 400, 'College Essay too short!' )
} )

const destructure = ( object1: any, object2: any ): { [key: string]: string } => {
	let keysInObject2 = Object.keys( object2 )
	return keysInObject2.reduce( ( obj: any, key: any ) => {
		obj[ key ] = object1[ key ]
		return obj
	}, {} ) as {
		[ key: string ]: string
	}
}

const uploadsTitles = Array.from([ 'Passport size image', '10th Marksheet', '12th Marksheet' ]).map( t => t.replace(/ /g, '_') )


const Upload = ( { text }: { text: string } ) => {
	const { userObject, setUserObject } = useContext( UserObjectContext )
	let text1 = text.replace(/ /g, '_')
	const handleChange = ( e: any ) => { 
		const file = e.target.files[ 0 ]
		setUserObject({...userObject, [text1]: file})
	}
	return (
		<div className='w-full h-full bg-gray-200 rounded my-2 flex p-4 justify-between items-center'>
			<div className='w-1/2 h-full flex flex-col justify-evenly'> 
				<img className='w-full h-full object-contain p-8' src={ userObject && userObject[ text1 ] ? 'success.svg' : 'docExc.svg' } alt="" />
				{ userObject && userObject[ text1 ] && (
					<p className='text-green-600 text-center'>
					{ String(userObject[text1].name).substring(0, 10).concat('...') }	
					</p>
				)}
			</div>
			<div className='flex flex-col justify-evenly h-full w-1/2 text-gray-600 items-center'>
				<p className='text-center m-4'> { `Upload ${ text }` } </p>
				<Button fullWidth className='relative cursor-pointer'>
					{ userObject && userObject[ text1 ] ? 'change' : 'upload' }
					<input accept='application/pdf' onChange={handleChange} className='absolute top-0 bottom-0 right-0 left-0 opacity-0 cursor-pointer' type="file" />
				</Button>
			</div>
		</div>
	)
} 

const Lvl1 = ({handleForm, handleChange, userObject, setUserObject, steplvl}: {handleForm: any, handleChange: any, userObject: any, steplvl: any, setUserObject: any}) => {
	const handleGithub = () => {
		const provider = new GithubAuthProvider
		provider.addScope('user')
		const auth = getAuth()
		signInWithPopup(auth, provider)
			.then((result) => {
			const user = result.user
			axios.get(`https://api.github.com/user/${user.providerData[0].uid}`).then((res) => {
				console.log(res)
				setUserObject((user: any) => ({...user, githubUserName: res.data.login}))
			}).catch(err => toast.error(err.message))
			}).catch(err => toast.error(err.message))
	}	
	return <Wrapper>
		<p className='m-0 mb-8 text-4xl font-extrabold text-slate-700'> { steps[steplvl].title } </p>
		<div className="h-[5rem] w-full md:w-1/2 lg:w-1/3 flex my-12 flex justify-evenly items-center">
			<img src={"github.png"} className="h-full object-contain mr-4"/>
			<p className={userObject.githubUserName ? "text-green-500 text-lg" : "italic text-blue-500 underline text-lg"} onClick={handleGithub}> {
				userObject.githubUserName ? "Connected ✅" : "Connect your GitHub account"
			} </p>
		</div>
		<Formik 
			initialValues={destructure(userObject, lvl1InitialForm)}
			validationSchema={lvl1Schema}
			onSubmit={values => {
				console.log(values)
				return userObject.githubUserName ? handleForm(values) : (values.name && values.address && values.RollNo && values.Native && values.email && values.dob) && toast.error("Please connect your GitHub account", {position: "bottom-right"}) 
			}}
		>
			{({ errors, touched }) => (
					<Form onChange={handleChange} className='flex flex-col lg:grid lg:gap-4 lg:grid-cols-2 lg:grid-rows-5 lg:items-center lg:justify-center'>
						<div>
							<Field className='lvl1Field' value={userObject.name} name="name" placeholder='Name' />
							{errors.name && touched.name ? (
								<div className="err">{errors.name}</div>
							) : null} 
						</div>
						<div className='row-start-2 row-end-5 w-full h-full'>
							<Field as='textarea' value={userObject.address} className='w-full h-full lvl1Field' name="address" placeholder='Address' />
								{errors.address && touched.address ? (
									<div className="err">{errors.address}</div>
								) : null} 
						</div>
						<div>
							<Field className='lvl1Field' value={userObject.RollNo} name="RollNo" placeholder='Roll Number' />
							{errors.RollNo && touched.RollNo ? (
								<div className="err">{errors.RollNo}</div>
							) : null}
						</div>
						<div>
							<Field className='lvl1Field' value={userObject.Native} name="Native" placeholder='Native' />
							{errors.Native && touched.Native ? (
								<div className="err">{errors.Native}</div>
							) : null}
						</div>
						<div>
							<Field className='lvl1Field' value={userObject.email} name="email" type="Email" placeholder='Email' />
							{ errors.email && touched.email ?
								<div className="err">{ errors.email }</div> : null }
						</div> 
						<div>
							<Field className='lvl1Field' value={userObject.dob} name="dob" type="dob" placeholder='DOB' />
								{ errors.dob && touched.dob ?
									<div className="err">{ errors.dob }</div> : null }
						</div>
					<button className='myBtn mt-8 w-[7rem]' type="submit"> Next </button>
				</Form>
			)}
		</Formik>	
		<ToastContainer />
	</Wrapper>
}

const Lvl2 = ({handleForm, handleChange, userObject, steplvl, setSteplvl}: {handleForm: any, handleChange: any, userObject: any, steplvl: any, setSteplvl: any}) => (
	<Wrapper>
		<p className='m-0 mb-8 text-4xl font-extrabold text-slate-700'> { steps[steplvl].title } </p>
		<Formik
			initialValues={destructure(userObject, lvl1InitialForm)}
			validationSchema={lvl2Schema}
			onSubmit={values => handleForm(values)}
		>
			{({ errors, touched }) => (
				<Form onChange={handleChange}>
					<div className='flex flex-col lg:grid lg:gap-4 lg:grid-cols-2 lg:grid-rows-3 items-center justify-center'>
						<div className="w-full">
							<Field className='lvl1Field w-full' value={userObject.department} name="department" placeholder='Department' />
							{errors.department && touched.department ? (
								<div className="err">{errors.department as string}</div>
							) : null} 
						</div>
						<div className="w-full">
							<Field className='w-full h-full lvl1Field' value={userObject.batch} name="batch" placeholder='Batch' />
								{errors.batch && touched.batch ? (
									<div className="err">{errors.batch as string}</div>
								) : null} 
						</div>
						<div className="w-full">
							<Field className='lvl1Field w-full' value={userObject.cgpa} name="cgpa" placeholder='CGPA' />
							{errors.cgpa && touched.cgpa ? (
								<div className="err">{errors.cgpa as string}</div>
							) : null}
						</div>
						<div className="w-full">
							<Field className='lvl1Field w-full' value={userObject.interest} name="interest" placeholder='Interests' />
							{errors.interest && touched.interest ? (
								<div className="err">{errors.interest as string}</div>
							) : null}
						</div>
						<div className="w-full">
							<Field onChange={handleChange} className='lvl1Field w-full' value={userObject.Marks_10th} name="Marks_10th" placeholder='10th cgpa' />
							{ errors.Marks_10th && touched.Marks_10th ?
								<div className="err">{ errors.Marks_10th as string }</div> : null }
						</div> 
						<div className='col-start-2 w-full'>
							<Field className='lvl1Field w-full' value={userObject.Marks_12th} name="Marks_12th" type="12th cgpa" placeholder='12th cgpa' />
								{ errors.Marks_12th && touched.Marks_12th ?
									<div className="err">{ errors.Marks_12th as string }</div> : null }
						</div>
						<div className='row-start-3 row-end-5 w-full h-full'>
							<Field as='textarea' value={userObject.description} className='lvl1Field w-full h-full' name="description" type="description" placeholder='Tell us about yourself' />
								{ errors.Marks_12th && touched.Marks_12th ?
									<div className="err">{ errors.description as string }</div> : null }
						</div>	
					</div>
					<div className='flex flex-col lg:flex-row justify-between items-center my-4 py-4 w-full h-full'>
						{ uploadsTitles.map( text => {
							return ( <div className='w-full md:w-1/2 lg:w-[30%] h-full'>
								<Upload text={text}/>
							</div>)
						})}
					</div>
					<button className='myBtn ml-[10rem] mt-8 w-[7rem]' type="submit"> Next </button>
				</Form>
			)}
		</Formik>		
		<button onClick={() => setSteplvl(0)} className='myBtn bottom-[7rem] left-6 absolute mt-8 w-[7rem]'> Back </button>
	</Wrapper>
)

const Lvl3 = ({ userObject, steplvl, setSteplvl, handleSubmit, handleChange}: {handleForm: any, handleChange: any, userObject: any, steplvl: any, setSteplvl: any, handleSubmit: any}) => (
	<Wrapper>
		<p className='m-0 mb-8 text-4xl font-extrabold text-slate-700'> { steps[steplvl].title } </p>
		<Formik
			initialValues={destructure(userObject, lvl3InitialForm)}
			validationSchema={lvl3Schema}
			onSubmit={handleSubmit}
		>
		{ ( { errors, touched } ) => (
			<Form className='w-full h-full'>
				<div>
					<Field onChange={handleChange} as='textarea' value={userObject.collegeEssay} className='lvl1Field h-[30rem] overflow-y-auto' name="collegeEssay" placeholder='Summary of your necessity' />
					{ errors.collegeEssay && touched.collegeEssay ? (
						<div className="err">{ errors.collegeEssay }</div>
					) : null }
				</div>
				<button type='submit' className='myBtn ml-[10rem] mt-8'> Submit request </button>
			</Form>
		) }
		</Formik>	
		<button onClick={ () => setSteplvl( 1 ) } className='myBtn bottom-[7rem] left-6 absolute mt-8 w-[7rem]'>
			Back
		</button>
	</Wrapper>
)

const Wrapper = ( { className = '', children }: { className?: string, children: React.ReactNode } ) => {
	return <Container className={ `my-4 relative ${ className }` }>
		<Divider />
		{ children }
		<Divider />
	</Container>
}

const steps = [
	{ title: "Student Details" },
	{ title: "Academic Details" },
	{ title: "Need for Laptop" }
]

export const Login = ( { phno }: { phno: string } ) => {

	const { userObject, setUserObject } = useContext(UserObjectContext)
	const [steplvl, setSteplvl] = useState<number>(0); 
	const [progress, setProgress] = useState(false)

	const handleChange = ( e: any ) => {
		e.preventDefault();
		let key = e.target.name 
		let value = e.target.value
		console.log(key, value)
		setUserObject(p => ({...p, [key]: value}))
	}

	const handleForm = (obj: any) => {
		setUserObject( ( prev: any ) => ( {
			...prev,
			...obj
		} ) )
		setSteplvl(p => p + 1)
	}

	const handleSubmit = () => {

		const fileKeys = Object.keys(userObject).filter( key => uploadsTitles.includes(key) )

		const files = fileKeys.map( key => userObject[key] )
		
		fileKeys.forEach( (key: string, i: number) => {
			const storageRef = ref( storage, `_${ userObject.phNo }/${ key }` )
			const uploadTask = uploadBytesResumable( storageRef, files[i] )
			uploadTask.on( 'state_changed', () => {
			},
			() => toast.error( `Error Occured !, please check network connections or try again` ),
			async () => {
				getDownloadURL( storageRef ).then( ( url ) => {
					userObject[key] = url
					if ( i === fileKeys.length - 1 ) {
						let jeremyUser = {
							...userObject,
							Report_10th: userObject["10th_Marksheet"],
							Report_12th: userObject["12th_Marksheet"],
							imgsrc: userObject[ "Passport_size_image" ],
							RollNo: parseInt( userObject.RollNo ),
							batch: parseInt( userObject.batch ),
							phno: parseInt(userObject.phNo.slice(3)),
							username: phno,
							password: Math.random().toString(),
							CollegeEssay: userObject.collegeEssay
						} as {[key: string]: any}
						console.log(jeremyUser)
						console.log(userObject)
						axios.post( 'https://stepup-laptopapp.herokuapp.com/api/auth/local/register/', jeremyUser ).then( resp => {
							toast.success( 'Your requested has been submitted sucessfully' )
							console.log( resp )
						} ).catch( err => {
							toast.error( err.message )
							console.log( err, err.message, JSON.stringify( err, null, 20 ) )
						})
					}
				} )
			} )
		})
	}

	useEffect( () => {
		console.log(userObject)
	}, [userObject])

	const componentSwitcher = ( i: number ) => {
		switch ( i ) {
			case 0:
				default:
					return <Lvl1 setUserObject={setUserObject} handleForm={handleForm} handleChange={handleChange} userObject={userObject} steplvl={steplvl} />;
			case 1:
				return <Lvl2 handleForm={handleForm} handleChange={handleChange} userObject={userObject} steplvl={steplvl} setSteplvl={setSteplvl} />;
			case 2:
				return <Lvl3 handleForm={handleForm} handleChange={handleChange} userObject={userObject} steplvl={steplvl} setSteplvl={setSteplvl} handleSubmit={handleSubmit} />;
		}
	}

	return (
		<div style={ { backgroundColor: "white" } } className="w-full h-full bg-black">
			<GradientHead className='text-6xl py-4 mb-4' text={"Few more steps ..."}/>
			<div className='font-Roboto'>
				<Stepper
					completeColor="#1890ff"
					defaultBorderColor="1890ff"
					defaultBorderWidth={0}
					steps={steps}
					activeStep={steplvl}
				/>
			</div>
			<AnimatePresence>
				<motion.div className='w-full h-full'
					initial={ { translateY: '-100vh' } }
        			animate={{ translateY: '0' }}
					exit={ { translateY: '0' } }
					transition={{ duration: 0.5 }}
				> 
					{ componentSwitcher( steplvl ) }
				</motion.div>
			</AnimatePresence>
		</div>
	);
};
