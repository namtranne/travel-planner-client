import { useState } from 'react';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Iconify from 'react-native-iconify';
import RenderHTML from 'react-native-render-html';

import RichTextInput from '../ui/RichTextInput';

const Note = ({
    initialNote,
    handleUpdateNote,
    handleDeleteNote
}: {
    initialNote: string;
    handleUpdateNote: (note: string) => void;
    handleDeleteNote: () => void;
}) => {
    const [expanded, setExpanded] = useState(false);
    const [note, setNote] = useState(initialNote);
    const { width } = useWindowDimensions();

    return (
        <View className="border-t border-gray-200 py-3">
            <View className={`rounded-lg ${expanded ? 'bg-gray-100' : ''} p-3`}>
                <View className="flex-1 flex-row items-center justify-center">
                    <View className="h-6 w-6 items-center justify-center rounded-full bg-gray-300">
                        <Iconify className="text-white" icon="fluent:note-48-filled" size={16} color="white" />
                    </View>
                    {expanded ? (
                        <RichTextInput initialContent={note} onChange={(text) => setNote(text)} />
                    ) : (
                        <TouchableOpacity className="ml-3 flex-1" onPress={() => setExpanded(true)}>
                            <RenderHTML
                                source={{ html: note || 'Add your notes here' }}
                                contentWidth={width - 50}
                                baseStyle={{
                                    fontFamily: 'Inter',
                                    fontSize: 16,
                                    color: '#6b7280',
                                    fontStyle: 'italic',
                                    lineHeight: 24
                                }}
                                tagsStyles={{
                                    p: { marginBottom: 8 },
                                    strong: { fontWeight: 'bold' },
                                    em: { fontStyle: 'italic' }
                                }}
                            />
                        </TouchableOpacity>
                    )}
                </View>
                {expanded && (
                    <View className="mt-4 flex-row items-center justify-end gap-3">
                        <TouchableOpacity>
                            <Iconify
                                className="text-[#6c757d]"
                                icon="mdi:trash-can"
                                size={24}
                                color="#6b7280"
                                onPress={() => handleDeleteNote()}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Iconify
                                className="text-[#6c757d]"
                                icon="mdi:view-grid-outline"
                                size={24}
                                color="#6b7280"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setExpanded(false)}>
                            <Iconify className="text-[#6c757d]" icon="mdi:chevron-up" size={24} color="#6b7280" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

export default Note;
