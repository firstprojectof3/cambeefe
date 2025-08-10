// src/components/chat/ChatInput.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChatInput({ onSend }) {
    const [value, setValue] = useState('');
    const PH = '#9CA3AF';

    const handleSend = () => {
        if (!value.trim()) return;
        onSend(value);
        setValue('');
    };

    return (
        <View style={s.wrap}>
            <TextInput
                style={s.input}
                value={value}
                onChangeText={setValue}
                placeholder="무엇이든지 CAMBEE에게 물어보세요 🐝"
                placeholderTextColor={PH}
                returnKeyType="send"
                onSubmitEditing={handleSend}
            />
            <TouchableOpacity onPress={handleSend} style={s.btn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="arrow-up" size={22} color="#111" />
            </TouchableOpacity>
        </View>
    );
}

const s = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 24,
        paddingHorizontal: 14,
        paddingVertical: 12,        // ✅ 높이 업
        minHeight: 48,              // ✅ 시원한 높이
        backgroundColor: '#fff',
    },
    btn: {
        marginLeft: 10,
        width: 48,                  // ✅ 아이콘 영역 키움
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f59e0b',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
});

