import { removeAuth } from '@/redux/reducers/authReducer';
import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'

const HomeScreen = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(removeAuth({}));
    }
    return (
        <div>
            <Button onClick={handleLogout}>Log out</Button>
        </div>
    )
}

export default HomeScreen