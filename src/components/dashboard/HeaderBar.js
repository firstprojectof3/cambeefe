// src/components/dashboard/HeaderBar.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HeaderBar({ onNoti, onSettings }) {
    const topInset = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0;

    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <View style={[s.wrap, { paddingTop: 8 + topInset, paddingBottom: 10 }]}>
                <View style={s.left}>
                    <Image source={require('../../assets/cambee-logo.png')} style={s.logo} />
                    <Text style={s.tt}>CAMBEE</Text>
                </View>
                <View style={s.right}>
                    <TouchableOpacity onPress={onNoti} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                        <Ionicons name="notifications-outline" size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onSettings} style={{ marginLeft: 14 }} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                        <Ionicons name="settings-outline" size={22} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    wrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, backgroundColor: '#fff' },
    left: { flexDirection: 'row', alignItems: 'center' },
    logo: { width: 24, height: 24, marginRight: 8 },
    tt: { fontSize: 18, fontWeight: '800' },
    right: { flexDirection: 'row', alignItems: 'center' },
});

