// src/components/calendar/TagSelector.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TAGS = [
    { label: '과제', color: '#3B82F6', bg: '#DBEAFE' },
    { label: '시험', color: '#EF4444', bg: '#FEE2E2' },
    { label: '약속', color: '#10B981', bg: '#D1FAE5' },
    { label: '모임', color: '#8B5CF6', bg: '#EDE9FE' },
    { label: '기타', color: '#6B7280', bg: '#F3F4F6' },
];

export default function TagSelector({ selected, onSelect }) {
    return (
        <View style={s.wrap}>
            {TAGS.map((tag) => {
                const isActive = selected === tag.label;
                return (
                    <TouchableOpacity
                        key={tag.label}
                        onPress={() => onSelect(tag.label)}
                        style={[
                            s.tagChip,
                            { borderColor: tag.color, backgroundColor: isActive ? tag.bg : '#fff' },
                        ]}
                    >
                        <Text
                            style={[
                                s.tagText,
                                { color: isActive ? tag.color : '#6B7280' },
                            ]}
                        >
                            #{tag.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const s = StyleSheet.create({
    wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    tagChip: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        borderWidth: 1,
    },
    tagText: { fontSize: 12, fontWeight: '600' },
});
