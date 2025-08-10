// src/components/dashboard/NoticeList.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

export default function NoticeList({ items = [] }) {
    const data = items.length ? items : [
        { id: '1', title: '학사 일정 안내', date: '2025-08-10', link: 'https://www.google.com' },
        { id: '2', title: '장학금 신청 공지', date: '2025-08-12', link: 'https://www.google.com' },
    ];
    return (
        <View style={s.card}>
            <Text style={s.title}>공지사항</Text>
            {data.map(n => (
                <TouchableOpacity key={n.id} style={s.row} onPress={() => n.link && Linking.openURL(n.link)}>
                    <Text style={s.tt}>{n.title}</Text>
                    <Text style={s.dt}>{n.date}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
const s = StyleSheet.create({
    card: { margin: 16, padding: 16, borderRadius: 16, backgroundColor: '#fff', elevation: 2 },
    title: { fontSize: 16, fontWeight: '800', marginBottom: 10 },
    row: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
    tt: { fontWeight: '700', marginBottom: 4 },
    dt: { color: '#6b7280', fontSize: 12 },
});
