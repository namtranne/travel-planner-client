import { Inter, InterItalic } from 'assets/fonts'; // Assuming you can import the fonts directly if possible
import { useFonts } from 'expo-font'; // Static import
import { Slot } from 'expo-router';
import { Text } from 'react-native';

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
