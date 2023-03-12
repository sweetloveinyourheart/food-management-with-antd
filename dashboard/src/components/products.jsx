import { Layout, Row, theme } from 'antd';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../utils/product-api';
import Product from './product';
const { Content } = Layout;

function Products() {
    const { token: { colorBgContainer } } = theme.useToken();
    const [products, setProducts] = useState([])

    useEffect(() => {
        (async () => {
            const data = await fetchProducts()
            setProducts(data)
        })()
    }, [])

    return (
        <Content
            style={{
                padding: 24,
                margin: 0,
                minHeight: 'calc(100vh - 142px)',
                background: colorBgContainer,
            }}
        >
            <Row>
                {products.map((product, index) => (
                    <Product product={product} key={`product_${index}`} />
                ))}
            </Row>
        </Content>
    );
}

export default Products;