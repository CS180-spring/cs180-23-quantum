import Layout from './components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
                    <Route path='/' element={<Database />} />
                    <Route path='/:id' element={<Collection />} />
                    <Route path='/json' element={<TablePage />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App
