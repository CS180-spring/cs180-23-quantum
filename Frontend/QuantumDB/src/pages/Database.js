import React, { useCallback, useState, useEffect, useContext } from 'react';
import Folder from '../components/Folder';
import Document from '../components/Document';
import Operations from '../components/Operations';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ThemeContext } from '../components/ThemeContext';
import 'react-toastify/dist/ReactToastify.css';

function checkDoc(doc) {
    return doc.includes(".json");
}

function checkFolder(doc) {
    return !doc.includes(".json");
}

const Database = () => {
    var [data, setData] = useState([])
    const {theme} = useContext(ThemeContext)

    const fetchData = useCallback( async () => {
        const url = 'http://ec2-3-145-4-143.us-east-2.compute.amazonaws.com:8000/read/database/database/folder'
        const data = await axios.get(url)
            .then(function (response) {
                const objects = response.data.toString().split('-');
                var filtered = objects.filter(function (el) {
                    return el !== "";
                    });
                return filtered;
            })
            .catch(function (error) {
                console.log(error);
                toast.error(error, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: theme,
                })
            });
        setData(data);
    }, [theme])

    useEffect(() => {
        fetchData()
      }, [])
          
    return (
    <>
        <h2 className='text-xl p-2 text-stone-700 font-medium dark:text-white'>
        Collections
        </h2>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {data && data.filter(checkFolder).length>0 
            ? 
            data.map((e)=>{
                return (
                <Folder key={e} name={e} />
                );})
            :
            <h3 className='p-2'>No collections saved in the database.</h3>
            }
        </div>
        <h2 className='mt-10 text-xl p-2 text-stone-700 font-medium dark:text-white'>
        Documents
        </h2>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {data && data.filter(checkDoc).length>0 
            ? 
            data.map((e)=>{
                return (
                <Document key={e} name={e} />
                );})
            :
            <h3 className='p-2'>No documents saved in the database.</h3>
            }
        </div>
        <div className='fixed bottom-0 p-2 mb-2'>
            <Operations refresh={fetchData} />
        </div>
    </>
      );
}

export default Database