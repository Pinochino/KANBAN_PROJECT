import { Button, Image, Typography } from 'antd'
import React from 'react';
const { Text, Title, Paragraph } = Typography;

const SocialLogin = () => {
    return (
        <div>
            <Button
                with='100%'
                size='large'
                icon={
                    <img
                        with={24}
                        height={24}
                        src='https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000'
                        alt='logo' />
                }
            >
                <Text>Sign up with Google</Text>
            </Button>
        </div>
    )
}

export default SocialLogin