import handleAPI from '@/apis/handleApi';
import { authSelector, refreshToken, removeAuth } from '@/redux/reducers/authReducer';
import { Button } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const HomeScreen = () => {

    const dispatch = useDispatch();
    const auth = useSelector(authSelector);


    const handleLogout = () => {
        dispatch(removeAuth({}));
    }

    const getProducts = async () => {
        const api = `/storage/products`;
        try {
            const res = await handleAPI(api);
            console.log(res);
        } catch (error: any) {
            if (error.error === "jwt expired") {
                await handleRefreshToken();
            }
        }
    }

    const handleRefreshToken = async () => {
        try {
            const api = `/auth/refresh-token?id=${auth._id}`;
            const res = await handleAPI(api);
            // console.log(res);
            dispatch(refreshToken(res.data.token))
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Button onClick={getProducts}>Log out</Button>
        </div>
    )
}

export default HomeScreen