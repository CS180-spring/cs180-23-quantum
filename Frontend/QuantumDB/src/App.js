import { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Database from './pages/Database'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Collection from './pages/Collection'
import Search from './pages/Search'
import Document from './pages/Document'
import Home from './pages/Home'
import CreateProfile from './pages/CreateProfile'
import Error from './pages/Error'
import {AuthContext} from './components/AuthContext'
import './index.css'

function App() {
    const {auth} = useContext(AuthContext)
    console.log(auth)
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path='/' element={auth === 'true' ? <Database /> : <Home />} />
                    <Route path='/:id' element={<Collection />} />
                    <Route path='/:id/json' element={<Document />} />
                    <Route path='/:id/:id/json' element={<Document />} />
                    <Route path='/:id/:id/:id/json' element={<Document />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/*' element={<Error/>} />
                    <Route path='/login' element={auth === 'true' ?  <Database /> : <Login />} />
                    <Route path='/create' element={ auth === 'true' ? <Database />: <CreateProfile />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App
