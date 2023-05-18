import Layout from './components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Database from './pages/Database'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Collection from './pages/Collection'
import Search from './pages/Search'
import Document from './pages/Document'

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path='/' element={<Database />} />
                    <Route path='/:id' element={<Collection />} />
                    <Route path='/:id/json' element={<Document />} />
                    <Route path='/:id/:id/json' element={<Document />} />
                    <Route path='/:id/:id/:id/json' element={<Document />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/search' element={<Search />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App
