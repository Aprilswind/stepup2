import axios from 'axios'
import React, { useContext } from 'react'
import { UserObjectContext } from '../context/user'
import Divider from '../styled components/Divider'
import GradientHead from '../styled components/GradientHead'

const componentMap = [
    {
        status: 'Pending',
        heading: 'Laptop Pending',
        subHeading: 'Your application form is pending.'
    },
    {
        status: 'Rejected',
        heading: 'Laptop Rejected',
        subHeading: 'Your application has been rejected.'
    },
    {
        status: 'Accepted',
        heading: 'Laptop Accepted',
        subHeading: 'Your application has been accepted.'
    }
]

export default function Status () {
    const { userObject, setUserObject } = useContext( UserObjectContext )
    const foundStatus = componentMap.find( key => key.status === userObject.LaptopStatus )! 

    const handleSubmit = () => {
        axios.put(`https://stepup-laptopapp.herokuapp.com/api/users/${userObject.id}`, {
            LaptopReceivedByStudent: true
        }).then(() => setUserObject((prev) => ({ ...prev, LaptopReceivedByStudent: true })))
    }

    return (
        <div className='w-full h-full'>
            <GradientHead text={ foundStatus.heading } size='4xl' />
            <Divider />
            <div className='flex justify-center items-center h-full'>
                <p className='uppercase text-gray-600 my-4'> { foundStatus.subHeading } </p>
            </div>
            { userObject.LaptopStatus === 'Accepted' && (
                <div className='w-full my-4'>
                    <p className='my-4'>
                        Congratulations on getting your laptop. You can now start learning.
                    </p>
                    <p>
                        You can visit our partnered store to receive your laptop. For more information, please contact admin.
                    </p>
                    <Divider />
                    <p className='m-0 mb-8 text-4xl font-extrabold text-slate-700'>
                        Confirm after receiving laptop in hand
                    </p>
                    <button onClick={handleSubmit} className='myBtn'>
                        Yes, laptop received in hand
                    </button>
                </div>
            )}
            <Divider />
        </div>
    )
}
