import React from 'react'
import Folder from '../components/Folder'
import Operations from '../components/Operations';

const folders = [
    { id: 1, name: 'Collection1', type: 'Folder' },
    { id: 2, name: 'Collection2', type: 'Folder' },
    { id: 3, name: 'Collection3', type: 'Folder' },
    { id: 4, name: 'Collection4', type: 'Folder' },
    { id: 5, name: 'Document1', type: 'JSON' },
  ];

const Database = () => {
    return (
    <>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {folders.map((e)=>{
                return (
                <Folder name={e.name} type={e.type}/>
                );
            })}
        </div>
        <div className='fixed bottom-0 p-5'>
            <Operations />
        </div>
    </>
      );
}

export default Database