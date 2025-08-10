// src/components/dashboard/BannerCard.js
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';

export default function BannerCard({ image, link }) {
    const openLink = () => {
        if (link) Linking.openURL(link);
    };

    return (
        <TouchableOpacity style={s.card} onPress={openLink} activeOpacity={0.9}>
            <Image source={image} style={s.image} resizeMode="cover" />
        </TouchableOpacity>
    );
}

const s = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 120,
    },
});
