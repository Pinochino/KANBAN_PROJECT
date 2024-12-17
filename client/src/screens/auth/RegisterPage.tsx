import { Button, Checkbox, Form, Input, message, Space, Typography } from 'antd';
import Card from 'antd/es/card/Card';
import FormItem from 'antd/es/form/FormItem';
import React from 'react';
import { Link } from 'react-router-dom';
import SocialLogin from './components/SocialLogin';
import handleAPI from '@/apis/handleApi';
const { Text, Title, Paragraph } = Typography;

interface FormProps {
    username?: string;
    email?: string;
    password?: string;
}
const RegisterPage = () => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isRemember, setIsRemember] = React.useState<boolean>(false);

    const handleLogin = async (values: FormProps) => {
        console.log(values);
        setIsLoading(true);
        const api = `/auth/register`
        try {
            const res = await handleAPI(api, values, 'post');
            console.log('Login response:', res);
        } catch (error) {
            console.error('Login error:', error);
            message.error(`Error ${error.code}: ${error.message}`)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Card>
                <div className="text-center">
                    <img src="https://cdn.pixabay.com/photo/2021/06/15/12/51/facebook-6338507_1280.png" alt="" className="logo" />
                    <Title level={2}>Log in to your account</Title>
                    <Paragraph type="secondary">Welcome back! Please enter your details</Paragraph>
                </div>
                <Form layout="vertical" form={form} onFinish={handleLogin} disabled={isLoading} size="large">
                    <FormItem
                        name={'username'}
                        label={'Username'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your username',
                            },
                        ]}
                    >
                        <Input allowClear maxLength={100} type="text" autoComplete="additional-name" />
                    </FormItem>
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
                            () => ({
                                validator: (_, value) => {
                                    if (value && value.length < 6) {
                                        return Promise.reject(
                                            new Error("Password has at least 6 characters")
                                        );
                                    } else {
                                        return Promise.resolve();
                                    }
                                }
                            })
                        ]}
                    >
                        <Input.Password placeholder="input password" autoComplete={'new-password'} />
                    </FormItem>

                    <div className="mt-4 mb-3">
                        <Button type="primary" className="w-100" size="large" onClick={() => form.submit()}
                            loading={isLoading}
                        >
                            Login
                        </Button>
                    </div>
                </Form>

                <div className="row">
                    <div className="col">
                        <Checkbox checked={isRemember} onChange={(e: any) => setIsRemember(e.target.checked)}>
                            Remember
                        </Checkbox>
                    </div>
                    <div className="col">
                        <Link to={'#'}>Forgot Password?</Link>
                    </div>
                </div>

                <div className="mt-3 text-center">
                    <SocialLogin />
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
}

export default RegisterPage;