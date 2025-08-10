// src/components/calendar/ScheduleCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ScheduleCard({ item, onEdit, onDelete }) {
    return (
        <View style={s.card}>
            {/* 왼쪽: 텍스트 블록 */}
            <View style={{ flex: 1 }}>
                <Text style={s.title} numberOfLines={1}>{item.title}</Text>

                {/* 태그 칩 */}
                {item.tag ? (
                    <View style={s.tagChip}>
                        <Text style={s.tagText}>#{item.tag}</Text>
                    </View>
                ) : null}

                {/* 설명 */}
                {item.desc ? (
                    <Text style={s.desc} numberOfLines={2}>{item.desc}</Text>
                ) : null}
            </View>

            {/* 오른쪽: 액션 아이콘 */}
            <View style={s.actions}>
                <TouchableOpacity onPress={onEdit} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Ionicons name="create-outline" size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Ionicons name="trash-outline" size={20} color="#ef4444" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 14,
        backgroundColor: '#fff',
        // shadow
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    title: { fontSize: 18, fontWeight: '800', color: '#111' }, // ▶ 제목 크게
    tagChip: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#f59e0b',
        backgroundColor: '#FFFBEB',
        marginTop: 6,
    },
    tagText: { fontSize: 12, fontWeight: '700', color: '#b45309' }, // ▶ 제목 대비 ~0.7배
    desc: { marginTop: 6, fontSize: 13, color: '#6B7280' }, // ▶ 더 연한 색
    actions: { marginLeft: 12, flexDirection: 'row', alignItems: 'center', columnGap: 10 },
});
