import { colors } from '@/constants/colors';
import { SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, Layout, Space } from 'antd';
import React from 'react';
import { IoNotifications } from 'react-icons/io5';


const HeaderComponent: React.FC = () => {
    return (
        <div
            className='bg-white row p-2 container'
        >
            <div className="col">
                <Input placeholder='Search...'
                    prefix={<SearchOutlined className='text-muted' size={20} />}
                    style={{
                        borderRadius: 100,
                        width: '50%'
                    }}
                    size='large'
                />
            </div>
            <div className="col d-flex flex-column-reverse align-items-end">
                <Space>
                    <Button type='text' icon={<IoNotifications size={20} />}></Button>
                    <Avatar src='https://avatars.githubusercontent.com/u/139600392?v=4'
                        size={40}
                    />
                </Space>
            </div>
        </div >
    )
}

export default HeaderComponent;