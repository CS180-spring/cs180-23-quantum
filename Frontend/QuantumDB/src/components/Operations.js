import React from 'react'

const Operations = () => {
    return (
    <div className='flex justify-around space-x-3'>
        <button className='bg-darkPurple rounded p-3 text-white'>New Folder</button>
        <button className='bg-darkPurple rounded p-3 text-white'>New Document</button>
        <button className='bg-darkPurple rounded p-3 text-white'>Update</button>
        <button className='bg-darkPurple rounded p-3 text-white'>Delete</button>
    </div>
    )
}

export default Operations
