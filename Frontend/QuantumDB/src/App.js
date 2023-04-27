import Layout from './components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Database from './pages/Database'
import Profile from './pages/Profile'
import Login from './pages/Login'
import TablePage from './pages/TablePage'
import Collection from './pages/Collection'

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/database' element={<Database />} />
                    <Route path='/database/:id' element={<Collection />} />
                    <Route path='/database/json' element={<TablePage />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App
