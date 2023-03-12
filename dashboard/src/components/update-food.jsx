import {
    Alert,
    Button,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    theme,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react';
import { formItemLayout, formItemLayoutWithOutLabel, categories } from './create-food';
import SearchForm from './search-form';
import { searchProductById, updateProduct } from '../utils/product-api';
import { useSearchParams } from "react-router-dom"

const { Option } = Select;

function UpdateFood() {
    const { token: { colorBgContainer } } = theme.useToken();
    const [form] = Form.useForm();

    const [product, setProduct] = useState(null)
    const [message, setMessage] = useState(null)

    const [searchParams] = useSearchParams()

    useEffect(() => {
        const productId = searchParams.get("productId")
        onSearch(productId)
    }, [])

    const onFinish = async (values) => {
        const isSuccess = await updateProduct(product._id, values)

        if (isSuccess) {
            setMessage({ success: true, text: 'Update product successfully !' })
            form.resetFields()
            setProduct(null)
        } else {
            setMessage({ success: false, text: 'Update product failed !' })
        }
    };

    const onMessageClose = () => {
        setMessage(null)
    }

    const onSearch = async (value) => {
        if (value.length === 0) return;

        const product = await searchProductById(value)
        if (!product) return setMessage({ success: false, text: "Cannot find any product with id " + value })

        setProduct(product)
        form.setFieldsValue(product)
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
            <Title level={4} style={{ margin: '0 0 24px 0' }}>UPDATE PRODUCT INFORMATION</Title>

            {!product
                ? <SearchForm onSearch={onSearch} />
                : (
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="update_food"
                        onFinish={onFinish}
                        initialValues={{ price: 0, weight: 0 }}
                        style={{ maxWidth: 500 }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="name"
                            label="Product Name"
                            rules={[
                                {

                                    message: 'This field cannot be empty !',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ message: 'This field cannot be empty !' }]}
                        >
                            <Input.TextArea showCount maxLength={3000} />
                        </Form.Item>

                        <Form.Item
                            name="category"
                            label="Category"
                            rules={[{ message: 'Please select one category!' }]}
                        >
                            <Select placeholder="Select product's category">
                                {categories.map((category, index) => (
                                    <Option key={`cate_opt_${index}`} value={category}>{category}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="country"
                            label="Country"
                            tooltip="Where did this product come from?"
                        >
                            <Input />
                        </Form.Item>

                        <Row gutter={6}>
                            <Col span={6}>
                                <Form.Item name={"price"} label="Price" rules={[{ type: 'number', min: 0 }]}>
                                    <InputNumber />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name={"weight"} label="Weight" rules={[{ type: 'number', min: 0 }]}>
                                    <InputNumber />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.List name="ingredients" rules={[
                            {
                                validator: async (_, ingredients) => {
                                    if (!ingredients || ingredients.length < 1) {
                                        return Promise.reject(new Error('At least 1 ingredient'));
                                    }
                                },
                            },
                        ]}>
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            label={index === 0 ? 'Ingredients' : ''}
                                            required={true}
                                            key={field.key}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                                noStyle
                                            >
                                                <Input
                                                    placeholder="ingredient name"
                                                    style={{
                                                        width: '60%',
                                                    }}
                                                />
                                            </Form.Item>
                                            {fields.length > 1 ? (
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => remove(field.name)}
                                                />
                                            ) : null}
                                        </Form.Item>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            style={{
                                                width: '60%',
                                            }}
                                            icon={<PlusOutlined />}
                                        >
                                            Add new ingredient
                                        </Button>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                        <Form.Item
                            label="Nutrition"
                            style={{
                                marginBottom: 0,
                            }}
                        >
                            <Form.Item
                                name={['nutrition', 'calories']}
                                rules={[
                                    {

                                        type: 'number',
                                        min: 0
                                    },
                                ]}
                                style={{
                                    display: 'inline-block',
                                    marginRight: 8
                                }}
                            >
                                <InputNumber placeholder="Calories" />
                            </Form.Item>
                            <Form.Item
                                name={['nutrition', 'fat']}
                                rules={[
                                    {

                                        type: 'number',
                                        min: 0
                                    },
                                ]}
                                style={{
                                    display: 'inline-block',
                                    marginRight: 8
                                }}
                            >
                                <InputNumber placeholder="Fat" />
                            </Form.Item>
                            <Form.Item
                                name={['nutrition', 'protein']}
                                rules={[
                                    {

                                        type: 'number',
                                        min: 0
                                    },
                                ]}
                                style={{
                                    display: 'inline-block',
                                    marginRight: 8
                                }}
                            >
                                <InputNumber placeholder="Protein" />
                            </Form.Item>
                            <Form.Item
                                name={['nutrition', 'carbohydrates']}
                                rules={[
                                    {

                                        type: 'number',
                                        min: 0
                                    },
                                ]}
                                style={{
                                    display: 'inline-block',
                                    marginRight: 8
                                }}
                            >
                                <InputNumber placeholder="Carbohydrates" />
                            </Form.Item>
                            <Form.Item
                                name={['nutrition', 'fiber']}
                                rules={[
                                    {

                                        type: 'number',
                                        min: 0
                                    },
                                ]}
                                style={{
                                    display: 'inline-block',
                                    marginRight: 8
                                }}
                            >
                                <InputNumber placeholder="Fiber" />
                            </Form.Item>
                            <Form.Item
                                name={['nutrition', 'sugar']}
                                rules={[
                                    {

                                        type: 'number',
                                        min: 0
                                    },
                                ]}
                                style={{
                                    display: 'inline-block',
                                    marginRight: 8
                                }}
                            >
                                <InputNumber placeholder="sugar" />
                            </Form.Item>
                            <Form.Item
                                name={['nutrition', 'sodium']}
                                rules={[
                                    {

                                        type: 'number',
                                        min: 0
                                    },
                                ]}
                                style={{
                                    display: 'inline-block',
                                    marginRight: 8
                                }}
                            >
                                <InputNumber placeholder="Sodium" />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item
                            name="image"
                            label="Product Image URL"
                            rules={[
                                {

                                    message: 'This field cannot be empty !',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                )
            }

            {message
                ? <Alert
                    message={message.text}
                    type={message.success ? "success" : "error"}
                    showIcon
                    closable
                    afterClose={onMessageClose}
                />
                : null
            }
        </Content>
    );
};

export default UpdateFood;