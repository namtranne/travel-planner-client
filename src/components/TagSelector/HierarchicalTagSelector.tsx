import type React from 'react';
import { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import Button from '../ui/CommonButton';
import CategorySelector from './CategorySelector';
import type { HierarchicalTagSelectorProps } from './TagSelectorData';
import { categoryData, initialCategories, REQUIRED_CATEGORIES } from './TagSelectorData';

const HierarchicalTagSelector: React.FC<HierarchicalTagSelectorProps> = ({ onContinue }) => {
    const [displayedCategories, setDisplayedCategories] = useState<string[]>(initialCategories);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const handleSelectCategories = (category: string): void => {
        // setSelectedCategories((prev) => {
        //     const isSelected = prev.includes(category);
        //     if (isSelected) {
        //         // Remove the category and its selections
        //         const newSelectedSubcategories = { ...selectedSubcategories };
        //         delete newSelectedSubcategories[category];
        //         setSelectedSubcategories(newSelectedSubcategories);
        //         return prev.filter((c) => c !== category);
        //     }
        //     return [...prev, category];
        // });
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

    // Update the return JSX for better scrolling
    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 px-6 py-8">
                <ScrollView>
                    <View className="w-full flex-row flex-wrap">
                        {displayedCategories.map((category) => (
                            <CategorySelector
                                category={category}
                                selectedCategories={selectedCategories}
                                handleSelectCategories={handleSelectCategories}
                            />
                        ))}
                    </View>
                </ScrollView>
                <Button
                    text={`Continue ${selectedCategories.length}/${REQUIRED_CATEGORIES}`}
                    onPress={() => onContinue(selectedCategories)}
                    additionalStyle="bg-[#60ABEF] w-[312px] rounded-full"
                />
            </View>
        </SafeAreaView>
    );
};

export default HierarchicalTagSelector;
