import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage } from '@/screens';


const AuthRouter = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-6 bg-warning d-flex justify-content-center align-items-center">
                    <img
                        className="brand"
                        src='https://cdn.pixabay.com/photo/2021/06/15/12/51/facebook-6338507_1280.png' alt='logo' />
                </div>
                <div className="col-6 bg-info d-flex justify-content-center align-items-center">
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<LoginPage />} />
                            <Route path='/register' element={<RegisterPage />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </div>
    )
}

export default AuthRouter