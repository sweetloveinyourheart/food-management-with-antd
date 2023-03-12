import React, { createContext, useEffect, useMemo, useState } from "react";
import Cookies from 'js-cookie'
import { getUser, login } from "../utils/auth-api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    const navigate = useNavigate();

    const signIn = async (username, password) => {
        const { access_token } = await login(username, password)
        if(!access_token) return setUser(null)

        Cookies.set('access_token', access_token)
        await getUserByAccessToken()
    }

    const getUserByAccessToken = async () => {
        const access_token = Cookies.get('access_token')
        const user = await getUser(access_token)
        if(!user) return setUser(null)

        setUser(user)
    }

    useEffect(() => {
        (async () => {
            await getUserByAccessToken()
        })()
    }, [])

    useEffect(() => {
        if(!user) {
            navigate("/login")
        } else {
            navigate("/")
        }
    }, [user])

    const memoedValue = useMemo(() => ({
        user,
        signIn
    }), [user])

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    )
}