import { Link } from 'expo-router';
import moment from 'moment';
import { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

import DateRangePicker from '@/src/components/Planning/DateRangePicker/src/DateRangePicker';
import PlaceCard from '@/src/components/TripBoard/PlaceCard';
import Tab from '@/src/components/ui/Tab';
import ToggleCard from '@/src/components/ui/ToggleCard';

export default function TripBoard() {
    const tabItems = ['Overview', 'Itinerary', 'Explore', 'Budget'];
    const [index, setIndex] = useState(0);
    const [date, setDate] = useState({
        startDate: moment(),
        endDate: moment()
    });
    const [onEnteringDate, setOnEnteringDate] = useState(false);
    return (
        <SafeAreaView className="flex-1 items-center bg-[#FAFAFA]">
            <View className="w-full bg-[#60ABEF]">
                <View className="pl-6 pr-4">
                    <Link href="./" className="mt-12">
                        <Iconify icon="lets-icons:back-light" width="30" height="30" color="white" />
                    </Link>
                    <Text className="font-inter text-2xl font-medium text-white">Summer Trip</Text>

                    <View className="mb-8">
                        <TouchableOpacity
                            className="mt-2 flex w-full flex-1 flex-row items-center text-center font-inter text-xs"
                            onPress={() => setOnEnteringDate(true)}
                        >
                            <Iconify icon="solar:calendar-linear" size={16} color="white" />{' '}
                            <Text className="ml-2 font-inter text-xs font-light text-white">{`${date.startDate?.format('DD/MM/YYYY')} - ${date.endDate?.format('DD/MM/YYYY')}`}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Tab items={tabItems} selectedIndex={index} selectedTextColor="#60ABEF" setSelectedIndex={setIndex} />
            </View>

            <View className="mt-2 w-full px-2">
                <ToggleCard title="Places to visit">
                    <PlaceCard
                        data={{
                            title: 'Chua Linh Phuoc',
                            index: 1,
                            rating: 4.6,
                            description:
                                'Tran Family Chapel, an early 19th-century house and chapel built by the prominent Tran family, is a historical gem in Hoi An. This ancient temple stands out with its traditional Vietnamese architecture combined with unique Chinese and Japanese influences. It serves as a peaceful space for worshipping ancestors and preserving family traditions. Visitors can explore relics, photos, and intricate architectural details that reflect over 200 years of history.',
                            address: '120 Tu Phuoc, Phuonh 11, Da Lat, Lam Dong 550000, Vietnam'
                        }}
                    />
                </ToggleCard>
            </View>

            <DateRangePicker
                displayedDate={date.startDate}
                startDate={date.startDate}
                endDate={date.endDate}
                onChange={(data: any) => {
                    setDate({ ...date, ...data });
                }}
                open={onEnteringDate}
                setOpen={setOnEnteringDate}
                range
            />
        </SafeAreaView>
    );
}
