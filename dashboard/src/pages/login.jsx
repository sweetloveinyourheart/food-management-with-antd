import {Card, Layout } from "antd";
import LoginForm from "../components/login-form";

function LoginPage() {
    return (
        <Layout style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card style={{ maxWidth: 600, minWidth: 350 }} title="Login to Food Management">
                <LoginForm />
            </Card>
        </Layout>
    );
}

export default LoginPage;