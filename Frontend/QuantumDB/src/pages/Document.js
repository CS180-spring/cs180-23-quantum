import React, {useContext, useEffect, useCallback} from 'react'
import { JsonToTable } from "react-json-to-table";
import 'draft-js/dist/Draft.css';
import { ThemeContext } from '../components/ThemeContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { AiOutlineEdit, AiOutlineSave, AiOutlineTable, AiOutlineSearch, AiOutlineReload, AiOutlineNumber } from 'react-icons/ai';
import { IoMdClose } from "react-icons/io"
import { VscJson } from "react-icons/vsc";
import axios from 'axios';
import { useParams } from "react-router";
import Editor from '@monaco-editor/react';
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
    const [operator, setOperator] = React.useState(3);

    const fetchData = useCallback( async () => {
        const u = 'http://ec2-13-58-177-173.us-east-2.compute.amazonaws.com:8000/read/'
        const d = String(id.split('/'))
        const name = d
        console.log("name: " + d)
        const p = window.location.pathname.split('/')
        var path = ''
        if ( String(p[1]) === name ){
            path = "database"
        } else {
            path = p[1].replaceAll("/","-")
        }
        const namep = name + '/'
        console.log("path: " + path)
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
    }, [theme])

    const editfile = useCallback( async (json) => {
        const base = 'http://ec2-13-58-177-173.us-east-2.compute.amazonaws.com:8000/editFile/'
        const d = String(id.split('/'))
        const name = d
        console.log("name: " + d)
        const p = window.location.pathname.split('/')
        var path = ''
        if ( String(p[1]) === name ){
            path = "database"
        } else {
            path = p[1].replaceAll("/","-")
        }
        console.log("path: " + path)
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
            .then(SuccessNotification(theme, name))
    }, [theme])

    useEffect(() => {
        fetchData()
      }, []);


    function printTheJSONInPrettyFormat() {
        var badJSON = document.getElementById('texta').value;
        var parseJSON = JSON.parse(badJSON);
        var JSONInPrettyFormat = JSON.stringify(parseJSON, undefined, 4);
        document.getElementById('texta').value =
        JSONInPrettyFormat;
     }
    function save(str){
        if (isJsonString(str) === true){
            editfile(document.getElementById('texta').value)
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
                        <motion.button type="button" onClick={() => printTheJSONInPrettyFormat()} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><VscJson/></motion.button>                  
                        <motion.button type="button" onClick={() => save(document.getElementById('texta').value)} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><AiOutlineSave/></motion.button>
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    <div className='lg:flex lg:space-y-0 lg:space-x-5 lg:justify-center'>
                        <div className='grid w-full'>
                            <textarea id='texta' spellcheck='false' value={editorinfo} onChange={(e) => setEditorinfo(e.target.value)} className='w-full border-2 border-darkPurple rounded bg-darkPurple/30 dark:bg-darkPurple/50  p-5 h-144 md:h-160 text-stone-900 dark:text-white'></textarea>
                            {/* <Editor id='texta' className='h-144 md:h-160' language="json" value={editorinfo} onChange={(e) => setEditorinfo(e.target.value)} options={{ formatOnType: true, tabCompletion: true, autoIndent: true, automaticLayout: true }} /> */}
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
                                <motion.button type="button" onClick={() => setViewerinfo(JSON.stringify(searchJson(JSON.parse(viewerinfo), function(key, value) { return key === document.getElementById('Key').value && value === document.getElementById('Value').value;}), null, "\t"))} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><AiOutlineSearch/></motion.button>
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
                                    <input placeholder='Value' id='ValueI' className='bg-darkPurple w-32 rounded p-2 text-white'></input>
                                    <motion.button type="button" 
                                    onClick={() => setViewerinfo(JSON.stringify(searchJson(JSON.parse(viewerinfo), function(key, value) { return operatorChange(key, value);}), null, "\t"))} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><AiOutlineSearch/></motion.button>
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
                                </div>
                            </div>
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
                <div className='fixed bottom-0 space-x-1 flex mb-5'>
                    <motion.button type="button" onClick={() => setEdit(true)} whileHover={{scale:1.1}} className='bg-darkPurple rounded p-3 text-white'><AiOutlineEdit/></motion.button>
                </div>
            </div>
            }
        </>
    )
}

export default Document
