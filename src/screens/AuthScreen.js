// src/screens/AuthScreen.js
import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LoginForm from '../components/auth/LoginForm';

export default function AuthScreen({ navigation }) {
    return (
        <View style={s.wrap}>
            <StatusBar style="dark" backgroundColor="#fff" />
            <View style={s.header}>
                <Image source={require('../../assets/cambee-logo.png')} style={s.logo} />
                <Text style={s.title}>CAMBEE</Text>
            </View>

            <LoginForm onSuccess={() => navigation.replace('Main')} />

            <TouchableOpacity style={s.sub} onPress={() => navigation.navigate('Register')}>
                <Text style={s.link}>회원가입</Text>
            </TouchableOpacity>
        </View>
    );
}

const s = StyleSheet.create({
    wrap: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
    header: { alignItems: 'center', marginBottom: 24, backgroundColor: '#fff' },
    logo: { width: 80, height: 80, marginBottom: 8, borderRadius: 20, backgroundColor: '#f3f4f6' },
    title: { fontSize: 24, fontWeight: '800', color: '#111' },
    sub: { marginTop: 16, alignItems: 'center' },
    link: { color: '#111', fontWeight: '800', textDecorationLine: 'underline' },
});
