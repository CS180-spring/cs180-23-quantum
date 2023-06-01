import React, {useContext} from 'react'
import {AuthContext} from '../components/AuthContext'

const Background = ({ children }) => {
    const {auth} = useContext(AuthContext)
    return (
        <>
            { auth === 'false' && window.location.pathname === '/' ?
            <div className='bg-transparent'>{children}</div>
            :
            <div className='bg-offWhite dark:bg-gray-800'>{children}</div>
            }
        </>
)}

export default Background
