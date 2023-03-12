import {
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
import React from 'react';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
    },
    layout: 'vertical'
};

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 24,
            offset: 0,
        },
    },
};

const categories = ["meat", "fish", "fruit", "vegetable", "bakery", "dairy", "snacks", "beverage"]

function CreateFood() {
    const { token: { colorBgContainer } } = theme.useToken();
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Content
            style={{
                padding: 24,
                margin: 0,
                minHeight: 'calc(100vh - 142px)',
                background: colorBgContainer,
            }}
        >
            <Title level={4} style={{ margin: '0 0 24px 0' }}>CREATE NEW PRODUCT</Title>
            <Form
                {...formItemLayout}
                form={form}
                name="create-food"
                onFinish={onFinish}
                initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
                style={{ maxWidth: 500 }}
                scrollToFirstError
            >
                <Form.Item
                    name="name"
                    label="Product Name"
                    rules={[
                        {
                            required: true,
                            message: 'This field cannot be empty !',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'This field cannot be empty !' }]}
                >
                    <Input.TextArea showCount maxLength={300} />
                </Form.Item>

                <Form.Item
                    name="category"
                    label="Category"
                    rules={[{ required: true, message: 'Please select one category!' }]}
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
                        <Form.Item name={"price"} label="Price" rules={[{ type: 'number', min: 0, required: true }]}>
                            <InputNumber />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name={"weight"} label="Weight" rules={[{ type: 'number', min: 0, required: true }]}>
                            <InputNumber />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.List name="ingredients">
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

                <Form.List name="allergens">
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'Allergens' : ''}
                                    required={true}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        noStyle
                                    >
                                        <Input
                                            placeholder="Allergen name"
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
                                    Add allergen
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Form.Item
                    label="Nutrition"
                    required
                    style={{
                        marginBottom: 0,
                    }}
                >
                    <Form.Item
                        name={['nutrition', 'calories']}
                        rules={[
                            {
                                required: true,
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
                                required: true,
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
                                required: true,
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
                                required: true,
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
                                required: true,
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
                                required: true,
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
                                required: true,
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
                            required: true,
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
        </Content>
    );
};

export default CreateFood;