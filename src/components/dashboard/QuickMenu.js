// src/components/dashboard/QuickMenu.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function QuickMenu({ items = [], columns = 4 }) {
    const data = items.length ? items : [
        { key: 'calendar', label: '캘린더', icon: 'calendar-outline', onPress: () => { } },
        { key: 'chat', label: '챗봇', icon: 'chatbubble-ellipses-outline', onPress: () => { } },
        { key: 'scholar', label: '장학금', icon: 'school-outline', onPress: () => { } },
        { key: 'notice', label: '공지', icon: 'notifications-outline', onPress: () => { } },
    ];
    const basis = `${100 / columns}%`;
    return (
        <View style={s.wrap}>
            {data.map(it => (
                <TouchableOpacity key={it.key} style={[s.item, { width: basis }]} onPress={it.onPress}>
                    <View style={s.iconBox}><Ionicons name={it.icon} size={22} /></View>
                    <Text style={s.label}>{it.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
const s = StyleSheet.create({
    wrap: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 16, marginBottom: 16, backgroundColor: '#fff', borderRadius: 16, paddingVertical: 10 },
    item: { alignItems: 'center', paddingVertical: 10 },
    iconBox: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fde68a' },
    label: { marginTop: 6, fontWeight: '700' },
});
