import React, {useContext} from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import {AuthContext} from './AuthContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
    const {auth} = useContext(AuthContext)
    return (
        <>
        {
            auth === 'true' ?
            <div className='flex flex-auto h-screen'>
                <Sidebar />
                <div className='grow'>
                    <Navbar />
                    <div className='m-5'>{children}</div>
                </div>
                <ToastContainer />
            </div>
            :
            <div>
            {children}
            </div>
        }
        </>
    )
}

export default Layout
