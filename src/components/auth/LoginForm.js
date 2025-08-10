// src/components/auth/LoginForm.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { txt, bold } from '../../styles/common';

export default function LoginForm({ onSuccess }) {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [loading, setLoading] = useState(false);
    const [focus, setFocus] = useState({ email: false, pw: false });

    const handleLogin = async () => {
        if (!email || !pw) return;
        try {
            setLoading(true);
            onSuccess?.();
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            <TextInput
                placeholder="이메일"
                placeholderTextColor="#9ca3af"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocus(p => ({ ...p, email: true }))}
                onBlur={() => setFocus(p => ({ ...p, email: false }))}
                style={[s.inp, txt, focus.email && s.inpFocus]}
            />
            <TextInput
                placeholder="비밀번호"
                placeholderTextColor="#9ca3af"
                secureTextEntry
                value={pw}
                onChangeText={setPw}
                onFocus={() => setFocus(p => ({ ...p, pw: true }))}
                onBlur={() => setFocus(p => ({ ...p, pw: false }))}
                style={[s.inp, txt, focus.pw && s.inpFocus]}
            />
            <TouchableOpacity
                style={[s.btn, loading && { opacity: 0.6 }]}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={[s.btnTx, bold]}>
                    {loading ? '로그인 중...' : '로그인'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const s = StyleSheet.create({
    inp: {
        borderWidth: 1.5,
        borderColor: '#e5e7eb',
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 14,
        marginBottom: 12,
        backgroundColor: '#fff',
        color: '#111'
    },
    inpFocus: {
        borderColor: '#f59e0b',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2
    },
    btn: {
        backgroundColor: '#111',
        padding: 14,
        borderRadius: 16,
        alignItems: 'center'
    },
    btnTx: {
        color: '#fff',
        fontWeight: '800'
    },
});
