/* eslint-disable import/no-extraneous-dependencies */
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { GoogleIcon } from '@/assets';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSigninButton() {
    const [request, response, promptAsync] = Google.useAuthRequest({
        // clientId: '745261753786-omd5ol18l7pbnq9sjgh2trjunkioaerr.apps.googleusercontent.com',
        iosClientId: '745261753786-7j5ku10504k63vo2erv5i034bun7lrtp.apps.googleusercontent.com',
        redirectUri: 'com.anonymous.reactnativeboilerplate:/oauthredirect'
    });
    async function fetchUserInfo(token: any) {
        const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        return data;
    }

    useEffect(() => {
        // console.log(JSON.stringify(response));
        if (response?.type === 'success') {
            // console.log(JSON.stringify(response.params.id_token));
            const { authentication } = response;
            fetchUserInfo(authentication?.accessToken);
        }
    }, [response]);

    return (
        <View>
            <TouchableOpacity
                disabled={!request}
                onPress={() => promptAsync()}
                className="mt-5 flex h-[41px] w-[312px] flex-row items-center justify-center rounded-xl bg-black"
            >
                <Image source={GoogleIcon} className="h-8 w-8" />
                <Text className="font-inter text-xs font-semibold text-white">Continue in with Google</Text>
            </TouchableOpacity>
        </View>
    );
}
