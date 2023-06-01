import React, {useContext, useEffect, useCallback} from 'react'
import { JsonToTable } from "react-json-to-table";
import 'draft-js/dist/Draft.css';
import { ThemeContext } from '../components/ThemeContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { AiOutlineEdit, AiOutlineSave, AiOutlineTable, AiOutlineSearch, AiOutlineReload, AiOutlineNumber, AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import { BsBraces, BsFilter } from "react-icons/bs";
import { IoMdClose } from "react-icons/io"
import axios from 'axios';
import { useParams } from "react-router";
import 'react-toastify/dist/ReactToastify.css';
import '../styles/table.css'
import { WarningNotification } from '../functions/WarningNotification';
import { SuccessNotification } from '../functions/SuccessNotification';

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

 function searchJson(obj, predicate) {
    let result = []; 
    for(let p in obj) {
        if (typeof(obj[p]) == 'object') {
            result = result.concat(searchJson(obj[p], predicate));
        } else if (predicate(p, obj[p])) 
            result.push(
               obj
        );
    }
    return result;
}

const Document = () => {
    let { id } = useParams();
    const ref = React.useRef(null);
    const [edit, setEdit] = React.useState(false)
    const {theme} = useContext(ThemeContext)
    const [fileinfo, setFileinfo] = React.useState('')
    const [editorinfo, setEditorinfo] = React.useState('')
    const [viewerinfo, setViewerinfo] = React.useState('')
    const [stringState, setStringState] = React.useState(false);
    const [intState, SetIntState] = React.useState(false);
    const [searching, setSearching] = React.useState(false);
    const [sorting, setSorting] = React.useState(false)
    const [operator, setOperator] = React.useState(3);

    const fetchData = useCallback( async () => {
        const u = 'http://ec2-18-220-45-239.us-east-2.compute.amazonaws.com:8000/read/'
        const d = String(id.split('/'))
        const name = d
        const p = window.location.pathname.split('/')
        var path = ''
        if ( String(p[1]) === name ){
            path = "database"
        } else {
            path = p[1].replaceAll("/","-")
        }
        const namep = name + '/'
        const type = "/file"
        const url = u + namep + path + type
        await axios.get(url)
            .then(res => {if (res.data[0].body !== '') {const r = JSON.stringify(res.data[0].body, null, "\t").replace('"{', '{').replace('}"', '}').replaceAll('\\"','"').replaceAll('\\n','').replace('"[', '[').replace(']"', ']'); setEditorinfo(r);setFileinfo(r);setViewerinfo(r);console.log("fileinfo: " + fileinfo)}})
            .catch(function (error) {
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
    }, [theme, fileinfo, id])

    const editfile = useCallback( async (json) => {
        const base = 'http://ec2-18-220-45-239.us-east-2.compute.amazonaws.com:8000/editFile/'
        const d = String(id.split('/'))
        const name = d
        const p = window.location.pathname.split('/')
        var path = ''
        if ( String(p[1]) === name ){
            path = "database"
        } else {
            path = p[1].replaceAll("/","-")
        }
        const url = base + name +'/' + path
        axios.post(
            url,
            [
                {
                    body: json,
                },
            ],
            {
                headers: {
                    'content-type': 'text/plain',
                },
            }
        )
            .then(function (response) {
            console.log(response.data);})
            .catch(error=>WarningNotification(theme,error))
            .then(SuccessNotification(theme, name + " saved!"))
    }, [theme, id])

    useEffect(() => {
        fetchData()
      }, [fetchData]);

    function save(str){
        if (isJsonString(str) === true){
            editfile(document.getElementById('texta').value)
            setViewerinfo(editorinfo)
        } else {
            WarningNotification(theme, "Invalid JSON Format!");
        }
    }
    function operatorChange(key, value){
        if (operator === 1) {
            return key === document.getElementById('KeyI').value && value > document.getElementById('ValueI').value;
        } else if (operator === 2) {
            return key === document.getElementById('KeyI').value && value >= document.getElementById('ValueI').value;
        } else if (operator === 3) {
            return key === document.getElementById('KeyI').value && value === document.getElementById('ValueI').value;
        } else if (operator === 4) {
            return key === document.getElementById('KeyI').value && value <= document.getElementById('ValueI').value;
        } else if (operator === 5) {
            return key === document.getElementById('KeyI').value && value < document.getElementById('ValueI').value;
        }
    }
    return (
        <>
            { edit === true ?
                <>
                <div className='grid'>
                    <div className='flex justify-between mb-1 items-center'>
                        <h2 className='text-xl font-bold text-stone-700 dark:text-white ml-2'>Editor</h2>
                        <div className='flex space-x-2 items-center'>
                        <motion.button type="button" onClick={() => setEditorinfo(JSON.stringify(JSON.parse(document.getElementById('texta').value), null, 2))} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><BsBraces/></motion.button>                       
                        <motion.button type="button" onClick={() => save(document.getElementById('texta').value)} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><AiOutlineSave/></motion.button>
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    <div className='lg:flex lg:space-y-0 lg:space-x-5 lg:justify-center'>
                    <div className='grid w-full'>
                        <textarea id='texta' value={editorinfo} onChange={(e) => setEditorinfo(e.target.value)} className='w-full border-2 border-darkPurple rounded bg-transparent p-5 h-144 md:h-160 text-stone-900 dark:text-white'></textarea>
                        </div>
                    </div>
                </div>
                <div className='fixed bottom-0 space-x-1 flex mb-5'>
                    <motion.button type="button" onClick={() => setEdit(false)} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><AiOutlineTable/></motion.button>
                </div>
                </>
            : 
            <div className=''>  
                <div className='grid'>
                    <div className='flex justify-between mb-1 items-center'>
                        <h2 className='text-xl font-bold text-stone-700 dark:text-white ml-2'>Table</h2>
                        <div className='flex space-x-2 items-center'> 
                        {
                            sorting ?
                            <></>
                            :
                            <>
                            {
                            searching ?
                            <>
                            {
                                stringState ?
                                <>
                                <input placeholder='Key' id='Key' className='bg-darkPurple w-12 sm:w-32 rounded p-2 text-white'></input>
                                <input placeholder='Value' id='Value' className='bg-darkPurple w-32 rounded p-2 text-white'></input>
                                <motion.button type="button" onClick={() => setViewerinfo(JSON.stringify(searchJson(JSON.parse(viewerinfo), function(key, value) { return key === document.getElementById('Key').value && value === document.getElementById('Value').value;}), null, "\t"))} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><AiOutlineSearch/></motion.button>
                                </>
                                :
                                <>
                                {
                                    intState ? 
                                    <></>
                                    :
                                    <motion.button type="button" onClick={() => {setStringState(true); SetIntState(false);}} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-2 text-white'>ABC</motion.button>
                                }
                                </>
                            }
                            {
                                    intState ?
                                    <>
                                    <input placeholder='Key' id='KeyI' className='bg-darkPurple w-12 sm:w-32 rounded p-2 text-white'></input>
                                    {
                                        operator === 1 ? 
                                        <motion.button type="button" onClick={() => {setOperator(1);}} whileHover={{scale:1.1}} className='bg-medBlue rounded p-2 text-white'>{'>'}</motion.button>
                                        :
                                        <motion.button type="button" onClick={() => {setOperator(1);}} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-2 text-white'>{'>'}</motion.button>
                                    }
                                    {
                                        operator === 2 ? 
                                        <motion.button type="button" onClick={() => {setOperator(2);}} whileHover={{scale:1.1}} className='bg-medBlue rounded p-2 text-white'>{'>='}</motion.button>
                                        :
                                        <motion.button type="button" onClick={() => {setOperator(2);}} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-2 text-white'>{'>='}</motion.button>
                                    }
                                    {
                                        operator === 3 ?
                                        <motion.button type="button" onClick={() => {setOperator(3);}} whileHover={{scale:1.1}} className='bg-medBlue rounded p-2 text-white'>{'=='}</motion.button> 
                                        :
                                        <motion.button type="button" onClick={() => {setOperator(3);}} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-2 text-white'>{'=='}</motion.button>
                                    }
                                    {
                                        operator === 4 ? 
                                        <motion.button type="button" onClick={() => {setOperator(4);}} whileHover={{scale:1.1}} className='bg-medBlue rounded p-2 text-white'>{'<='}</motion.button>
                                        :
                                        <motion.button type="button" onClick={() => {setOperator(4);}} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-2 text-white'>{'<='}</motion.button>
                                    }
                                    {
                                        operator === 5 ? 
                                        <motion.button type="button" onClick={() => {setOperator(5);}} whileHover={{scale:1.1}} className='bg-medBlue rounded p-2 text-white'>{'<'}</motion.button>
                                        :
                                        <motion.button type="button" onClick={() => {setOperator(5);}} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-2 text-white'>{'<'}</motion.button>
                                    }                                    
                                    <input placeholder='Value' id='ValueI' className='bg-darkPurple w-16 sm:w-32 rounded p-2 text-white'></input>
                                    <motion.button type="button" 
                                    onClick={() => setViewerinfo(JSON.stringify(searchJson(JSON.parse(viewerinfo), function(key, value) { return operatorChange(key, value);}), null, "\t"))} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><AiOutlineSearch/></motion.button>
                                    </>
                                    :
                                    <>
                                    {
                                    stringState ? 
                                    <></>
                                    :
                                    <motion.button type="button" onClick={() => {setStringState(false); SetIntState(true);}} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><AiOutlineNumber/></motion.button>
                                    }
                                    </>
                            }
                            <motion.button type="button" onClick={() => {setSearching(false); setStringState(false); SetIntState(false);}} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white '><IoMdClose/></motion.button>
                            </>   
                            :
                            <>
                            <motion.button type="button" onClick={() =>{ if (isJsonString(viewerinfo)){setSearching(true)}}} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><AiOutlineSearch/></motion.button>
                            </>
                        }
                            </>
                        }
                        {
                            searching ? 
                            <></>
                            :
                            <>
                            {
                            sorting ?
                            <>
                                <input placeholder='Key' id='sortKey' className='bg-darkPurple w-32 rounded p-2 text-white'></input>
                                <motion.button type="button" whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><AiOutlineSortAscending/></motion.button>
                                <motion.button type="button" whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><AiOutlineSortDescending/></motion.button>
                                <motion.button type="button" onClick={() => {setSorting(false);}} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><IoMdClose/></motion.button>
                            </>
                            :
                            <>
                            <motion.button type="button" onClick={() =>{ if (isJsonString(viewerinfo)){setSorting(true)}}} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><BsFilter/></motion.button>
                            </>
                        } 
                            </>
                        }
                        {
                            searching === false && sorting === false ?
                            <>
                            <motion.button type="button" onClick={() => {setViewerinfo(editorinfo)}} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><AiOutlineReload/></motion.button>
                            </>
                            :
                            <>
                            </>
                        }                     
                        </div>
                    </div>
                </div>
                <div ref={ref} className='mt-5 scroll-py-0 overflow-auto h-144 md:h-160'>
                        { isJsonString(viewerinfo) === true ?
                            <>
                            <div className='w-full'>
                                <JsonToTable json={JSON.parse(viewerinfo)} />
                            </div>
                            </>
                            :
                            <div className='w-full'>
                            {   fileinfo === '' ?
                            <div className='p-3'>Current Document Empty</div>
                            :
                            <div className='p-3'>Invalid JSON Format</div>
                            }
                            </div>
                        }
                </div>
                { isJsonString(viewerinfo) === true && searching ?
                            <>
                            <div className='flex items-center justify-center'>
                                <h3>Count: {JSON.parse(viewerinfo).length}</h3>
                            </div>
                            </>
                            :
                            <></>
                }
                <div className='fixed bottom-0 space-x-1 flex mb-5'>
                    <motion.button type="button" onClick={() => setEdit(true)} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><AiOutlineEdit/></motion.button>
                </div>
            </div>
            }
        </>
    )
}

export default Document
