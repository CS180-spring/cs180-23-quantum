import React, { useEffect, useState } from 'react'

const getInitialAuth = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedPref = window.localStorage.getItem('auth')
        if (typeof storedPref === 'string') {
            return storedPref
        }
        return 'false'
    }
}
export const AuthContext = React.createContext()

export const AuthProvider = ({ initialAuth, children }) => {
    const [auth, setAuth] = useState(getInitialAuth)

    const rawSetAuth = (rawAuth) => {
        const root = window.document.documentElement
        const isAuthed = rawAuth === 'true'

        root.classList.remove(isAuthed ? 'false' : 'true')
        root.classList.add(rawAuth)
        localStorage.setItem('auth', rawAuth)
    }

    useEffect(() => {
        rawSetAuth(auth)
    }, [auth])

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}
