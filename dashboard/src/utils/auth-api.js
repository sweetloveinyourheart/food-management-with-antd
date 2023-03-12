import axios from 'axios'

async function login(username, password) {
    try {
        const { data, error } = await axios.post("http://localhost:9000/authentication/login", { username, password })

        if (!data || error) throw new Error()

        return {
            access_token: data.access_token
        }
    } catch (error) {
        return {
            access_token: null
        }
    }
}

async function getUser(access_token) {
    try {
        const { data, error } = await axios.get("http://localhost:9000/authentication/user", { 
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
         })
        if (!data || error) throw new Error()

        return data
    } catch (error) {
        return null
    }
}

export {
    login,
    getUser
}