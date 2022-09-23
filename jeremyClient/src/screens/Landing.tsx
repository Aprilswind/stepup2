import React, { useContext, useState } from "react";
import "./Landing.css";
import Container from "../styled components/Container"
import Divider from "../styled components/Divider"
import PhoneAuth from "../lib/PhoneAuth"
import { Box, Button, Modal } from "@mui/material"
import GradientHead from "../styled components/GradientHead"
import { Login } from "../lib/Login"
import { UserObjectContext } from "../context/user"
import { AnimatePresence, motion } from "framer-motion"
import Status from "../lib/Status"
import Update from "../lib/Update"

export const Landing = () => {

	const { userObject, setUserObject } = useContext(UserObjectContext) 
	const [modal, setModal] = useState(false)
	const [next, setNext] = useState(false)
	
	return (
		<div className='bg-white'>
			<div className='relative h-[calc(100vh-2rem)]'>
				<Container className='h-full'>
					<div className='flex h-[calc(100%-15rem)] justify-center items-center m-4 mb-0 p-4 pt-8 border-b-0 rounded rounded-b-none relative z-10'>
						<div className='w-1/2 relative h-full flex items-center'>
							<div className='w-1/2 h-full z-10 bg-white rounded mr-2 mt-0 mb-20'></div>
							<div className='w-1/2 h-full z-10 border-white border-2 rounded ml-2 mt-20'></div>
							<p className='stroke-white text-right top-1/2 p-4 -translate-y-1/2 absolute text-7xl font-extra-bold bg-gradient-to-r z-20 from-sky-700 via-sky-400 to-sky-100 text-transparent bg-clip-text'>
								Lorem ipsum dolor sit amet.
							</p>
						</div>
						<div className='w-1/2 h-full p-4 flex flex-col justify-center items-center'>
							<img className='object-contain shadow shadow-black ml-12 h-[calc(100%-5rem)]' src="landing.jpg" alt="" />
							<div className=' m-4 p-4 h-[4rem] w-full'>
								<p className='text-4xl text-gray-100 text-right'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
								</p>
							</div>
						</div>
					</div>
					<div className='w-full relative z-10 flex justify-center items-center h-[15rem] bg-transparent'>
						<Button className='w-1/5 mr-8 text-blue-700 bg-white border-2 border-blue-700 py-2 text-xl rounded-xl'> Learn More </Button>
						<Button className='ml-8 w-1/5 text-white rounded-xl py-2 text-xl bg-gradient-to-r from-sky-500 via-blue-500 to-sky-900' onClick={() => setModal(true)}> Apply </Button>
					</div>
				</Container>
				<div className='absolute -top-4 bottom-0 left-0 right-0 bg-blue-700 -z-1' style={{clipPath: 'ellipse(120% 100% at 92% 0%)'}}></div>
			</div>
			<Container className='my-0'> 
				<p className='text-center text-4xl uppercase bg-white m-4 mt-12'>
					Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
				</p> 
				<p className='text-lg font-italic w-1/2 p-4 my-12'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam consequuntur accusantium quod, autem voluptatum quaerat facere dolorem optio ipsam a?
				</p>
				<div>
					<div className='flex justify-center h-[35rem]'>
						<div className='mr-4 bg-blue-700 h-full flex flex-col justify-around text-white rounded drop-shadow-lg shadow-black p-20 w-1/2'>
							<p className='text-2xl my-4 text-center'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, error?
							</p>
							<p className='text-center text-lg'>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, minus libero. Facilis illo commodi voluptate quo voluptatum consequuntur officia ex incidunt debitis alias a natus iusto voluptatem molestias, similique veniam Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates soluta deleniti fugiat facilis voluptatum obcaecati nulla autem perspiciatis temporibus tempore.
							</p>
						</div>
						<div className='w-1/2 h-[15rem]'>
							<p className='text-right h-[20rem] ml-4 text-6xl font-extra-bold text-gray-500'>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et, dolor!
							</p>
							<div className='flex justify-center items-center w-full h-full'>
								<img className='h-full mx-2 object-contain' src="svg3.svg" alt="" />
							</div>
						</div>
					</div>
					<div className='flex'>
						<p className='mt-20 text-lg font-italic w-1/2'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam consequuntur accusantium quod, autem voluptatum quaerat facere dolorem optio ipsam a?
						</p>
					</div>
					<Divider />
					<div className='flex justify-evenly items-center my-12 w-full'>
						{ [ {
							heading: 'Received laptop ?',
							subHeading: 'Update your scholastic progrss',
							text: 'update progress'
						}, {
							heading: 'Applied Already ?',
							subHeading: 'View Application Progress',
							text: 'application progress'
							}, 
							{ 
								heading: 'Apply for a laptop',
								subHeading: 'Apply for a laptop with an application form',
								text: 'Apply'
							}
						].map( arr => {
							return (
								<div className='flex flex-col justify-center items-center w-1/3'>
									<div>
										<p className='text-center my-4 text-xl font-bold'> {arr.heading} </p>
										<p className='text-center my-4 font-light text-gray-600'> {arr.subHeading} </p>
										<Button fullWidth variant='outlined' onClick={ () => setModal( true ) } className='mx-4'>
											{arr.text}
										</Button>
									</div>
								</div>
							)
						})}
					</div>
					<Divider />
 				</div>
			</Container>
			<Modal
				open={modal}
				onClose={() => setModal(false)}
				className='w-screen h-screen flex justify-center items-end'
			>
				<AnimatePresence>
					<motion.div
						key={ 'main' }
						initial={ { translateY: '100vh' } }
						animate={ { translateY: '0' } }
						exit={ { translateY: '0' } }
						transition={{duration: 3}}
						className='w-screen h-screen flex justify-center items-end'>
							<AnimatePresence>
								{ !next ? (
									<motion.div key={"0"} className='w-full h-[calc(100vh-5rem)]'>
										<Box className='bg-white w-full h-full rounded relative'>
											<i className='fa fa-close bg-red-500 cursor-pointer rounded-lg p-2 px-3 text-white absolute top-4 right-4' onClick={ () => setModal( false ) }></i>
											<Container className='w-full h-full'>
												<div className='flex flex-col justify-around items-center w-full h-full'>
													<GradientHead text={ 'Authenticate using phone number.' } size={ '6xl' } className='py-4 w-full text-left' />
													<div className='flex h-1/2 justify-between w-full items-center'>
														<PhoneAuth done={ () => setNext( true ) }  updateData={ setUserObject } />
														<img src="auth.svg" className='h-full scale-150 origin-center object-contain' alt="" />
													</div>
												</div>
											</Container>
										</Box>
									</motion.div>
								) : (
									<motion.div key={"1"} className='w-full h-[calc(100vh-5rem)]'>		
										<Box className='bg-white w-full h-full rounded relative overflow-y-auto'>
											<i className='fa fa-close bg-red-500 cursor-pointer rounded-lg p-2 px-3 text-white absolute top-4 right-4' onClick={ () => setModal( false ) }></i>
											<Container className='w-full '>
												{
													userObject.LaptopReceivedByStudent
														? ( <Update /> )
														: userObject.LaptopStatus ? 
															( <Status /> )
															:  <Login phno={ userObject.phNo } />
												}
											</Container>
										</Box>
									</motion.div>		
								) }
							</AnimatePresence>
					</motion.div> 
				</AnimatePresence>
			</Modal>
		</div>
	);
};
