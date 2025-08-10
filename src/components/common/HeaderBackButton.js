// src/components/common/HeaderBackButton.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HeaderBackButton({
    title = '',
    onPress = () => { },
    iconSize = 28,                   // ✅ 사이즈 커스텀
    titleStyle = {},                // ✅ 타이틀 스타일 커스텀
}) {
    return (
        <View style={s.wrap}>
            <TouchableOpacity onPress={onPress} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="chevron-back" size={iconSize} />
            </TouchableOpacity>
            <Text style={[s.tt, titleStyle]}>{title}</Text>
            <View style={{ width: iconSize }} />
        </View>
    );
}
const s = StyleSheet.create({
    wrap: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff'
    },
    tt: { fontSize: 20, fontWeight: '800' },      // ✅ 기본 더 큼
});
