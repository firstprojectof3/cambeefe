// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import {
    View, TextInput, TouchableOpacity, Text, StyleSheet,
    Alert, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PH = '#9CA3AF'; // light gray

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [name, setName] = useState('');
    const [school, setSchool] = useState('');
    const [dept, setDept] = useState('');
    const [year, setYear] = useState('');
    const [studentId, setStudentId] = useState('');

    const valid = email.trim() && pw.length >= 6 && name && school && dept && year && studentId;

    const submit = async () => {
        if (!valid) {
            Alert.alert('입력 확인', '모든 항목을 채워줄래? (비밀번호는 6자 이상이 좋아)');
            return;
        }
        // TODO: 회원가입 API
        navigation.navigate('Setup');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* 상단 여백 + 뒤로가기 */}
            <View style={s.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Auth')} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Ionicons name="chevron-back" size={26} />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                    contentContainerStyle={s.scroll}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                >
                    {/* 인사말 */}
                    <Text style={s.hello}>🐝 CAMBEE에 온 걸 환영해요!</Text>

                    {/* 필드들 */}
                    <View style={s.group}>
                        <Text style={s.label}>이름을 입력해주세요</Text>
                        <TextInput
                            placeholder="편하게 본인 이름을 적어줘요"
                            placeholderTextColor={PH}
                            value={name}
                            onChangeText={setName}
                            style={s.inp}
                        />
                    </View>

                    <View style={s.group}>
                        <Text style={s.label}>학교를 입력해주세요</Text>
                        <TextInput
                            placeholder="예: CAMBEE대학교"
                            placeholderTextColor={PH}
                            value={school}
                            onChangeText={setSchool}
                            style={s.inp}
                        />
                    </View>

                    <View style={s.group}>
                        <Text style={s.label}>학과를 입력해주세요</Text>
                        <TextInput
                            placeholder="예: 컴퓨터공학과"
                            placeholderTextColor={PH}
                            value={dept}
                            onChangeText={setDept}
                            style={s.inp}
                        />
                    </View>

                    <View style={s.row}>
                        <View style={[s.group, { flex: 0.7, marginRight: 8 }]}>
                            <Text style={s.label}>학년을 입력해주세요</Text>
                            <TextInput
                                placeholder="예: 3"
                                placeholderTextColor={PH}
                                value={year}
                                onChangeText={setYear}
                                keyboardType="number-pad"
                                style={s.inp}
                            />
                        </View>
                        <View style={[s.group, { flex: 1, marginLeft: 8 }]}>
                            <Text style={s.label}>학번을 입력해주세요</Text>
                            <TextInput
                                placeholder="유효한 학번을 적어주세요"
                                placeholderTextColor={PH}
                                value={studentId}
                                onChangeText={setStudentId}
                                keyboardType="number-pad"
                                style={s.inp}
                            />
                        </View>
                    </View>

                    <View style={s.group}>
                        <Text style={s.label}>이메일을 입력해주세요</Text>
                        <TextInput
                            placeholder="자주 쓰는 이메일이면 더 좋아요"
                            placeholderTextColor={PH}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            style={s.inp}
                        />
                    </View>

                    <View style={s.group}>
                        <Text style={s.label}>비밀번호를 입력해주세요 (6자 이상)</Text>
                        <TextInput
                            placeholder="안전하게 6자 이상으로 부탁해요"
                            placeholderTextColor={PH}
                            value={pw}
                            onChangeText={setPw}
                            secureTextEntry
                            style={s.inp}
                        />
                    </View>

                    <TouchableOpacity style={[s.btn, !valid && { opacity: 0.5 }]} onPress={submit} disabled={!valid}>
                        <Text style={s.btnTx}>회원가입</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    header: {
        paddingHorizontal: 14,
        paddingTop: 4,     // 상단 여백 확보
        paddingBottom: 6,
        backgroundColor: '#fff',
    },
    scroll: {
        paddingHorizontal: 20,
        paddingTop: 8,     // 본문 위쪽 여백 ↑
        paddingBottom: 20, // 하단 과도한 여백 ↓
    },
    hello: { fontSize: 22, fontWeight: '800', marginBottom: 18, color: '#111' },
    group: { marginBottom: 12 },
    label: { fontSize: 14, color: '#6B7280', marginBottom: 6 },
    inp: {
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        padding: 14,
        backgroundColor: '#fff',
    },
    row: { flexDirection: 'row' },
    btn: {
        marginTop: 14,
        backgroundColor: '#f59e0b',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    btnTx: { color: '#111', fontWeight: '800' },
});


