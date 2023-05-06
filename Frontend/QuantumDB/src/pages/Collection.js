import React from 'react'
import { useParams } from "react-router";
import Operations from '../components/Operations';
import { useState  } from 'react';
// import { ReadCollection } from '../functions/ReadCollection';
import Folder from '../components/Folder'

const Collection = () => {
    let { id } = useParams();
    const [data] = useState( 'collect1-collect2-doc.json' );
    let objects = data.split('-');
    // useEffect(() => {
    //     // setData(ReadCollection('database/'));
    //   }, []);
      
    return (
    <>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            <h1> Collection: {id}</h1>
            {objects.map((e)=>{
                return (
                <Folder name={e.name} />
                );
            })}
        </div>
        <div className='fixed bottom-0 p-5'>
            <Operations />
        </div>
    </>
    );
}

export default Collection
