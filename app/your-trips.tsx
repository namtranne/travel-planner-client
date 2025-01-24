/* eslint-disable import/no-extraneous-dependencies */
import type React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons
import tw from 'tailwind-react-native-classnames';

import BackButton from '@/src/components/BackButton';
import HeaderComponent from '@/src/components/HeaderComponent';

interface TripItem {
    id: string;
    title: string;
    date: string;
    location: string;
    image: string;
}

const trips: TripItem[] = [
    {
        id: '1',
        title: 'Summer trip',
        date: '12 Jan - 20 Jan',
        location: 'Da Lat city',
        image: 'https://s3-alpha-sig.figma.com/img/730f/a2d2/309eb0a335e9149880022974a7d29fd1?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pReIH784yPb-OrcdUnDST6XUgU8Dc1v07hICmub039xYWAk6zeOQ8pPIbYnuJCothYuMyqobAqM7~N6V3jycosuP7xPJb3AYHARBy77BrGOLRk0UDJc6xl106xe4AocDoVHsfN8Qg9P5-YlFF1buAweMseZlBzOyMsjB0XENAz9cjCBSnfzSiO1bLPi01UjNOwS7KovOFIH-AttB3k31zCnYiXnWKpPAx6JNr9weOnpJJY-uLpxeIrdQ8bFUONULUaHB~gqLeUsNyo7srenaAuaHVnhAArbHQROGwmw4zALFhRZcFpuZa3l-Jg9igtz1dJai7NOyy2JAk6FI0jTLNw__'
    },
    {
        id: '2',
        title: 'Healing trip',
        date: '12 Jan - 20 Jan',
        location: 'Da Lat city',
        image: 'https://s3-alpha-sig.figma.com/img/3407/7264/d61a34d2c90cb1942879dbc1e0cfae5f?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U699UU7k7Aj7u0SVGkmP7ZmtPpwxnnpCfzP21f4h8deMT32KoPzGEccywRgrr8lUXwTU9sbzzNAK8vMNjDhhYtWMx86O-weAzzafvPTWhbMF1OFY0yCzh2-k5kY4ARdEfameWrt7e7rnkEG1WimJwuE2vytps6RGoenj2Uq0ZjLOfdc3IHT4JfaY6hYPs56B03cEVXyHk1sfO3tJA5FOJtBqoDGzn0xuNCVn8mL6hF9Eap1X4TmLhkBI~bthvopTeivk4KVrznBNGu28L1bXzpTxjqP4EUhK5bjWjaB2MAgT2W0wICGQcumZyIqcKgBxJuLAqfaoUjnyoY~o0Elhbg__'
    },
    {
        id: '3',
        title: 'Summer trip',
        date: '12 Jan - 20 Jan',
        location: 'Da Lat city',
        image: 'https://s3-alpha-sig.figma.com/img/7795/5291/6b769e2fa8d42142f171471707241989?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dLHhdyX89HPMKImx4ZInuV5mneBhaAMR61a-cYLRIgYaLqulTgRac-u~uh~rNl~MawDXikojNn3oqUjOvcW~J4SU56B-WjlChxdjOjcBaKM6ftEruzatJncW2q8UuQ~aT-0v7POe3JL~FH2LB5GuLGmbZ-gXU1ZUeQT8ZgbqqvdpA2M10cQZPjVO-KUOJdRnk12ubhZwNmGxy0cKZ99Fr0Fs9KDisuq8SoDBFXlp5mt5iZNOoZ1jx9pjHDdtVbAbNaJC~0UcPyx34xWQFaw9ei2N019w34zN085xp9fvp8Q9aB7VZt~o3g7hzQI3axDMeNvyTPc0NRfvW2B52npciw__'
    }
];

const YourTripsScreen: React.FC = () => {
    const renderItem = ({ item }: { item: TripItem }) => (
        <TouchableOpacity className="my-2 flex-row rounded-lg bg-white p-2 shadow-md">
            <Image source={{ uri: item.image }} className="h-24 w-24 rounded-3xl" resizeMode="cover" />
            <View className="ml-4 flex-1">
                <Text className="font-inter text-xl font-bold">{item.title}</Text>
                <View className="flex-row items-center space-x-2">
                    <Iconify icon="solar:calendar-linear" size={16} />
                    <Text className="font-inter text-sm text-gray-400">{item.date}</Text>
                </View>
                <View className="flex-row items-center space-x-2">
                    <Iconify icon="mi:location" size={16} />
                    <Text className="font-inter text-sm text-gray-400">{item.location}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-white p-4">
            <View className="flex-row justify-between space-x-4">
                <BackButton />
                <TouchableOpacity className="h-6 w-6 items-center justify-center border border-black">
                    <Icon name="add" size={18} color="black" />
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-between space-x-4">
                <HeaderComponent title="Your trips" />
            </View>
            <View className="flex-row justify-end">
                <TouchableOpacity className="h-8 w-8 items-center justify-center">
                    <Iconify icon="mdi:filter" width="30" height="30" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={trips}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={tw`p-4`}
            />
            <TouchableOpacity className="absolute inset-x-4 bottom-4 rounded-lg bg-blue-500 py-4">
                <Text className="text-center font-inter font-bold text-white">New trip</Text>
            </TouchableOpacity>
        </View>
    );
};

export default YourTripsScreen;
