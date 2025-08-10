// src/screens/OnboardingScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function OnboardingScreen({ navigation }) {
    return (
        <View style={s.container}>
            {/* 로고 */}
            <View style={s.logoWrap}>
                <Image
                    source={require('../../assets/cambee-logo.png')}
                    style={s.logo}
                    resizeMode="contain"
                />
            </View>

            {/* 앱 이름 */}
            <Text style={s.title}>CAMBEE</Text>
            <Text style={s.subtitle}>꿀벌처럼 빠른 대학 정보 챗봇</Text>

            {/* 시작 버튼 */}
            <TouchableOpacity
                style={s.btn}
                onPress={() => navigation.replace('Auth')}
            >
                <Text style={s.btnText}>시작하기</Text>
            </TouchableOpacity>

            {/* 푸터 버전 표시 */}
            <Text style={s.version}>v1.0.0</Text>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logoWrap: {
        backgroundColor: '#fff', // 노란색 제거
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 120,
        height: 120,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#111',
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        marginTop: 6,
        marginBottom: 40,
    },
    btn: {
        backgroundColor: '#111',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 16,
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    version: {
        position: 'absolute',
        bottom: 20,
        fontSize: 12,
        color: '#aaa',
    },
});
