// src/components/chat/LoadingIndicator.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function LoadingIndicator() {
    return (
        <View style={s.wrap}>
            <ActivityIndicator size="small" color="#f59e0b" />
        </View>
    );
}
const s = StyleSheet.create({
    wrap: { padding: 10, alignItems: 'flex-start', paddingHorizontal: 12 }
});
