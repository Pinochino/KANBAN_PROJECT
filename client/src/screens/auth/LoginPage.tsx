import React from 'react';

import Card from 'antd/es/card/Card';
import { Button, Checkbox, Form, Input, message, Space, Typography } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Link } from 'react-router-dom';
import SocialLogin from './components/SocialLogin';
import handleAPI from '@/apis/handleApi';
import { useDispatch } from 'react-redux';
import { addAuth } from '@/redux/reducers/authReducer';
import { localDataNames } from '@/constants/AppInfos';
import { auth } from '@/firebase/firebaseConfig';
const { Text, Title, Paragraph } = Typography;

interface FormProps {
    username?: string;
    email?: string;
    password?: string;
}

const LoginPage = () => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isRemember, setIsRemember] = React.useState<boolean>(false);

    const dispatch = useDispatch();

    const handleLogin = async (values: FormProps) => {
        setIsLoading(true);
        try {
            const res: any = await handleAPI('/auth/login', values, 'post');
            message.success(res.message);
            res.data && dispatch(addAuth(res.data));

            if (isRemember) {
                localStorage.setItem(localDataNames.authData, JSON.stringify(res.data));
            }
        } catch (error: any) {
            message.error(error.message);
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <Card>
                <div className="text-center">
                    <img
                        src="https://cdn.pixabay.com/photo/2021/06/15/12/51/facebook-6338507_1280.png"
                        alt=""
                        className="logo"
                    />
                    <Title level={2}>Log in to your account</Title>
                    <Paragraph type="secondary">Welcome back! Please enter your details</Paragraph>
                </div>
                <Form layout="vertical" form={form} onFinish={handleLogin} disabled={isLoading} size="large">
                    <FormItem
                        name={'email'}
                        label={'Email'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email',
                            },
                        ]}
                    >
                        <Input allowClear maxLength={100} type="email" autoComplete="email" />
                    </FormItem>
                    <FormItem
                        name={'password'}
                        label={'Password'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your password',
                            },
                        ]}
                    >
                        <Input.Password placeholder="input password" autoComplete={'new-password'} />
                    </FormItem>

                    <div className="mt-4 mb-3 d-flex">
                        <Button
                            type="primary"
                            className="w-100"
                            size="large"
                            onClick={() => form.submit()}
                            loading={isLoading}
                        >
                            Login
                        </Button>

                    </div>
                </Form>

                <div className="row">
                    <div className="col">
                        <Checkbox checked={isRemember} onChange={(e: any) => setIsRemember(e.target.checked)}>
                            Remember for 30 days
                        </Checkbox>
                    </div>
                    <div className="col">
                        <Link to={'#'}>Forgot Password?</Link>
                    </div>
                </div>

                <div className="mt-3 text-center">
                    <SocialLogin isRemember={isRemember} />
                </div>
                <div className="mt-4 text-center">
                    <Space>
                        <Text>Don't have an account</Text>
                        <Link to={'/register'}>Sign up</Link>
                    </Space>
                </div>
            </Card>
        </>
    );
};

export default LoginPage;
