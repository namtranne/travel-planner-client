import { Text, TouchableOpacity } from 'react-native';

export default function CategorySelector({
    category,
    selectedCategories,
    handleSelectCategories
}: {
    category: string;
    selectedCategories: string[];
    handleSelectCategories: (category: string) => void;
}) {
    return (
        <TouchableOpacity
            onPress={() => handleSelectCategories(category)}
            className={`mb-1 mr-1 flex-row items-center rounded-full p-2 ${
                selectedCategories.includes(category)
                    ? 'border border-[#60ABEF] bg-white'
                    : 'border border-black bg-white opacity-40'
            }`}
        >
            <Text
                className={`${selectedCategories.includes(category) ? 'text-gray-900' : 'text-black'} mr-1 font-inter text-xs`}
            >
                {selectedCategories.includes(category) ? '✓' : '+'} {category}
            </Text>
        </TouchableOpacity>
    );
}
