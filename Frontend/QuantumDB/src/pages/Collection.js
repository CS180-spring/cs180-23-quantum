import React from 'react'
import { useParams } from "react-router";

const Collection = () => {
    let { id } = useParams();

    return <div className='dark:text-white'>Collection: {id}</div>
}

export default Collection
