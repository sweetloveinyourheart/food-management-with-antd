import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography

function MainHeader() {
    return (
        <Header className="header">
            <Title level={3} style={{ color: "#fff", margin: '16px 0' }}>DASHBOARD</Title>
        </Header>
    );
}

export default MainHeader;