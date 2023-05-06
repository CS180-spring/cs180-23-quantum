import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
    return (
        <>
            <div className='flex flex-auto h-screen'>
                <Sidebar />
                <div className='grow'>
                    <Navbar />
                    <div className='m-5'>{children}</div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default Layout
