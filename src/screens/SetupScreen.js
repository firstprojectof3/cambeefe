// src/screens/SetupScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// TODO: 말투/관심사 선택 UI 추후 확장
export default function SetupScreen({ navigation }) {
    const [stylePicked, setStylePicked] = useState('friendly');
    const complete = async () => { /* TODO: 저장 */ navigation.replace('Main'); };
    return (
        <View style={s.wrap}>
            <Text style={s.tt}>초기 설정</Text>
            <View style={s.row}>
                <TouchableOpacity style={[s.chip, stylePicked === 'friendly' && s.active]} onPress={() => setStylePicked('friendly')}>
                    <Text>친근</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[s.chip, stylePicked === 'formal' && s.active]} onPress={() => setStylePicked('formal')}>
                    <Text>정중</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={s.btn} onPress={complete}><Text style={s.btnTx}>완료</Text></TouchableOpacity>
        </View>
    );
}
const s = StyleSheet.create({
    wrap: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
    tt: { fontSize: 22, fontWeight: '800', marginBottom: 16 },
    row: { flexDirection: 'row', gap: 8, marginBottom: 16 },
    chip: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 999, paddingVertical: 10, paddingHorizontal: 14 },
    active: { backgroundColor: '#fde68a' },
    btn: { backgroundColor: '#111', padding: 14, borderRadius: 12, alignItems: 'center' },
    btnTx: { color: '#fff', fontWeight: '800' }
});
