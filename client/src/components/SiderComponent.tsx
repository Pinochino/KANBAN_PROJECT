import { Layout, Menu, MenuProps, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineInventory2 } from 'react-icons/md';
import { HiChartBar, HiOutlineDocumentReport } from 'react-icons/hi';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoNewspaperOutline } from 'react-icons/io5';
import { FiBox } from 'react-icons/fi';
import { AppInfor } from '@/constants/AppInfos';
const { Sider } = Layout;
const { Text } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

const SiderComponent: React.FC = () => {
    const items: MenuItem[] = [
        {
            key: 'dashboard',
            label: <Link to={'/'}>Dashboard</Link>,
            icon: <AiOutlineHome size={20} />,
        },
        {
            key: 'inventory',
            label: <Link to={'/inventory'}>Inventory</Link>,
            icon: <MdOutlineInventory2 size={20} />,
        },
        {
            key: 'report',
            label: <Link to={'/report'}>Report</Link>,
            icon: <HiChartBar size={20} />,
        },
        {
            key: 'suppliers',
            label: <Link to={'/suppliers'}>Suppliers</Link>,
            icon: <FaRegUserCircle size={20} />,
        },
        {
            key: 'orders',
            label: <Link to={'/orders'}>Orders</Link>,
            icon: <FiBox size={20} />,
        },
        {
            key: 'Manage Store',
            label: <Link to={'/manage-store'}>Manage Store</Link>,
            icon: <IoNewspaperOutline size={20} />,
        },
    ];

    return (
        <Sider theme="light" style={{ height: '100vh' }}>
            <div className="mt-2 mb-2 d-flex justify-content-center align-items-center">
                <img src={AppInfor.logo} alt='logo' className='logo' style={{
                    marginRight: '0.3rem'
                }} />
                <Text style={
                    {
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        color: 'rgb(19, 102, 217)'
                    }
                }>{AppInfor.title}</Text>
            </div>
            <Menu items={items} theme="light" />
        </Sider>
    );
};

export default SiderComponent;
