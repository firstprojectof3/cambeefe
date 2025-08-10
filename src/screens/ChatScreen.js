// src/screens/ChatScreen.js
import React, { useRef, useState, useEffect } from 'react';
import { Platform, SafeAreaView, KeyboardAvoidingView, Keyboard, View, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ChatHeader from '../components/chat/ChatHeader';
import ChatLog from '../components/chat/ChatLog';
import ChatInput from '../components/chat/ChatInput';
import LoadingIndicator from '../components/chat/LoadingIndicator';
import { saveArchive } from '../services/storage/local';

export default function ChatScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const listRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [kb, setKb] = useState(false); // 키보드 표시 여부
    const handleOpenArchiveList = () => navigation.navigate('Archive');
    const handleReset = () => setMessages([]);

    useEffect(() => {
        const showEvt = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvt = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
        const s = Keyboard.addListener(showEvt, () => setKb(true));
        const h = Keyboard.addListener(hideEvt, () => setKb(false));
        return () => { s.remove(); h.remove(); };
    }, []);

    const handleSend = async (text) => {
        setMessages((prev) => [...prev, { sender: 'user', text }]);
        setLoading(true);
        setTimeout(() => {
            setMessages((prev) => [...prev, { sender: 'bot', text: '테스트 응답: ' + text }]);
            setLoading(false);
        }, 1200);
    };

    const handleArchive = async () => {
        if (!messages.length) return;
        const doSave = async (title = '채팅 기록') => {
            await saveArchive({ id: Date.now(), title, createdAt: Date.now(), messages });
            navigation.navigate('Archive');
        };
        if (Platform.OS === 'ios' && Alert.prompt) {
            Alert.prompt('아카이브 제목', '', [
                { text: '취소', style: 'cancel' },
                { text: '저장', onPress: (title) => doSave(title || '채팅 기록') },
            ], 'plain-text');
        } else {
            await doSave();
        }
    };

    const headerHeight = 56; // ChatHeader 대략 높이
    const kbdOffset = Platform.OS === 'ios' ? headerHeight + insets.top : 0;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={kbdOffset}>
                <ChatHeader
                    showBack={navigation.canGoBack()}
                    onBack={() => navigation.goBack()}
                    onArchive={handleArchive}
                    onOpenArchiveList={handleOpenArchiveList}
                    onReset={handleReset}
                />

                <ChatLog
                    ref={listRef}
                    messages={messages}
                    contentContainerStyle={{ paddingBottom: (kb ? 64 : 64 + insets.bottom) }}
                    keyboardShouldPersistTaps="handled"
                />

                {loading && <LoadingIndicator />}

                {/* 키보드 열릴 땐 하단 안전영역 패딩 제거 → 입력창 가림 방지 */}
                <View style={{ paddingBottom: kb ? 0 : insets.bottom, backgroundColor: '#f7f7f7' }}>
                    <ChatInput onSend={handleSend} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

