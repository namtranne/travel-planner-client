import { router } from 'expo-router';
import moment from 'moment';
import { useState } from 'react';
import {
    Keyboard,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import { checklistTypes } from '@/assets/data/checklistTypes';
import DateRangePicker from '@/src/components/Planning/DateRangePicker/src/DateRangePicker';
import SearchBar from '@/src/components/Planning/SearchBar';
import BackButton from '@/src/components/ui/BackButton';
import Button from '@/src/components/ui/CommonButton';
import { createTrip } from '@/src/services/api-trip';
import { convertDateStringFormat } from '@/src/utils/DateTimeUtil';

export default function Planning() {
    const [loading, setLoading] = useState(false);
    const [destination, setDestination] = useState({ id: -1, name: '' });
    const [budget, setBudget] = useState('0');
    const [date, setDate] = useState({
        startDate: moment(),
        endDate: moment()
    });
    const [onEnteringBudget, setOnEnteringBudget] = useState(false);
    const [onEnteringDate, setOnEnteringDate] = useState(false);
    const [selectedChecklists, setSelectedChecklists] = useState<string[]>([]);

    const toggleChecklist = (type: string) => {
        if (selectedChecklists.includes(type)) {
            setSelectedChecklists(selectedChecklists.filter((t) => t !== type));
        } else {
            setSelectedChecklists([...selectedChecklists, type]);
        }
    };

    const handleCreateTrip = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const res = await createTrip({
                locationId: destination.id,
                startDate: convertDateStringFormat(date.startDate.toISOString()),
                endDate: convertDateStringFormat(date.endDate.toISOString()),
                selectedChecklistTypes: selectedChecklists
            });
            router.replace(`/trip-plan/${res.id}`);
        } catch (error) {
            console.error('Failed to create trip:', error);
            // Optionally show toast or alert here
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView>
                <BackButton />
                <View className="px-6">
                    <Text className="mt-10 font-inter text-2xl font-semibold">
                        Let’s make your trip unforgettable!{' '}
                    </Text>
                    <View className="mt-8">
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
                            <Text className="mb-2 font-inter text-xs font-light text-black">
                                What checklists do you need?
                            </Text>
                            <View className="h-56 rounded-lg border border-[#E4E4E4] bg-white px-3 py-2">
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <View className="flex-row flex-wrap gap-2">
                                        {checklistTypes.map((type) => (
                                            <TouchableOpacity
                                                key={type}
                                                onPress={() => toggleChecklist(type)}
                                                className={`mb-2 rounded-full px-4 py-2 ${
                                                    selectedChecklists.includes(type) ? 'bg-[#60ABEF]' : 'bg-gray-200'
                                                }`}
                                            >
                                                <Text
                                                    className={`text-xs ${
                                                        selectedChecklists.includes(type) ? 'text-white' : 'text-black'
                                                    }`}
                                                >
                                                    {type}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </ScrollView>
                            </View>
                        </View>

                        <View>
                            <Button
                                text={loading ? 'Creating trip...' : 'Continue'}
                                onPress={handleCreateTrip}
                                additionalStyle={`w-full ${loading ? 'bg-[#A4C9EA]' : 'bg-[#60ABEF]'}`}
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
