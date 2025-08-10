// src/components/calendar/ScheduleModal.js
import React, { useState, useEffect } from 'react';
import {
    Modal, View, TextInput, TouchableOpacity, Text,
    StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView
} from 'react-native';
import TagSelector from './TagSelector';

const PH = '#9CA3AF';

export default function ScheduleModal({ visible, onClose, onSave, initial }) {
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(() => {
        setTitle(initial?.title || '');
        setTag(initial?.tag || '');
        setDesc(initial?.desc || '');
    }, [initial, visible]);

    const handleSave = () => {
        if (!title.trim()) return;
        onSave({ title: title.trim(), tag: tag.trim(), desc: desc.trim() });
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={s.overlay}>
                <SafeAreaView style={{ width: '100%' }}>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                        <View style={s.box}>
                            <Text style={s.heading}>{initial ? '일정 수정' : '일정 추가'}</Text>

                            <ScrollView
                                contentContainerStyle={{ paddingBottom: 16 }}
                                keyboardShouldPersistTaps="handled"
                            >
                                <Text style={s.label}>제목을 입력해 주세요</Text>
                                <TextInput
                                    placeholder="간단명료하게 적어줘요"
                                    placeholderTextColor={PH}
                                    value={title}
                                    onChangeText={setTitle}
                                    style={s.input}
                                />

                                <Text style={s.label}>태그를 선택해 주세요</Text>
                                <TagSelector selected={tag} onSelect={setTag} />

                                <Text style={s.label}>설명을 적어 주세요</Text>
                                <TextInput
                                    placeholder="세부 메모를 편하게 남겨줘요"
                                    placeholderTextColor={PH}
                                    value={desc}
                                    onChangeText={setDesc}
                                    style={[s.input, s.desc]}
                                    multiline
                                    textAlignVertical="top"
                                />
                            </ScrollView>

                            <View style={s.row}>
                                <TouchableOpacity onPress={onClose} style={s.btnGhost}>
                                    <Text style={s.btnGhostTx}>취소</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleSave} style={s.btn}>
                                    <Text style={s.btnTx}>저장</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </View>
        </Modal>
    );
}

const s = StyleSheet.create({
    overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: '#0006' },
    box: {
        paddingHorizontal: 16, paddingTop: 18, paddingBottom: 10,
        backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16,
    },
    heading: { fontWeight: '800', fontSize: 18, marginBottom: 14, color: '#111' }, // 제목과 입력칸 간격 ↑
    label: { fontSize: 13, color: '#6B7280', marginBottom: 6, marginTop: 8 },
    input: {
        borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12,
        padding: 12, backgroundColor: '#fff', marginBottom: 4,
    },
    desc: { height: 110 }, // 설명창 넓게
    row: {
        flexDirection: 'row', justifyContent: 'flex-end',
        marginTop: 14, paddingTop: 8, gap: 16, // 버튼 간격/위쪽 여백 ↑
        borderTopWidth: 1, borderTopColor: '#f3f4f6',
    },
    btn: {
        backgroundColor: '#f59e0b', paddingHorizontal: 18, paddingVertical: 12,
        borderRadius: 12, alignItems: 'center',
    },
    btnTx: { color: '#111', fontWeight: '800' },
    btnGhost: { paddingHorizontal: 12, paddingVertical: 12 },
    btnGhostTx: { color: '#6B7280', fontWeight: '600' },
});
