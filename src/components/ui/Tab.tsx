import { TouchableOpacity, View } from 'react-native';

export default function Tab({
    items,
    selectedIndex,
    setSelectedIndex,
    selectedTextColor
}: {
    items: string[];
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
    selectedTextColor: string;
}) {
    return (
        <View className="flex w-full flex-row">
            {items.map((item, index) => {
                return (
                    <TouchableOpacity
                        // eslint-disable-next-line tailwindcss/no-custom-classname, tailwindcss/classnames-order
                        className={`flex-1 text-center font-inter text-sm text-white p-2 rounded-t-lg ${
                            index === selectedIndex ? `bg-white  text-[${selectedTextColor}]` : ''
                        }`}
                        onPress={() => setSelectedIndex(index)}
                    >
                        {item}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
