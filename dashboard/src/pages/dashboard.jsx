import { Breadcrumb, Layout } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import CreateFood from '../components/create-food';
import MainHeader from '../components/header';
import Products from '../components/products';
import MainSidebar from '../components/sidebar';

function Dashboard() {
    const params = useParams()

    const renderTabs = () => {
        switch (params["*"]) {
            case "manager/create":
                return <CreateFood />
        
            default:
                return <Products />
        }
      }

    return (
        <Layout>
            <MainHeader />
            <Layout>
                <MainSidebar />
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                        items={[
                            {
                                title: 'Home'
                            },
                            {
                                title: 'App'
                            }
                        ]}
                    />
                    {renderTabs()}
                </Layout>
            </Layout>
        </Layout>
    );
}

export default Dashboard;