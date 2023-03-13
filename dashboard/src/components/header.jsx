import { Button, Layout, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuth } from "../hooks/auth.hook"

const { Header } = Layout;
const { Title } = Typography

function MainHeader() {

    const { signOut } = useAuth()

    return (
        <Header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={3} style={{ color: "#fff", margin: '16px 0' }}>DASHBOARD</Title>
            <Button type="primary" shape="circle" icon={<LogoutOutlined />}  onClick={() => signOut()}/>
        </Header>
    );
}

export default MainHeader;