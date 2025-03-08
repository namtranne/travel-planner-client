import * as Google from 'expo-auth-session/providers/google';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';

import { GoogleIcon } from '@/assets';
import { useLoginGoogle } from '@/src/hooks/use-authenticate';

export default function GoogleSigninButton() {
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '745261753786-omd5ol18l7pbnq9sjgh2trjunkioaerr.apps.googleusercontent.com',
        iosClientId: '745261753786-7j5ku10504k63vo2erv5i034bun7lrtp.apps.googleusercontent.com',
        redirectUri: 'com.anonymous.reactnativeboilerplate:/oauthredirect'
    });
    const { loginGoogle, isPending } = useLoginGoogle();

    async function fetchUserInfo(token: any) {
        const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        return data;
    }

    useEffect(() => {
        async function fetchData() {
            if (response?.type === 'success') {
                const { authentication } = response;
                await fetchUserInfo(authentication?.accessToken);
                loginGoogle(authentication?.idToken || '', {
                    onSuccess: () => {
                        router.navigate('user-survey');
                    },
                    onError: (error) => {
                        Alert.alert('Login Failed', error.message, [
                            { text: 'Try Again', onPress: () => console.log('User retries login by Google') },
                            { text: 'Cancel', style: 'cancel' }
                        ]);
                    }
                });
            }
        }
        fetchData();
    }, [response, loginGoogle]);

    return (
        <View>
            <TouchableOpacity
                disabled={!request || isPending}
                onPress={() => promptAsync()}
                className="mt-5 flex h-[41px] w-[312px] flex-row items-center justify-center rounded-xl bg-black"
            >
                <Image source={GoogleIcon} className="h-8 w-8" />
                <Text className="font-inter text-xs font-semibold text-white">Continue in with Google</Text>
            </TouchableOpacity>
        </View>
    );
}
