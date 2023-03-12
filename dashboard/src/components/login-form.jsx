import { Button, Card, Checkbox, Form, Input, Layout } from "antd";
import { useAuth } from '../hooks/auth.hook'

function LoginForm() {
    
    const { signIn } = useAuth()

    const onFinish = async (values) => {
        const { username, password } = values
        await signIn(username, password)
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
            >
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default LoginForm;