import { View } from 'react-native';

export default function LinearProgressBar({
    progress = 0,
    height = '10px',
    color = 'bg-blue-500'
}: {
    progress: number;
    height: string;
    color: string;
}) {
    // Ensure progress is between 0 and 1
    const progressWidth = Math.min(Math.max(progress, 0), 1) * 100 || 1;
    return (
        <View className="w-full bg-gray-200">
            {/* eslint-disable-next-line tailwindcss/classnames-order */}
            <View className={`h-[${height}] bg-[${color}]`} style={{ width: `${progressWidth}%` }} />
        </View>
    );
}
