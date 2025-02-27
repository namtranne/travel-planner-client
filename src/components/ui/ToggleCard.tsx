import { Text, View } from 'react-native';
import Iconify from 'react-native-iconify';

export default function ToggleCard({ title, children }: { title: string; children: JSX.Element }) {
    return (
        <View className="bg-white p-4">
            <View className="mb-2 flex w-full flex-row">
                <Iconify icon="mingcute:down-line" />
                <Text className="text-lg font-bold">{title}</Text>{' '}
            </View>
            {children}
        </View>
    );
}
