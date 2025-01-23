/* eslint-disable import/no-extraneous-dependencies */
import type React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

import BackButton from '@/src/components/BackButton';
import HeaderComponent from '@/src/components/HeaderComponent';

interface TipItem {
    id: string;
    title: string;
    image: string;
    backgroundColor: string;
}

const tips: TipItem[] = [
    {
        id: '1',
        title: 'Travel Wardrobe Essentials',
        image: 'https://s3-alpha-sig.figma.com/img/41d5/f60e/442560c18935e4757869b26d5b5f4cb8?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S0pQcVZoOJMMmLaocZVamROCJth9A9MGbRYIIuO8y6OsLWnPeF8YyRCt21~OLhB7DEn06QXVedRwKCWdXs6IDOVZZ6V6-81xTi6-IRNvjXCYGwrau9w8EheFZjjVWQWUzuoX80yF4tcLh1IyZKVxhkpKiLEssYjINH14WG4qqtU9bgVWHKfc2qpan1Cu7LMuC9fe2xApMv5ho4eG8HKQTRI1hL~ZzgA2ExnKjjN~ogMlCRyFOMmFF7u-W0P8DgBQfKe38RNo0JEm6ShnZJxkDWrKAnzF83qyqoe7HL4xbOu59~kJDok-~dHrIFY9tO4URZyWbBfyLv4UPlARhxEkFQ__',
        backgroundColor: 'bg-[#afbaff]'
    },
    {
        id: '2',
        title: 'From Beach to Mountains',
        image: 'https://s3-alpha-sig.figma.com/img/f196/d9e4/1f20f7b253984af81368922f281a87f4?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aJnBctMyjGeFYgE6saY2nTha9bXGUx6n2tzQ5r1pGkHorejKQfTiuAggDgD2x2zHEpDYMrKROOd5x1BNgEoIACJ6fO1FJBA1tvR-EVW1IytUrD5ejPlbzRLJawRannr6auaQEumYG1LJhrqDvSRDPMsBFspRzNaCsQqaWcCrE-rwDa8ne1APqaKywXgYuG9PULSNBU3zZuBdDQi6ndcp1Us~ek1IqT0kEtayQxSCwDnyEtjxdP8XpCgEtgHFQxCAr5YNekR~I-Kclm~dD2592SKqj~whYoFgqXk3pYDV7AWBIL095m-B0o4OycrVspHsRuyR3wwdryl1qHfh4bmfcg__',
        backgroundColor: 'bg-[#4a4d1e]'
    },
    {
        id: '3',
        title: 'The Ultimate Packing Checklist',
        image: 'https://s3-alpha-sig.figma.com/img/6771/c1c0/da64082659f4dc2724a7115cff6a3e8f?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=f2BFOownaq4XWVrVvWjQVbPoVd~N~FWwG~mjJEBkeHb84W6ig9nWMEtrT8VAu3ZzxdWevNCH4oh8vC9reRlCX57zYTZdWTnasHKDC28LuiVuHiJnt581rwQG~gNHEOTE43FV6J1jt37NyTM4r~9I0MCRH18M~rH8ZRBddPqjfKkqGH8XtvTukhyl2s519e0tToYH7RQYA1ufwJqstdOK0P2HJFpGccgMJVbJNudBzhv4RAb-kawEhH3wXQ6yxWQVwrcp5YbrS3mNAnFgw5Ja2Qqsnn9EB5uwonSMxHsIGK63ywv2vnIuFyDGj0yDSe3vVNZo0l56Py8-lXHHqpmF6Q__',
        backgroundColor: 'bg-[#5e4c4a]'
    },
    {
        id: '4',
        title: 'Stay Healthy on the Go',
        image: 'https://s3-alpha-sig.figma.com/img/ed0a/9be2/fdbb94d4fbf3c2fe346cd139a62636d4?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=adGHD~b1FEH1Y5ks27r9~AwTxEnoGDAlgQ8mI~FbM7~30~a8G2x0-CtP0tju4ghpBaxIZ87qHS~dvpwFy83n8cK6eBBizmBAGauZmeUS~S1evpjuliI7bjTgAwnuGxdyXOcQ-6UsrWfe7iy-K-ftwBlhnOJtNWrYL64-hsm83oLRYnXfeZZzRF-SPCu3xt6w8KN0ozrzgrjE6HY~u7~ve0CZZ6PZJoyS4oVk~yksVKR1M7TTpwGfE3xYG4N66QlEiqoOLMV0u0hKQpE2WvmAPnmhpBM-qh6O8fayi36aWmmrAiTCOktFfEs6cIaykEzeAvOI08q9poSW3ZdzNBIbUQ__',
        backgroundColor: 'bg-[#343671]'
    },
    {
        id: '5',
        title: 'Solo Travel Packing Tips',
        image: 'https://s3-alpha-sig.figma.com/img/df1a/bad5/843352b23048833cdaf7e777075a875f?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=n0Sz8~BlGjNVvx1AmNo1jQt9kM09I8YkhkL~4Z0ZZCmFIIWr6hra0wiU0XQpcCNBAYKM81mGWgKPDA1AtazH8cx4z2GgExe4wY45DwPC6XIPMFM89gN3QVGjb2-PNe0QHLb1A-y0PucmLuG1z9LiaN6OH0IszfpjFJvzMvn5sowndTvmpnJJIMtShM4DU-SlNrgZjEvALqtgijeTVqeGox-YT6Lvb6mHi2wOFUiJBsMij03-WiH1W8Tw2~wXcpy-ejBAgwHkT50WhtnnpO7qEnAzK~aycNjqtEevlcZwQOMcSo3zO8AQj-NeE0vXkSFxwl8A30uZ~sXP38WEtfDDaw__',
        backgroundColor: 'bg-[#0049a8]'
    },
    {
        id: '6',
        title: 'Family Travel 101',
        image: 'https://s3-alpha-sig.figma.com/img/b625/83a3/9951b06ccd69e7744b71dff54a172406?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ODTbbtInDTEGp7pmqP1DlaZzoXiT16P6UaMY1Axd-IrJVlMrZsbbJRrOVx~mG0DgbNa-18MsLXiMQPovAZQLHmHHxt72u55wB30bOl0lsVoqJJ6nKIw2l9buvWh1a02BDqIBNAC3HBDIKAnqGJFot8D9J6iEZ6xsIWy2vbYUWP5uBdveYTB8frxRvJP3l0YJMcv7qF83CWA0APoxj6V7qu39rGxnDTg4D~DRrAdjvFktZzUS9yqF6NjAb~YeRgTVqTMhjJ~k-tYdQE~1E65CXeMQ9u5hS9A7MM1LvrWoD9114Ww1sPLkRPQLmSz1tloCaZ-TVulamey4oz6PduD2Dw__',
        backgroundColor: 'bg-[#04c272]'
    }
];

const TravelTipsScreen: React.FC = () => {
    const renderItem = ({ item }: { item: TipItem }) => (
        <TouchableOpacity className={`m-2 my-4 flex-1 overflow-hidden rounded-lg ${item.backgroundColor}`}>
            <Image source={{ uri: item.image }} className="h-32 w-full rounded-b-2xl" resizeMode="cover" />
            <Text className="px-6 py-2 text-center text-base text-white">{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-white p-4">
            <BackButton />
            <HeaderComponent title="Travel tips" subtitle="Be well prepared for every strip" />
            <FlatList
                data={tips}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={tw`pb-4`}
            />
        </View>
    );
};

export default TravelTipsScreen;
