import axios from 'axios'

const fetchProducts = async () => {
    try {
        const { data, error } = await axios.get("http://localhost:9000/foods")
        if (!data || error) {
            throw new Error()
        }

        return data
    } catch (error) {
        return []
    }
}

const createNewProduct = async (product) => {
    try {
        const { data, error } = await axios.post("http://localhost:9000/foods", product)

        if (!data || error) throw new Error()

        return true
    } catch (error) {
        return false
    }
}

const searchProductById = async (id) => {
    try {
        const { data, error } = await axios.get(`http://localhost:9000/foods/${id}`)

        if (!data || error) throw new Error()

        return data
    } catch (error) {
        return null
    }
}

const updateProduct = async (id, product) => {
    try {
        const { data, error } = await axios.patch(`http://localhost:9000/foods/${id}`, product)

        if (!data || error) throw new Error()

        return true
    } catch (error) {
        return false
    }
}


const removeProduct = async (id) => {
    try {
        const { data, error } = await axios.delete(`http://localhost:9000/foods/${id}`, { method: 'DELETE' })

        if (!data || error) throw new Error()

        return true
    } catch (error) {
        return false
    }
}

export {
    createNewProduct,
    searchProductById,
    updateProduct,
    fetchProducts,
    removeProduct
}