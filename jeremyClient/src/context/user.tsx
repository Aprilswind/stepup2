import * as React from 'react';
import { createContext, useState } from "react"
import { lvl1InitialForm, lvl2InitialForm, lvl3InitialForm } from "../constants/formInit"
import { userType } from "../types/user"

type context = {
    userObject : userType,
    setUserObject: React.Dispatch<React.SetStateAction<userType>>
}
 
export const UserObjectContext = createContext<context>( {
    userObject: { 
    phNo: "",
    ...lvl1InitialForm,
    ...lvl2InitialForm,
    ...lvl3InitialForm
}, setUserObject: () => { } } )

export const UserObjectProvider = ( {children}: {children: React.ReactNode} ) => {
    const [ userObject, setUserObject ] = useState<userType>( {
        phNo: '',
        ...lvl1InitialForm,
        ...lvl2InitialForm,
        ...lvl3InitialForm
    } )
    return (
        <UserObjectContext.Provider value={ {userObject, setUserObject} }>
            {children}
        </UserObjectContext.Provider>
    )
}