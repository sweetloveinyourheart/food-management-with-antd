import { Button, Card, Col, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Title } = Typography

function Product({ product }) {
    const navigate = useNavigate()

    const onUpdateClick = () => {
        navigate(`/manager/modify?productId=${product._id}`)
    }

    const onRemoveClick = () => {
        navigate(`/manager/remove?productId=${product._id}`)
    }

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
                    <Title level={4} style={{}}>${product.price}</Title>
                    <Space>
                        <Button type="primary" onClick={onUpdateClick}>Update</Button>
                        <Button danger onClick={onRemoveClick}>Remove</Button>
                    </Space>
                </Card>
            </div>
        </Col>
    );
}

export default Product;