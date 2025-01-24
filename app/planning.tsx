// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { useState } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { destinations } from '@/assets/data/destinations';
import DateRangePicker from '@/src/components/Planning/DateRangePicker/src/DateRangePicker';
import type { SearchItem } from '@/src/components/Planning/SearchBar';
import SearchBar from '@/src/components/Planning/SearchBar';
import BackButton from '@/src/components/ui/BackButton';
import Button from '@/src/components/ui/CommonButton';

export default function Planning() {
    const [destination, setDestination] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('0');
    const [budget, setBudget] = useState('0');
    const [date, setDate] = useState({
        startDate: moment(),
        endDate: moment()
    });
    const [onEnteringNumberOfPeople, setOnEnteringNumberOfPeople] = useState(false);
    const [onEnteringBudget, setOnEnteringBudget] = useState(false);
    const [onEnteringDate, setOnEnteringDate] = useState(false);
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
                <View className="px-6 pt-12">
                    <BackButton />
                    <Text className="mt-20 font-inter text-2xl font-semibold">
                        Let’s make your trip unforgettable!{' '}
                    </Text>

                    <View className="mt-12">
                        <SearchBar
                            title="Where do you wanna go?"
                            data={destinations}
                            value={destination}
                            setValue={setDestination}
                            onItemPress={(item: SearchItem) => setDestination(item.title)}
                            additionalStyle="mb-8"
                        />

                        <View className="mb-8">
                            <Text className="mb-2 font-inter text-xs font-light text-black">How many people?</Text>
                            <View
                                className={`h-[54px] flex-row items-center rounded-lg border border-[#E4E4E4] bg-white px-3 py-2 ${onEnteringNumberOfPeople && 'border-[#60ABEF]'}`}
                            >
                                <TextInput
                                    className="flex-1 font-inter text-xs"
                                    placeholder=""
                                    value={numberOfPeople.toString()}
                                    onChangeText={(value) => setNumberOfPeople(value)}
                                    onFocus={() => setOnEnteringNumberOfPeople(true)}
                                    onBlur={() => {
                                        setOnEnteringNumberOfPeople(false);
                                        Keyboard.dismiss(); // Dismiss the keyboard when input loses focus
                                    }}
                                    autoCapitalize="none"
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

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
                                onPress={() => console.log('Press')}
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
            </View>
        </TouchableWithoutFeedback>
    );
}
