import { Button, message, Typography } from 'antd'
import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { auth } from '@/firebase/firebaseConfig';
import handleAPI from '@/apis/handleApi';
import { addAuth } from '@/redux/reducers/authReducer';
import { localDataNames } from '@/constants/AppInfos';
const { Text } = Typography;

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
    'login_hint': 'Tranhunghp22112004@gmail.com'
});

interface Props {
    isRemember?: boolean;
}

const SocialLogin = (props: Props) => {
    const { isRemember } = props;

    const [isLoading, setIsloading] = React.useState<boolean>(false);

    const dispatch = useDispatch();

    const handleGoogleLogin = async () => {
        setIsloading(true);
        try {
            const result = await signInWithPopup(auth, provider);

            if (result) {
                const user = result.user;

                if (user) {
                    const data = {
                        username: user.displayName,
                        email: user.email,
                    };

                    const api = '/auth/google-login';
                    try {
                        const res: any = await handleAPI(api, data, 'post');
                        message.success(res.message);

                        dispatch(addAuth(res.data));

                        if (isRemember) {
                            localStorage.setItem(localDataNames.authData, JSON.stringify(res.data));
                        }

                    } catch (error: any) {
                        console.log(error);
                        message.error(error.message)
                    }
                }
            } else {
                console.log('Can not not login with google');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsloading(false)
        }
    }

    return (
        <div>
            <Button
                loading={isLoading}
                onClick={handleGoogleLogin}
                size='large'
                icon={
                    <img
                        width={24}
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