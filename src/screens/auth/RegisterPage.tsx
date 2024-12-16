import { Button, Checkbox, Form, Input, Space, Typography } from 'antd';
import Card from 'antd/es/card/Card';
import FormItem from 'antd/es/form/FormItem';
import React from 'react';
import { Link } from 'react-router-dom';
import SocialLogin from './components/SocialLogin';
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

    const handleLogin = (values: { email: string, password: string }) => {
        console.log(values);
    };

    return (
        <div>
            <Card>
                <div className="text-center">
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
                        ]}
                    >
                        <Input.Password placeholder="input password" autoComplete={'new-password'} />
                    </FormItem>

                    <div className="mt-4 mb-3">
                        <Button type="primary" className="w-100" size="large" onClick={() => form.submit()}>
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
        </div>
    );
}

export default RegisterPage;