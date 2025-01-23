import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

export interface SearchItem {
    id: number | string;
    title: string;
    subtitle: string;
}

export default function SearchBar({
    title,
    data,
    value,
    setValue,
    onItemPress,
    additionalStyle
}: {
    title: string;
    data: SearchItem[];
    value: string;
    setValue: (value: string) => void;
    onItemPress: (item: SearchItem) => void;
    additionalStyle: string;
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const timeoutId = setTimeout(() => {
            const filtered = data.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
            setFilteredData(filtered);
            setIsLoading(false);
        }, 300); // Debounce search for better performance

        return () => clearTimeout(timeoutId);
    }, [searchQuery, data]);

    const handlePressItem = (item: SearchItem) => {
        console.log(item);
        setSearchQuery(item.title);
        onItemPress(item);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setFilteredData(data);
        setValue('');
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
                        value={isSearching ? searchQuery : value}
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
                    <View>
                        {filteredData.length > 0 ? (
                            <ScrollView
                                className="h-60 w-full"
                                contentContainerStyle={{ paddingBottom: 10 }}
                                keyboardShouldPersistTaps="handled"
                            >
                                {filteredData.map((item) => {
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
