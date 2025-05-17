import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function DaySelectorSheet({
    days,
    selectedDay,
    onSelectDay,
    onPlacePress,
    onOptimize
}: {
    days: any[];
    selectedDay: any;
    onSelectDay: (day: any) => void;
    onPlacePress: (place: any) => void;
    onOptimize: () => void;
}) {
    const snapPoints = ['30%'];

    return (
        <BottomSheet index={0} snapPoints={snapPoints}>
            <BottomSheetView>
                <View className="px-4">
                    <ScrollView horizontal className="mb-4 flex-row ">
                        {days.map((day: any) => (
                            <TouchableOpacity
                                key={day.id}
                                onPress={() => onSelectDay(day)}
                                className={`mr-2 rounded-full px-4 py-2 ${selectedDay.id === day.id ? 'bg-black' : 'bg-gray-200'}`}
                            >
                                <Text className={selectedDay.id === day.id ? 'text-white' : 'text-black'}>
                                    {day.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <ScrollView className="h-[200px] w-full">
                        {selectedDay.placeToVisits.map((place: any, index: number) => (
                            <TouchableOpacity
                                key={place.id}
                                className="flex-row items-center py-4"
                                onPress={() => onPlacePress(place.place)}
                            >
                                <Text className="mr-2 font-bold text-[#60ABEF]">{index + 1}</Text>
                                <Text>{place.place.placeName}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <TouchableOpacity onPress={onOptimize} className="my-4 items-center rounded-full bg-[#60ABEF] p-3">
                        <Text className="font-bold text-white">Optimize Route</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetView>
        </BottomSheet>
    );
}
