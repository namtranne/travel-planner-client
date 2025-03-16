import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

import { useSearchPlaces } from '@/src/hooks/use-place';

import Button from '../ui/CommonButton';

const SearchPlaceModal = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const { searchPlaces, data: results, isPending, error } = useSearchPlaces();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);
    useEffect(() => {
        if (debouncedQuery) {
            searchPlaces(debouncedQuery);
        }
    }, [debouncedQuery, searchPlaces]);

    const handleSearch = (text: string) => {
        setSearchQuery(text);
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'location':
                return <Iconify icon="mdi:map-marker-outline" width={18} height={18} color="#000" />;
            case 'search':
                return <Iconify icon="mdi:magnify" width={18} height={18} color="#000" />;
            case 'note':
                return <Iconify icon="mdi:pencil-outline" width={18} height={18} color="#000" />;
            default:
                return null;
        }
    };

    return (
        <View className="px-5 pb-6 pt-2">
            <Text className="text-center text-base font-bold">Add a place</Text>
            {/* Search Input */}
            <View className="mt-4 flex-row items-center rounded-lg bg-gray-100 px-4">
                <TextInput
                    placeholder="Search by name or address"
                    className="flex-1 py-4 text-xs text-gray-600"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
                {searchQuery.length > 0 ? (
                    <TouchableOpacity
                        className="h-6 w-6 items-center justify-center rounded-full bg-gray-300"
                        onPress={() => {
                            setSearchQuery('');
                            setDebouncedQuery('');
                        }}
                    >
                        <Iconify icon="mdi:close" width={18} height={18} color="#555" />
                    </TouchableOpacity>
                ) : null}
            </View>
            {/* Loading Indicator */}
            {isPending && (
                <View className="mt-4 flex items-center">
                    <ActivityIndicator size="small" color="#60ABEF" />
                </View>
            )}
            {/* Error Message */}
            {error && (
                <View className="mt-4 flex items-center">
                    <Text className="text-red-500">Error: {error.message}</Text>
                </View>
            )}

            {/* Search Results */}
            {!isPending && results && results.length > 0 && searchQuery && (
                <ScrollView className="my-4 max-h-[500px]" keyboardShouldPersistTaps="always">
                    {results.map((item: any) => (
                        <View key={item.id} className="mb-4 flex-row items-center px-2">
                            {getIcon('location')}
                            <View className="ml-3 flex-1">
                                <Text className="text-gray-900">{item.placeName}</Text>
                                {item.categoryPlaces && (
                                    <Text className="text-gray-500">
                                        {item.address} {'- '}
                                        {item.categoryPlaces.length > 0
                                            ? item?.categoryPlaces[0].category.locationName
                                            : ''}
                                    </Text>
                                )}
                            </View>
                        </View>
                    ))}
                </ScrollView>
            )}

            {/* "Explore Guides" Button */}
            {!isPending && !searchQuery && (
                <View className="mt-12 items-center">
                    <Text className="text-center text-gray-500">Need more ideas?</Text>
                    <Button
                        text="Explore guides and blogs"
                        onPress={() => {}}
                        additionalStyle="mt-2 bg-[#60ABEF] w-[250px] rounded-xl"
                    />
                </View>
            )}
        </View>
    );
};

export default SearchPlaceModal;
