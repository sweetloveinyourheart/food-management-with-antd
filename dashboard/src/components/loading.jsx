import { Layout, Spin } from "antd";

function Loading() {
    return (
        <Layout style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spin />
        </Layout>
    );
}

export default Loading;