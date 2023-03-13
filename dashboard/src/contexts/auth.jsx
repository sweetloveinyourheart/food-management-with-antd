import React, { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { getUser, login } from "../utils/auth-api";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    const signIn = async (username, password) => {
        const { access_token } = await login(username, password)

        setLoading(false)
        if(!access_token) return setUser(null)

        Cookies.set('access_token', access_token)
        await getUserByAccessToken()
    }

    const signOut = async () => {
        Cookies.remove("access_token")
        setUser(null)
        navigate("/login")
    }

    const getUserByAccessToken = async () => {
        const access_token = Cookies.get('access_token')
        const user = await getUser(access_token)

        setLoading(false)
        if(!user)  {
            navigate("/login")
            return setUser(null)
        }
        navigate("/")
        return setUser(user)
    }

    useEffect(() => {
        (async () => {
            await getUserByAccessToken()
        })()
    }, [])

    useEffect(() => {
        if(!user) {
            navigate('/login')
        } else {
            navigate('/')
        }
    }, [user])
    
    if(loading) return <Loading />

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}