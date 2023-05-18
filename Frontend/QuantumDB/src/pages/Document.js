import React, {useContext, useRef, useState, useEffect} from 'react'
import { JsonToTable } from "react-json-to-table";
import 'draft-js/dist/Draft.css';
import { ThemeContext } from '../components/ThemeContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { AiOutlineEdit, AiOutlineSave, AiOutlineTable, AiOutlineSearch, AiOutlineReload, AiOutlineNumber } from 'react-icons/ai';
import { IoMdAdd, IoMdClose } from "react-icons/io"
import 'react-toastify/dist/ReactToastify.css';
import '../styles/table.css'


const SuccessNotification = (theme) => toast.success('Saved', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
});

const WarningNotification = (theme,err) => toast.warn(err, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
});
  
const myJson = {
    "Student": [{ name: "Jack", email: "jack@xyz.com" }],
    "Sponsors": [
      { name: "john", email: "john@xyz.com", age: 18, gender: "M" },
      { name: "Jack", email: "jack@xyz.com", age: 23, gender: "M" },
      { name: "Jill", email: "jill@xyz.com", age: 8, gender: "F" },
      { name: "Zoe", email: "zoe@xyz.com", age: 49, gender: "F" },
      { name: "Zoe", email: "z@xyz.com", age: 38, gender: "F" },
      { name: "Jack", email: "JACK@xyz.com", age: 12, gender: "M" }
    ]
};

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
    for(let p in obj) { // iterate on every property
        // tip: here is a good idea to check for hasOwnProperty
        if (typeof(obj[p]) == 'object') { // if its object - lets search inside it
            result = result.concat(searchJson(obj[p], predicate));
        } else if (predicate(p, obj[p])) 
            result.push(
               obj
            ); // check condition
    }
    return result;
}

function sortJsonArrayByProperty(objArray, prop, direction){
    if (arguments.length<2) throw new Error("sortJsonArrayByProp requires 2 arguments");
    var direct = arguments.length>2 ? arguments[2] : 1; //Default to ascending

    if (objArray && objArray.constructor===Array){
        var propPath = (prop.constructor===Array) ? prop : prop.split(".");
        objArray.sort(function(a,b){
            for (var p in propPath){
                if (a[propPath[p]] && b[propPath[p]]){
                    a = a[propPath[p]];
                    b = b[propPath[p]];
                }
            }
            // convert numeric strings to integers
            a = a.match(/^\d+$/) ? +a : a;
            b = b.match(/^\d+$/) ? +b : b;
            return ( (a < b) ? -1*direct : ((a > b) ? 1*direct : 0) );
        });
    }
}
// sortJsonArrayByProperty(results, 'attributes.OBJECTID');
// sortJsonArrayByProperty(results, 'attributes.OBJECTID', -1);

const Document = () => {
    const ref = React.useRef(null);
    const [edit, setEdit] = React.useState(false)
    const {theme} = useContext(ThemeContext)
    const [fileinfo, setFileinfo] = React.useState(JSON.stringify(myJson, null, "\t"))
    const [editorinfo, setEditorinfo] = React.useState(JSON.stringify(myJson, null, "\t"))
    const [viewerinfo, setViewerinfo] = React.useState(JSON.stringify(myJson, null, "\t"))

    const [isOverflowing, setIsOverflowing] = React.useState(false);
    const [stringState, setStringState] = React.useState(false);
    const [intState, SetIntState] = React.useState(false);
    const [searching, setSearching] = React.useState(false);
    const [operator, setOperator] = React.useState(3);

    React.useEffect(() => {
        const el = ref.current;
        if(el.offsetHeight < el.scrollHeight){
            setIsOverflowing(true);
        } else {
            setIsOverflowing(false);
        }
      }, []);

    function save(str){
        if (isJsonString(str) === true){
            setViewerinfo(document.getElementById('texta').value)
            SuccessNotification(theme);
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
            return key === document.getElementById('KeyI').value && value == document.getElementById('ValueI').value;
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
                            searching ?
                            <>
                            {
                                stringState ?
                                <>
                                <h3>Count: {JSON.parse(viewerinfo).length}</h3>
                                <input placeholder='Key' id='Key' className='bg-darkPurple w-32 rounded p-2 text-white'></input>
                                <input placeholder='Value' id='Value' className='bg-darkPurple w-32 rounded p-2 text-white'></input>
                                <motion.button type="button" onClick={() => setViewerinfo(JSON.stringify(searchJson(myJson, function(key, value) { return key === document.getElementById('Key').value && value === document.getElementById('Value').value;}), null, "\t"))} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><AiOutlineSearch/></motion.button>
                                <motion.button type="button" onClick={() => {setSearching(false); setStringState(false); SetIntState(false);}} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><IoMdClose/></motion.button>
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
                                    <h3>Count: {JSON.parse(viewerinfo).length}</h3>
                                    <input placeholder='Key' id='KeyI' className='bg-darkPurple w-32 rounded p-2 text-white'></input>
                                    {
                                        operator == 1 ? 
                                        <motion.button type="button" onClick={() => {setOperator(1);}} whileHover={{scale:1.1}} className='bg-medBlue rounded p-2 text-white'>{'>'}</motion.button>
                                        :
                                        <motion.button type="button" onClick={() => {setOperator(1);}} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-2 text-white'>{'>'}</motion.button>
                                    }
                                    {
                                        operator == 2 ? 
                                        <motion.button type="button" onClick={() => {setOperator(2);}} whileHover={{scale:1.1}} className='bg-medBlue rounded p-2 text-white'>{'>='}</motion.button>
                                        :
                                        <motion.button type="button" onClick={() => {setOperator(2);}} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-2 text-white'>{'>='}</motion.button>
                                    }
                                    {
                                        operator == 3 ?
                                        <motion.button type="button" onClick={() => {setOperator(3);}} whileHover={{scale:1.1}} className='bg-medBlue rounded p-2 text-white'>{'=='}</motion.button> 
                                        :
                                        <motion.button type="button" onClick={() => {setOperator(3);}} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-2 text-white'>{'=='}</motion.button>
                                    }
                                    {
                                        operator == 4 ? 
                                        <motion.button type="button" onClick={() => {setOperator(4);}} whileHover={{scale:1.1}} className='bg-medBlue rounded p-2 text-white'>{'<='}</motion.button>
                                        :
                                        <motion.button type="button" onClick={() => {setOperator(4);}} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-2 text-white'>{'<='}</motion.button>
                                    }
                                    {
                                        operator == 5 ? 
                                        <motion.button type="button" onClick={() => {setOperator(5);}} whileHover={{scale:1.1}} className='bg-medBlue rounded p-2 text-white'>{'<'}</motion.button>
                                        :
                                        <motion.button type="button" onClick={() => {setOperator(5);}} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-2 text-white'>{'<'}</motion.button>
                                    }                                    
                                    <input placeholder='Value' id='ValueI' className='bg-darkPurple w-32 rounded p-2 text-white'></input>
                                    <motion.button type="button" 
                                    onClick={() => setViewerinfo(JSON.stringify(searchJson(myJson, function(key, value) { return operatorChange(key, value);}), null, "\t"))} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><AiOutlineSearch/></motion.button>
                                    <motion.button type="button" onClick={() => {setSearching(false); setStringState(false); SetIntState(false);}} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><IoMdClose/></motion.button>
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
                            </>   
                            :
                            <>
                            <motion.button type="button" onClick={() => setSearching(true)} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><AiOutlineSearch/></motion.button>
                            </>
                        }                   
                            <motion.button type="button" onClick={() => {setViewerinfo(editorinfo)}} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><AiOutlineReload/></motion.button>
                        </div>
                    </div>
                </div>
                <div ref={ref} className='mt-5 scroll-py-0 overflow-auto h-144 md:h-160'>
                        { isJsonString(viewerinfo) === true ?
                            <div className='w-full'>
                                <JsonToTable json={JSON.parse(viewerinfo)} />
                                <div className='flex items-center justify-center'>
                                {/* {isOverflowing ? <motion.button className='text-stone-700 dark:text-stone-500'>Back to Top</motion.button> : null } */}
                                </div>
                            </div>
                            :
                            <div className='w-full'>
                            <div>Invalid JSON Format</div>
                            </div>
                        }
                </div>
                <div className='fixed bottom-0 space-x-1 flex mb-5'>
                    <motion.button type="button" onClick={() => setEdit(true)} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><AiOutlineEdit/></motion.button>
                </div>
            </div>
            }
        </>
    )
}

export default Document
