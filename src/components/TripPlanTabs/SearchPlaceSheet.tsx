import { useState } from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Iconify from 'react-native-iconify';

import Button from '../ui/CommonButton';

const SearchPlaceModal = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<{ type: string; name: string; location?: string }[]>([]);

    // Mock data - Replace with API call
    const mockSearchResults = (query: string) => {
        return [
            { type: 'location', name: 'Grand Palais', location: 'Paris, France' },
            { type: 'location', name: 'Gulf of Mexico', location: '(Gulf of America)' },
            { type: 'search', name: `Search for: ${query}` },
            { type: 'location', name: 'Galeries Lafayette Haussmann', location: 'Boulevard Haussmann, Paris, France' },
            { type: 'location', name: 'Guadalajara', location: 'Jalisco, Mexico' },
            { type: 'search', name: `Search for: ${query}` },
            { type: 'note', name: `Add note for: ${query}` }
        ];
    };

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        if (text.length === 0) {
            setResults([]);
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setResults(mockSearchResults(text)); // Simulate API response
            setLoading(false);
        }, 1000);
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
                            setResults([]);
                        }}
                    >
                        <Iconify icon="mdi:close" width={18} height={18} color="#555" />
                    </TouchableOpacity>
                ) : null}
            </View>

            {/* Loading Indicator */}
            {loading && (
                <View className="mt-4 flex items-center">
                    <ActivityIndicator size="small" color="#60ABEF" />
                </View>
            )}

            {!loading && results.length > 0 && (
                <FlatList
                    data={results}
                    keyExtractor={(item, index) => index.toString()}
                    className="mt-4"
                    renderItem={({ item }) => (
                        <View className="flex-row items-center px-2 py-3">
                            {getIcon(item.type)}
                            <View className="ml-3 flex-1">
                                <Text className="text-gray-900">{item.name}</Text>
                                {item.location && <Text className="text-gray-500">{item.location}</Text>}
                            </View>
                        </View>
                    )}
                />
            )}

            {/* "Explore Guides" Button */}
            {results.length === 0 && !loading && (
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
