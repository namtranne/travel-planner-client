import { router } from 'expo-router';
import moment from 'moment';
import { useState } from 'react';
import {
    Keyboard,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import DateRangePicker from '@/src/components/Planning/DateRangePicker/src/DateRangePicker';
import SearchBar from '@/src/components/Planning/SearchBar';
import BackButton from '@/src/components/ui/BackButton';
import Button from '@/src/components/ui/CommonButton';
import { createTrip } from '@/src/services/api-trip';
import { convertDateStringFormat } from '@/src/utils/DateTimeUtil';

export default function Planning() {
    const [destination, setDestination] = useState({ id: -1, name: '' });
    const [budget, setBudget] = useState('0');
    const [date, setDate] = useState({
        startDate: moment(),
        endDate: moment()
    });
    const [onEnteringBudget, setOnEnteringBudget] = useState(false);
    const [onEnteringDate, setOnEnteringDate] = useState(false);

    const handleCreateTrip = async () => {
        const res = await createTrip({
            locationId: destination.id,
            startDate: convertDateStringFormat(date.startDate.toISOString()),
            endDate: convertDateStringFormat(date.endDate.toISOString())
        });
        router.replace(`/trip-plan/${res.id}`);
    };
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView>
                <BackButton />
                <View className="px-6">
                    <Text className="mt-20 font-inter text-2xl font-semibold">
                        Let’s make your trip unforgettable!{' '}
                    </Text>
                    <View className="mt-12">
                        <SearchBar
                            title="Where do you wanna go?"
                            value={destination}
                            setValue={setDestination}
                            additionalStyle="mb-8"
                        />

                        <View className="mb-8">
                            <Text className="mb-2 font-inter text-xs font-light text-black">Date?</Text>
                            <View className="h-[54px] flex-row items-center rounded-lg border border-[#E4E4E4] bg-white px-3 py-2">
                                <TouchableOpacity
                                    className="w-full flex-1 font-inter text-xs"
                                    onPress={() => setOnEnteringDate(true)}
                                >
                                    <Text>{`${date.startDate?.format('DD/MM/YYYY')} - ${date.endDate?.format('DD/MM/YYYY')}`}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="mb-2 font-inter text-xs font-light text-black">Budget?</Text>
                            <View
                                className={`h-[54px] flex-row items-center rounded-lg border border-[#E4E4E4] bg-white px-3 py-2 ${onEnteringBudget && 'border-[#60ABEF]'}`}
                            >
                                <TextInput
                                    className="flex-1 font-inter text-xs"
                                    placeholder=""
                                    value={budget.toString()}
                                    onChangeText={(value) => setBudget(value)}
                                    onFocus={() => setOnEnteringBudget(true)}
                                    onBlur={() => setOnEnteringBudget(false)}
                                    autoCapitalize="none"
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        <View>
                            <Button
                                text="Continue"
                                onPress={() => handleCreateTrip()}
                                additionalStyle="bg-[#60ABEF] w-full"
                            />
                        </View>
                    </View>
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
        </TouchableWithoutFeedback>
    );
}
