import React, {useState} from 'react'
import { motion } from 'framer-motion';
import { AiOutlineSearch,AiOutlineEnter } from 'react-icons/ai';
import axios from 'axios';
import Folder from '../components/Folder';
import Document from '../components/Document';

function checkDoc(doc) {
    return doc.includes(".json");
}

function checkFolder(doc) {
    return !doc.includes(".json");
}

const Search = () => {
    var [data, setData] = useState(null)

    const fetchData = async() => {
        const u = 'http://ec2-13-58-177-173.us-east-2.compute.amazonaws.com:8000/search/'
        const name = document.getElementById('searchQ').value 
        const path = '/database'
        const url = u + name + path
        const data = await axios.get(url)
            .then(function (response) {
                const objects = response.data.toString().split(',');
                var filtered = objects.filter(function (el) {
                    return el !== "";
                    });
                return filtered;
            })
            console.log(data)
        setData(data);
    };

    return (
        <div>
            <div className="max-w-lg mx-auto rounded-lg overflow-hidden md:max-w-xl">
                <div className="md:flex">
                    <div className="w-full p-3">
                        <div className="relative">
                        <i className="absolute text-gray-400 top-5 left-4"> <AiOutlineSearch size={18} /></i>
                       <input className="bg-darkPurple dark:bg-white dark:text-black h-14 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer" id="searchQ"/>
                        <button>
                        <motion.i onClick={fetchData} whileHover={{scale:1.3}} className="absolute text-gray-400 top-5 right-4"><AiOutlineEnter /></motion.i>
                        </button>
                        </div>
                    </div>
                </div>
                <div className='mt-5 p-2'>
                <h2 className='text-xl p-2 text-stone-700 font-medium dark:text-white'>
                Collections
                </h2>
                <div className='grid sm:grid-cols-1 md:grid-cols-2'>
                    {data && Array.isArray(data) && data.filter(checkFolder).length>0 
                    ? 
                    data.map((e)=>{
                        return (
                        <Folder refresh={fetchData} key={e} name={e} />
                        );})
                    :
                    <h3 className='p-2'>No collections found.</h3>
                    }
                </div>
                <h2 className='mt-10 text-xl p-2 text-stone-700 font-medium dark:text-white'>
                Documents
                </h2>
                <div className='grid sm:grid-cols-1 md:grid-cols-2'>
                    {data && Array.isArray(data) && data.filter(checkDoc).length>0 
                    ? 
                    data.map((e)=>{
                        return (
                        <Document refresh={fetchData} key={e} name={e} />
                        );})
                    :
                    <h3 className='p-2'>No documents found.</h3>
                    }
                </div>
            </div>
            </div> 
        </div>
    );
}

export default Search
