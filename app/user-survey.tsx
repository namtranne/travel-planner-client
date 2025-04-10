import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';

import CategorySelector from '@/src/components/TagSelector/CategorySelector';
import { categoryData, initialCategories, REQUIRED_CATEGORIES } from '@/src/components/TagSelector/TagSelectorData';
import Button from '@/src/components/ui/CommonButton';
import LinearProgressBar from '@/src/components/ui/LinearProgressBar';
import { submitUserPreferences } from '@/src/services';

export default function UserSurvey() {
    const [displayedCategories, setDisplayedCategories] = useState<string[]>(initialCategories);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleContinue = async () => {
        if (selectedCategories.length < REQUIRED_CATEGORIES) {
            // ToastAndroid.show('You need to select at least 5 category', ToastAndroid.SHORT);
            Alert.alert('You need to select at least 5 tags');
        } else {
            try {
                await submitUserPreferences(selectedCategories);
            } catch (err) {
                return;
            }
            router.navigate('home-tabs/home');
        }
    };

    const handleSelectCategories = (category: string): void => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories((prev) => prev.filter((c) => c !== category));
        } else {
            setSelectedCategories((prev) => {
                prev.push(category);
                return [...prev];
            });
            const relatedCategories = categoryData[category]?.related;
            if (!relatedCategories) return;
            const index = displayedCategories.indexOf(category) + 1;
            let updatedDisplayedCategories = [...displayedCategories];
            for (const relatedCategory of relatedCategories) {
                if (displayedCategories.includes(relatedCategory)) {
                    break;
                }
                updatedDisplayedCategories = [
                    ...updatedDisplayedCategories.slice(0, index),
                    relatedCategory,
                    ...updatedDisplayedCategories.splice(index)
                ];
            }
            setDisplayedCategories(updatedDisplayedCategories);
        }
    };

    return (
        <View className="h-full w-full">
            <SafeAreaView className="w-full flex-1">
                <LinearProgressBar
                    // value={parseFloat(`${selectedCategories.length / REQUIRED_CATEGORIES}`) || parseFloat('1')}
                    progress={selectedCategories.length / REQUIRED_CATEGORIES}
                    height="10px"
                    color="#60ABEF"
                />
                <ScrollView className="flex-1">
                    <View className="mt-16 px-6">
                        <Text className="mb-2 text-start font-inter text-2xl text-black">
                            Personalize Your Experience
                        </Text>
                        <Text className="mb-8 text-start font-inter text-sm text-black opacity-40">
                            Share your travel preferences and let us create a unique travel experience for you.
                        </Text>
                    </View>
                    <View className="px-6">
                        <View className="w-full flex-row flex-wrap">
                            {displayedCategories.map((category) => (
                                <CategorySelector
                                    key={category}
                                    category={category}
                                    selectedCategories={selectedCategories}
                                    handleSelectCategories={handleSelectCategories}
                                />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <Button
                text={`Continue ${selectedCategories.length > 5 ? 5 : selectedCategories.length}/${REQUIRED_CATEGORIES}`}
                onPress={() => handleContinue()}
                additionalStyle="bg-[#60ABEF] w-full rounded-none h-16 text-lg"
            />
        </View>
    );
}
