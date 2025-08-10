// src/components/chat/ChatMessage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChatMessage({ sender, text }) {
    const isUser = sender === 'user';
    return (
        <View style={[s.row, isUser && { justifyContent: 'flex-end' }]}>
            <View style={[
                s.bubble,
                isUser ? s.userBubble : s.botBubble
            ]}>
                <Text style={s.text}>{text}</Text>
            </View>
        </View>
    );
}
const s = StyleSheet.create({
    row: { flexDirection: 'row', marginVertical: 4, paddingHorizontal: 12 },
    bubble: { maxWidth: '75%', padding: 10, borderRadius: 12 },
    userBubble: { backgroundColor: '#f59e0b', borderTopRightRadius: 0 },
    botBubble: { backgroundColor: '#e5e7eb', borderTopLeftRadius: 0 },
    text: { fontSize: 15 }
});
