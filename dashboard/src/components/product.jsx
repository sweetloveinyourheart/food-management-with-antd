import { Card, Col, Typography } from "antd";

const { Meta } = Card;
const { Title } = Typography

function Product({ product }) {
    return (
        <Col span={6}>
            <div style={{ padding: '8px' }}>
                <Card
                    hoverable
                    style={{
                        width: '100%'
                    }}
                    cover={<img alt={product.name} src={product.image} />}
                >
                    <Meta title={product.name} description={product.country} />
                    <Title level={4} style={{ marginBottom: 0 }}>${product.price}</Title>
                </Card>
            </div>
        </Col>
    );
}

export default Product;