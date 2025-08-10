// src/screens/ArchiveScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert, StyleSheet, SafeAreaView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getArchives, deleteArchive } from '../services/storage/local';
import HeaderBackButton from '../components/common/HeaderBackButton';

export default function ArchiveScreen({ navigation }) {
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const load = useCallback(async () => {
        const list = await getArchives();
        setData(list.sort((a, b) => b.createdAt - a.createdAt));
    }, []);

    useEffect(() => {
        const unsub = navigation.addListener('focus', load);
        return unsub;
    }, [navigation, load]);

    const del = (id) =>
        Alert.alert('삭제', '아카이브를 삭제할까요?', [
            { text: '취소' },
            { text: '삭제', style: 'destructive', onPress: async () => { await deleteArchive(id); load(); } },
        ]);

    const onRefresh = async () => {
        setRefreshing(true);
        await load();
        setRefreshing(false);
    };

    const Item = ({ item }) => {
        const msgCount = item.messages?.length ?? 0;
        const dateStr = new Date(item.createdAt).toLocaleString();
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('ArchivedChat', { id: item.id })}
                style={s.card}
                activeOpacity={0.8}
            >
                <View style={s.left}>
                    <Ionicons name="document-text-outline" size={22} color="#f59e0b" style={{ marginRight: 10 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={s.title} numberOfLines={1}>{item.title || '저장된 대화'}</Text>
                        <Text style={s.meta}>{dateStr} · {msgCount}개 메시지</Text>
                    </View>
                </View>
                <View style={s.right}>
                    <TouchableOpacity onPress={() => del(item.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                        <Ionicons name="trash-outline" size={20} color="#ef4444" />
                    </TouchableOpacity>
                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" style={{ marginLeft: 8 }} />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
            <HeaderBackButton
                title="아카이브 목록"
                onPress={() => navigation.goBack()}
                iconSize={30}
                titleStyle={{ fontSize: 22 }}
            />
            <FlatList
                data={data}
                keyExtractor={(i) => String(i.id)}
                renderItem={({ item }) => <Item item={item} />}
                contentContainerStyle={{ paddingVertical: 8 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListEmptyComponent={
                    <View style={{ padding: 24, alignItems: 'center' }}>
                        <Text style={{ color: '#6B7280' }}>저장된 아카이브가 없어요. 채팅에서 📦 아이콘으로 저장해봐!</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 },
    },
    left: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    right: { flexDirection: 'row', alignItems: 'center', marginLeft: 12 },
    title: { fontSize: 16, fontWeight: '800', color: '#111' },
    meta: { fontSize: 12, color: '#6B7280', marginTop: 2 },
});

