import {
    UserOutlined,
    LaptopOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React from 'react';
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

function MainSidebar() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();

    const onSelectItem = ({ item, key, keyPath, selectedKeys, domEvent }) => {
        // keyPath is an array with string value
        const path = keyPath.reverse().join("/")
        navigate(path)
    }

    return (
        <Sider
            width={200}
            style={{
                background: colorBgContainer,
            }}
        >
            <Menu
                mode="inline"
                onSelect={onSelectItem}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{
                    height: '100%',
                    borderRight: 0,
                }}
                items={[
                    {
                        label: 'All products',
                        icon: <UserOutlined />,
                        key: `all-product`,
                    },
                    {
                        label: 'Manage',
                        icon: <LaptopOutlined />,
                        key: `manager`,
                        children: [
                            {
                                label: 'Create',
                                key: 'create'
                            },
                            {
                                label: 'Modify',
                                key: 'modify'
                            },
                            {
                                label: 'Remove',
                                key: 'remove'
                            }
                        ],
                    }
                ]}
            />
        </Sider>
    );
}

export default MainSidebar;