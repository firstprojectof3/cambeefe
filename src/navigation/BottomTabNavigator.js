// src/navigation/BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';

const Tab = createBottomTabNavigator();
export default function BottomTabNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
        </Tab.Navigator>
    );
}
