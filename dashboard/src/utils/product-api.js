const fetchProducts = async () => {
    try {
        const res = await fetch("http://localhost:9000/foods")
        const jsonData = await res.json()

        return jsonData
    } catch (error) {
        return []
    }
}

const createNewProduct = async (product) => {
    try {
        const res = await fetch("http://localhost:9000/foods", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })

        const data = await res.json()
        if (data?.error) throw new Error()

        return true
    } catch (error) {
        return false
    }
}

const searchProductById = async (id) => {
    try {
        const res = await fetch(`http://localhost:9000/foods/${id}`)
        const data = await res.json()
        if (data?.error) throw new Error()
        
        return data
    } catch (error) {
        return null
    }
}

const updateProduct = async (id, product) => {
    try {
        const res = await fetch(`http://localhost:9000/foods/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })

        const data = await res.json()
        if (data?.error) throw new Error()

        return true
    } catch (error) {
        return false
    }
}


const removeProduct = async (id) => {
    try {
        const res = await fetch(`http://localhost:9000/foods/${id}`, { method: 'DELETE' })

        const data = await res.json()
        if (data?.error) throw new Error()

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