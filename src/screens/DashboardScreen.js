// src/screens/DashboardScreen.js (BannerCard 테스트)
import React from 'react';
import { View, ScrollView } from 'react-native';
import HeaderBar from '../components/dashboard/HeaderBar';
import UserInfoCard from '../components/dashboard/UserInfoCard';
import BannerCard from '../components/dashboard/BannerCard';
import QuickMenu from '../components/dashboard/QuickMenu';
import NoticeList from '../components/dashboard/NoticeList';
import MealInfo from '../components/dashboard/MealInfo';

export default function DashboardScreen({ navigation }) {
    const user = { semester: '2학년 1학기', status: '재학', studentId: '2023XXXX', major: '컴퓨터공학과' };

    return (
        <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
            <HeaderBar
                onNoti={() => navigation.navigate('Notifications')}
                onSettings={() => navigation.navigate('Settings')}
            />
            <ScrollView>
                <UserInfoCard {...user} />
                <BannerCard
                    image={require('../assets/sample-banner.jpg')} // 테스트용 배너
                    link="https://www.google.com"
                />
                <QuickMenu
                    items={[
                        { key: 'calendar', label: '캘린더', icon: 'calendar-outline', onPress: () => navigation.navigate('Calendar') },
                        { key: 'chat', label: '챗봇', icon: 'chatbubble-ellipses-outline', onPress: () => navigation.navigate('Chat') },
                        { key: 'scholar', label: '장학금', icon: 'school-outline', onPress: () => {/* 외부링크 or 내부 */ } },
                        { key: 'notice', label: '공지', icon: 'notifications-outline', onPress: () => {/* 공지 스크린 */ } },
                    ]}
                    columns={4}
                />
                <NoticeList />
                <MealInfo />
            </ScrollView>
        </View>
    );
}
