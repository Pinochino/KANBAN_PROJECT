import { Layout } from 'antd'
import SiderComponent from '@/components/SiderComponent';
import HomeScreen from '@/screens/HomeScreen'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InventoryScreen from '@/screens/InventoryScreen';
import { ManagerStore, OrderScreen, ReportScreen, SupplierScreen } from '@/screens';
import { HeaderComponent } from '@/components';

const { Content, Footer, Header } = Layout;

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Layout>
                <SiderComponent />
                <Layout>
                    <HeaderComponent />
                    <Content>
                        <Routes>
                            <Route path='/' element={<HomeScreen />} />
                            <Route path='/inventory' element={<InventoryScreen />} />
                            <Route path='/report' element={<ReportScreen />} />
                            <Route path='/suppliers' element={<SupplierScreen />} />
                            <Route path='/orders' element={<OrderScreen />} />
                            <Route path='/manage-store' element={<ManagerStore />} />
                        </Routes>
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        </BrowserRouter>
    )
}

export default MainRouter;