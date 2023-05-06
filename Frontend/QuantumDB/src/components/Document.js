import React from 'react'

const Document = (props) => {

  return (
    <>
    {!props.name.includes('.json') ? 
        <></>
    :
        <a href='/database/json'>
            <div className='flex border-2 p-3 rounded-md m-2 items-center border-stone-700 dark:border-white'>
            <h4 className='font-bold text-stone-700 dark:text-white mt-1 mb-1'>JSON</h4>
            <h3 className='ml-5 text-stone-700 dark:text-white'> {props.name}</h3>
            </div>
        </a>
    }
    </>
  )
}

export default Document