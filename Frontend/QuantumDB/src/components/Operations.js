import React from 'react'
import CreateButton from './CreateButton'

const Operations = (props) => {
    return (
    <div className='flex items-center space-x-1'>
        <CreateButton refresh={props.refresh}/>
    </div>
    )
}

export default Operations
