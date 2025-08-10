// src/screens/ArchivedChatScreen.js
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getArchive } from '../services/storage/local';
import ChatLog from '../components/chat/ChatLog';
import HeaderBackButton from '../components/common/HeaderBackButton';

export default function ArchivedChatScreen({ route, navigation }) {
    const { id } = route.params;
    const [arc, setArc] = useState(null);
    const ref = useRef(null);
    const topInset = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0;

    useEffect(() => {
        (async () => setArc(await getArchive(id)))();
    }, [id]);

    if (!arc) return <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f7f7' }} />;

    const savedAt = arc.createdAt ? new Date(arc.createdAt) : null;
    const meta = savedAt
        ? `${savedAt.toLocaleString()} · ${arc.messages?.length || 0}개 메시지`
        : `${arc.messages?.length || 0}개 메시지`;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f7f7', paddingTop: topInset }}>
            <HeaderBackButton
                title="아카이브"
                onPress={() => navigation.goBack()}
                iconSize={30}
                titleStyle={{ fontSize: 22 }}
            />

            {/* 타이틀 카드 */}
            <View style={s.headerCard}>
                <View style={s.titleRow}>
                    <Ionicons name="document-text-outline" size={20} color="#f59e0b" style={{ marginRight: 6 }} />
                    <Text style={s.title} numberOfLines={2}>{arc.title || '저장된 대화'}</Text>
                </View>
                <Text style={s.meta}>{meta}</Text>
            </View>

            <ChatLog
                ref={ref}
                messages={arc.messages || []}
                contentContainerStyle={{ paddingBottom: 64, paddingHorizontal: 12 }}
                keyboardShouldPersistTaps="handled"
            />
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    headerCard: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    title: { fontSize: 18, fontWeight: '800', color: '#111', flexShrink: 1 },
    meta: { fontSize: 12, color: '#6B7280' },
});

