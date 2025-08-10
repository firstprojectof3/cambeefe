// src/components/dashboard/MealInfo.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MealInfo({ today, tomorrow }) {
    const t = today || ['백반(제육)', '샐러드', '국수'];
    const n = tomorrow || ['비빔밥', '치킨가스', '우동'];
    return (
        <View style={s.card}>
            <Text style={s.title}>학식</Text>
            <View style={s.row}>
                <Text style={s.head}>오늘</Text>
                <Text style={s.body}>{t.join(' · ')}</Text>
            </View>
            <View style={s.row}>
                <Text style={s.head}>내일</Text>
                <Text style={s.body}>{n.join(' · ')}</Text>
            </View>
        </View>
    );
}
const s = StyleSheet.create({
    card: { margin: 16, padding: 16, borderRadius: 16, backgroundColor: '#fff', elevation: 2 },
    title: { fontSize: 16, fontWeight: '800', marginBottom: 10 },
    row: { flexDirection: 'row', marginTop: 6 },
    head: { width: 40, color: '#6b7280' },
    body: { flex: 1, fontWeight: '700' },
});
