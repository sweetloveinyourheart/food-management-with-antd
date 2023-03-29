import React, { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { getUser, login, refreshToken } from "../utils/auth-api";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";
import axios from "axios";

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    const signIn = async (username, password) => {
        const { access_token, refresh_token } = await login(username, password)

        setLoading(false)
        if (!access_token && !refresh_token) return setUser(null)

        axios.defaults.headers.common.Authorization = `Bearer ${access_token}`
        setAccessToken(access_token)
        Cookies.set('refresh_token', refresh_token)
    }

    const signOut = async () => {
        Cookies.remove("refresh_token")
        setAccessToken(null)
        setUser(null)
        navigate("/login")
    }

    const getUserByAccessToken = async () => {
        const user = await getUser()

        if (!user) {
            navigate("/login")
            setLoading(false)
            return setUser(null)
        }
        navigate("/")
        setLoading(false)
        return setUser(user)
    }

    const refreshNewToken = async () => {
        const rfToken = Cookies.get("refresh_token")
        const { access_token } = await refreshToken(rfToken)
        axios.defaults.headers.common.Authorization = `Bearer ${access_token}`
        setAccessToken(access_token)
    }

    useEffect(() => {
        (async () => {
            await refreshNewToken()
            const refreshAfter15Min = setInterval(refreshNewToken, 15 * 60 * 1000)
            return () => clearInterval(refreshAfter15Min)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            await getUserByAccessToken()
            setLoading(false)
        })()
    }, [accessToken])

    if (loading) return <Loading />

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