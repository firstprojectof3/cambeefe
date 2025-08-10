// src/components/dashboard/UserInfoCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UserInfoCard({ semester, status, studentId, major }) {
    return (
        <View style={s.card}>
            <Text style={s.title}>학생 정보</Text>
            <View style={s.row}>
                <Text style={s.label}>학기</Text><Text style={s.value}>{semester}</Text>
            </View>
            <View style={s.row}>
                <Text style={s.label}>상태</Text><Text style={s.value}>{status}</Text>
            </View>
            <View style={s.row}>
                <Text style={s.label}>학번</Text><Text style={s.value}>{studentId}</Text>
            </View>
            <View style={s.row}>
                <Text style={s.label}>학과</Text><Text style={s.value}>{major}</Text>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    card: { margin: 16, padding: 16, borderRadius: 16, backgroundColor: '#fff', elevation: 2 },
    title: { fontSize: 16, fontWeight: '800', marginBottom: 10 },
    row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
    label: { color: '#6b7280' },
    value: { fontWeight: '700' }
});
