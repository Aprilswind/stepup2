import React, { useContext, useEffect, useState } from "react";
import "./Landing.css";
import Container from "../styled components/Container"
import Divider from "../styled components/Divider"
import PhoneAuth from "../lib/PhoneAuth"
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Button, Modal, Toolbar } from "@mui/material"
import GradientHead from "../styled components/GradientHead"
import { Login } from "../lib/Login"
import { UserObjectContext } from "../context/user"
import { AnimatePresence, motion } from "framer-motion"
import Status from "../lib/Status"
import Update from "../lib/Update"
import { toast, ToastContainer } from "react-toastify";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowDown} from "@fortawesome/free-solid-svg-icons"

const faqData = [
	{
		header: "Who can apply ?",
		content: "Students with need can apply"
	},
	{
		header: "When should I repay ?",
		content: "After getting placed in a company"
	}
]

const tocData = [
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. "
]

export const Landing = () => {

	const { userObject, setUserObject } = useContext(UserObjectContext) 
	const [modal, setModal] = useState(false)
	const [next, setNext] = useState(false)
	

	useEffect(() => {
		if(userObject?.done) {
			setModal(false)
		}
	}, [userObject])

	return (
		<div className='bg-gray-100 w-full h-full flex flex-col lg:block items-center'>
			<ToastContainer />
			<Container maxWidth={"lg"} className='my-0 h-auto w-full'> 
				<div className="w-full mx-auto md:w-2/3 lg:w-full flex flex-col lg:block items-center justify-center">
			<Box sx={{flexGrow: 1}}>
				<AppBar style={{background: "#1D4ED8"}} position="static">
					<Toolbar>
						<p className="text-white italic text-2xl"> GCT Alumni Association </p>
					</Toolbar>
				</AppBar>
			</Box>
				<p className='text-lg border-b-2 border-slate-700 lg:text-left lg:w-1/2 text-center font-italic p-4 my-12 mx-auto lg:mx-4'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam consequuntur accusantium quod, autem voluptatum quaerat facere dolorem optio ipsam a?
				</p>
					<div className='flex flex-col lg:h-[1000px] justify-center lg:w-full lg:flex-row items-start'>
						<div className='mx-4 my-auto bg-blue-700 h-1/2 flex flex-col justify-around text-white rounded drop-shadow-lg shadow-black p-4 w-[calc(100%-2rem)]'>
							<p className='text-2xl my-4 text-center'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, error?
							</p>
							<p className='text-center text-lg'>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, minus libero. Facilis illo commodi voluptate quo voluptatum consequuntur officia ex incidunt debitis alias a natus iusto voluptatem molestias, similique veniam Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates soluta deleniti fugiat facilis voluptatum obcaecati nulla autem perspiciatis temporibus tempore.
							</p>
						</div>
						<div className='w-full h-1/2 lg:h-full'>
							<div className="w-full h-1/2 flex justify-center item-center">
								<p className='text-right m-auto p-4 text-3xl md:text-4xl lg:text-6xl font-extra-bold text-gray-500'>
									Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et, dolor!
								</p>
							</div>
							<div className='flex m-4 justify-center items-center w-full h-1/2'>
								<img className='h-full mx-2 object-contain' src="svg3.svg" alt="" />
							</div>
						</div>
				</div>
						<p className='mt-12 text-center text-lg lg:w-1/2 font-italic'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam consequuntur accusantium quod, autem voluptatum quaerat facere dolorem optio ipsam a?
						</p>
					<Divider />
					<div className="m-4">
						<p className="text-4xl uppercase text-slate-700 font-extrabold"> Terms & Conditions </p>
						{ tocData.map((text, i) => (
							<p className="m-4 text-lg"> 
								{"-> " + text}
							</p>
						)) }	
					</div>
					<Divider />
					<div className='flex flex-col justify-evenly lg:flex-row items-center my-12 w-full'>
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
								<div className='flex m-4 flex-col justify-center items-center w-full'>
										<p className='text-center text-xl font-bold'> {arr.heading} </p>
										<p className='text-center my-4 font-light text-gray-600'> {arr.subHeading} </p>
										<Button variant='outlined' onClick={ () => setModal( true ) } className='mx-4 lg:w-full w-2/3'>
											{arr.text}
										</Button>
								</div>
							)
						})}
					</div>
 				</div>
				<Divider />
				<div>
					<p className="text-4xl font-extrabold text-slate-700 m-4">
						FAQ
					</p>		
					{faqData.map(({header, content}, i) => {
						return (
							<Accordion id={String(i)} className="my-8 mx-4">
								<AccordionSummary style={{background: "#1D4ED8"}} expandIcon={
									<FontAwesomeIcon className="text-xl text-white" icon={faArrowDown}/>
								}>
									<p className="p-4 text-xl text-white font-light"> {header} </p>
								</AccordionSummary>
								<AccordionDetails>
									<p className="p-4"> {content} </p>
								</AccordionDetails>
							</Accordion>
						) 
					})}
				</div>
				<Divider />
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
										<Box className='bg-white pt-16 w-full h-full rounded relative'>
											<i className='fa fa-close bg-red-500 cursor-pointer rounded-lg p-2 px-3 text-white absolute top-4 right-4' onClick={ () => setModal( false ) }></i>
											<Container maxWidth={"lg"} className='w-full my-0 h-[calc(100%-4rem)] overflow-y-auto lg:overflow-visible'>
													<GradientHead text={ 'Authenticate using phone number.' } className='py-0 w-full text-left' />
													<div className='flex flex-col lg:flex-row justify-between lg:mt-12 w-full items-center h-[calc(100%-4rem)]'>
														<PhoneAuth done={ () => setNext( true ) }  updateData={ setUserObject } />
														<img src="auth.svg" className='h-full w-full lg:w-1/2 origin-center object-contain' alt="" />
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
														: userObject.LaptopStatus? 
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
