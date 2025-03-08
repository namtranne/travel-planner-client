// components/RichTextEditor.tsx
import { useEffect, useRef, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

interface Props {
    initialContent?: string;
    onChange?: (text: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onPressInside?: () => void;
    onPressOutside?: () => void;
}

export default function RichTextInput({
    initialContent = '',
    onChange,
    onFocus,
    onBlur,
    onPressInside,
    onPressOutside
}: Props) {
    const richText = useRef<RichEditor>(null);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    return (
        <KeyboardAvoidingView className="flex-1 bg-gray-100" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Pressable
                className="flex-1"
                onPress={() => {
                    Keyboard.dismiss();
                    onPressOutside?.();
                }}
            >
                <ScrollView className="flex-1 p-4" keyboardShouldPersistTaps="handled">
                    <TouchableWithoutFeedback
                        onPress={() => {
                            onPressInside?.();
                            richText.current?.focusContentEditor();
                        }}
                    >
                        <View className="min-h-[200px] rounded-2xl bg-white p-2 shadow">
                            <RichEditor
                                ref={richText}
                                initialContentHTML={initialContent}
                                placeholder="Add your notes here"
                                onChange={onChange}
                                onFocus={() => {
                                    onFocus?.();
                                    onPressInside?.();
                                }}
                                onBlur={onBlur}
                                editorStyle={{
                                    backgroundColor: 'white',
                                    color: '#000',
                                    placeholderColor: '#888',
                                    contentCSSText: 'font-size: 16px; padding: 10px;'
                                }}
                                style={{ minHeight: 180 }}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </Pressable>

            {isKeyboardVisible && (
                <View className="absolute inset-x-0 bottom-0 border-t border-gray-300 bg-white px-2 py-1">
                    <RichToolbar
                        editor={richText}
                        actions={[
                            actions.setBold,
                            actions.setItalic,
                            actions.setUnderline,
                            actions.heading1,
                            actions.insertBulletsList,
                            actions.insertOrderedList,
                            actions.insertLink
                        ]}
                        iconTint="#000"
                        selectedIconTint="#6200ee"
                        selectedButtonStyle={{ backgroundColor: '#e0e0e0' }}
                    />
                </View>
            )}
        </KeyboardAvoidingView>
    );
}
