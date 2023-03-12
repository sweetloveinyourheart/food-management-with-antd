import { Alert, Button, Image, Modal, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { removeProduct, searchProductById } from "../utils/product-api";
import SearchForm from "./search-form";
import { useSearchParams } from "react-router-dom"
import Paragraph from "antd/es/typography/Paragraph";


function RemoveFood() {
    const { token: { colorBgContainer } } = theme.useToken();

    const [product, setProduct] = useState(null)
    const [message, setMessage] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchParams] = useSearchParams()

    useEffect(() => {
        const productId = searchParams.get("productId")
        onSearch(productId)
    }, [])

    const onMessageClose = () => {
        setMessage(null)
    }

    const onSearch = async (value) => {
        if (value.length === 0) return;

        const product = await searchProductById(value)
        if (!product) return setMessage({ success: false, text: "Cannot find any product with id " + value })

        setProduct(product)
    }

    const handleOk = async () => {
        setIsModalOpen(false);

        const isSuccess = await removeProduct(product._id)
        if (isSuccess) {
            setMessage({ success: true, text: 'Remove product successfully !' })
            setProduct(null)
        } else {
            setMessage({ success: false, text: 'Remove product failed !' })
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onDeleteProduct = () => {
        setIsModalOpen(true);
    }

    return (
        <Content
            style={{
                padding: 24,
                margin: 0,
                minHeight: 'calc(100vh - 142px)',
                background: colorBgContainer,
            }}
        >
            <Title level={4} style={{ margin: '0 0 24px 0' }}>REMOVE PRODUCT</Title>

            {!product
                ? <SearchForm onSearch={onSearch} />
                : (
                    <>
                        <Image
                            width={300}
                            src={product.image}
                        />
                        <Title level={4}>{product.name}</Title>
                        <Paragraph>
                            {product.description}
                        </Paragraph>
                        <Button type="primary" danger onClick={onDeleteProduct}>
                            Delete
                        </Button>
                    </>
                )
            }

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>This action will delete product forever</p>
            </Modal>

            {message
                ? <Alert
                    message={message.text}
                    type={message.success ? "success" : "error"}
                    showIcon
                    closable
                    afterClose={onMessageClose}
                    style={{
                        margin: '12px 0'
                    }}
                />
                : null
            }
        </Content>
    );
}

export default RemoveFood;