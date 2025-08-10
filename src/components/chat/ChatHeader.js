// src/components/chat/ChatHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChatHeader({
    showBack = false,
    onBack = () => { },
    onArchive = null,         // 저장(아카이브) 버튼
    onOpenArchiveList = null, // 📚 목록 열기
    onReset = null,           // 🔄 리셋
    title = 'Cambee Chat',
}) {
    const topInset = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0;

    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <View style={[s.wrap, { paddingTop: 8 + topInset }]}>
                <View style={s.side}>
                    {showBack ? (
                        <TouchableOpacity onPress={onBack} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                            <Ionicons name="chevron-back" size={26} />
                        </TouchableOpacity>
                    ) : null}
                </View>

                <Text style={s.title} numberOfLines={1}>{title}</Text>

                <View style={[s.side, { alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }]}>
                    {onOpenArchiveList && (
                        <TouchableOpacity onPress={onOpenArchiveList} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                            <Ionicons name="albums-outline" size={22} /> {/* 📚 목록 */}
                        </TouchableOpacity>
                    )}
                    {onReset && (
                        <TouchableOpacity onPress={onReset} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                            <Ionicons name="refresh" size={22} />        {/* 🔄 리셋 */}
                        </TouchableOpacity>
                    )}
                    {onArchive && (
                        <TouchableOpacity onPress={onArchive} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                            <Ionicons name="archive-outline" size={22} />{/* 📦 저장 */}
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    wrap: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 10, backgroundColor: '#fff' },
    side: { width: 72, minHeight: 26, justifyContent: 'center' }, // 우측에 아이콘 2~3개 들어가서 넉넉히
    title: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: '800', color: '#111' },
});


