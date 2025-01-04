import { useFonts } from 'expo-font'; // Static import
import { Slot } from 'expo-router';
import { NativeWindStyleSheet } from 'nativewind';
import { Text } from 'react-native';

import { Inter, InterItalic } from '@/assets';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter,
    'Inter-Italic': InterItalic,
  });

  if (!fontsLoaded) {
    return <Text>Loading</Text>;
  }

  return <Slot />;
}
