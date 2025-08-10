// src/components/chat/ChatLog.js
import React, { forwardRef } from 'react';
import { FlatList } from 'react-native';
import ChatMessage from './ChatMessage';

const ChatLog = forwardRef(({ messages }, ref) => {
    return (
        <FlatList
            ref={ref}
            data={messages}
            keyExtractor={(item, idx) => String(idx)}
            renderItem={({ item }) => <ChatMessage {...item} />}
            contentContainerStyle={{ paddingVertical: 8 }}
            onContentSizeChange={() => ref.current?.scrollToEnd({ animated: true })}
        />
    );
});
export default ChatLog;
