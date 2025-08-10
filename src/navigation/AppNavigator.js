// src/navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';

// Screens
import OnboardingScreen from '../screens/OnboardingScreen';
import AuthScreen from '../screens/AuthScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SetupScreen from '../screens/SetupScreen';
import ChatScreen from '../screens/ChatScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ArchiveScreen from '../screens/ArchiveScreen';
import ArchivedChatScreen from '../screens/ArchivedChatScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* 진입 플로우 */}
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Setup" component={SetupScreen} />

            {/* 메인(탭: 대시보드만 표시) */}
            <Stack.Screen name="Main" component={BottomTabNavigator} />

            {/* 풀스크린(탭 숨김) */}
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Calendar" component={CalendarScreen} />
            <Stack.Screen name="Archive" component={ArchiveScreen} />
            <Stack.Screen name="ArchivedChat" component={ArchivedChatScreen} />
        </Stack.Navigator>
    );
}

