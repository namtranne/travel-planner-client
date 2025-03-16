import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

import { fetchLocations } from '@/src/services';

export interface SearchItem {
    id: number | string;
    title: string;
    subtitle: string;
}

export default function SearchBar({
    title,
    value,
    setValue,
    additionalStyle
}: {
    title: string;
    value: { id: number; name: string };
    setValue: (value: { id: number; name: string }) => void;
    additionalStyle: string;
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isSearching) return;
        setIsLoading(true);
        const fetchData = async () => {
            const res = await fetchLocations(searchQuery);
            setData(res);
            setIsLoading(false);
        };
        fetchData();
    }, [searchQuery, isSearching]);

    const handlePressItem = (item: SearchItem) => {
        setIsSearching(false);
        setSearchQuery(item.title);
        setValue({ id: parseInt(`${item.id}`, 10), name: item.title });
    };

    const clearSearch = () => {
        setSearchQuery('');
        setData([]);
        setValue({ id: -1, name: '' });
    };

    return (
        <View className={additionalStyle}>
            {/* Search Bar */}
            <View className="bg-gray-50">
                <Text className="mb-2 font-inter text-xs font-light text-black">{title}</Text>
                <View
                    className={`h-[54px] flex-row items-center rounded-lg border border-[#E4E4E4] bg-white px-3 py-2 ${isSearching && 'border-[#60ABEF]'}`}
                >
                    <TextInput
                        className="flex-1 font-inter text-xs"
                        placeholder="Search..."
                        value={isSearching ? searchQuery : value.name}
                        onChangeText={setSearchQuery}
                        onFocus={() => setIsSearching(true)}
                        onBlur={() => setIsSearching(false)}
                        autoCapitalize="none"
                    />
                    {(searchQuery.length > 0 || value) && (
                        <TouchableOpacity onPress={clearSearch}>
                            <Iconify icon="material-symbols:close" size={20} color="#6B7280" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Results List */}
            {isLoading ? (
                <View className="flex-1 items-center justify-center ">
                    <ActivityIndicator size="large" color="#6B7280" />
                </View>
            ) : (
                isSearching && (
                    <View className="absolute top-full z-10 w-full bg-white">
                        {data.length > 0 ? (
                            <ScrollView
                                className="max-h-60 w-full"
                                contentContainerStyle={{ paddingBottom: 10 }}
                                keyboardShouldPersistTaps="handled"
                            >
                                {data.map((item: any) => {
                                    return (
                                        <TouchableOpacity
                                            className="border-b border-gray-100 p-4"
                                            key={item.id}
                                            onPress={() => handlePressItem(item)}
                                            style={{ zIndex: 10 }} // Ensure it's on top of other elements
                                        >
                                            <Text className="text-base text-gray-800">{item.title}</Text>
                                            {item.subtitle && (
                                                <Text className="mt-1 text-sm text-gray-500">{item.subtitle}</Text>
                                            )}
                                        </TouchableOpacity>
                                    );
                                })}
                            </ScrollView>
                        ) : (
                            <View className="flex-1 items-center justify-center py-8">
                                <Text className="text-gray-500">No results found</Text>
                            </View>
                        )}
                    </View>
                )
            )}
        </View>
    );
}
