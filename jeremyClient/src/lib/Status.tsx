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
        status: 'Approved',
        heading: 'Laptop Accepted',
        subHeading: 'Your application has been accepted.'
    }
]

export default function Status () {
    const { userObject, setUserObject } = useContext( UserObjectContext )
    const foundStatus = componentMap.find( key => key.status === userObject.LaptopStatus )! 

    const yyyymmdd = (date: Date) => {
        var mm = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();
        return [date.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
            ].join('-');
        };



    const handleSubmit = () => {
        let obj = {
            LaptopReceivedByStudent : true,
            LaptopdateReceived: yyyymmdd(new Date)
        }
        axios.put(`https://laptopapp.onrender.com/api/users/${userObject.id}`, obj).then(() => setUserObject((prev) => ({ ...prev, ...obj, done: true })))
    }

    return (
        <div className='w-full h-full'>
            <GradientHead text={ foundStatus.heading } size='4xl' />
            <Divider />
            <div className='flex justify-center items-center h-full'>
                <p className='uppercase text-gray-600 my-4'> { foundStatus.subHeading } </p>
            </div>
            { userObject.LaptopStatus === 'Approved' && (
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
