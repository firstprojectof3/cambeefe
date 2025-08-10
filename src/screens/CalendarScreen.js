// src/screens/CalendarScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView, Platform, StatusBar, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderBackButton from '../components/common/HeaderBackButton';
import MonthlyCalendar from '../components/calendar/MonthlyCalendar';
import ScheduleModal from '../components/calendar/ScheduleModal';
import ScheduleCard from '../components/calendar/ScheduleCard';
import { Ionicons } from '@expo/vector-icons';

export default function CalendarScreen({ navigation }) {
    const [selected, setSelected] = useState(null);
    const [items, setItems] = useState({});
    const [editing, setEditing] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        (async () => {
            const stored = await AsyncStorage.getItem('schedules');
            if (stored) setItems(JSON.parse(stored));
        })();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('schedules', JSON.stringify(items));
    }, [items]);

    const dayList = items[selected] || [];
    const marked = selected ? { [selected]: { selected: true } } : {};
    const topInset = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0;

    const openAdd = () => { if (!selected) return; setEditing(null); setOpen(true); };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f7f7', paddingTop: topInset }}>
            <HeaderBackButton
                title="캘린더"
                onPress={() => navigation.goBack()}
                iconSize={30}                      // ✅ 아이콘 크게
                titleStyle={{ fontSize: 22 }}      // ✅ 타이틀 크게
            />

            <MonthlyCalendar onSelectDate={(d) => setSelected(d)} markedDates={marked} />

            <FlatList
                data={dayList}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 96 }}
                keyExtractor={(it) => String(it.id)}
                renderItem={({ item }) => (
                    <ScheduleCard
                        item={item}
                        onEdit={() => { setEditing(item); setOpen(true); }}
                        onDelete={() => {
                            setItems(prev => ({
                                ...prev,
                                [selected]: prev[selected].filter(x => x.id !== item.id),
                            }));
                        }}
                    />
                )}
                ListEmptyComponent={
                    selected ? (
                        <View style={{ padding: 16 }}>
                            <Text style={{ color: '#6B7280' }}>선택한 날짜에 일정이 없어요. 아래 + 버튼으로 추가해봐!</Text>
                        </View>
                    ) : (
                        <View style={{ padding: 16 }}>
                            <Text style={{ color: '#6B7280' }}>날짜를 먼저 선택해줘.</Text>
                        </View>
                    )
                }
            />

            {/* ✅ 플로팅 추가 버튼 (선택된 날짜에서만 활성) */}
            <TouchableOpacity
                onPress={openAdd}
                disabled={!selected}
                style={{
                    position: 'absolute', right: 20, bottom: 24,
                    width: 56, height: 56, borderRadius: 28,
                    backgroundColor: selected ? '#f59e0b' : '#e5e7eb',
                    alignItems: 'center', justifyContent: 'center',
                    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, elevation: 4
                }}
            >
                <Ionicons name="add" size={28} color={selected ? '#111' : '#9CA3AF'} />
            </TouchableOpacity>

            {selected && (
                <ScheduleModal
                    visible={open}
                    initial={editing}                 // null이면 추가, 객체면 수정
                    onClose={() => { setEditing(null); setOpen(false); }}
                    onSave={({ title, tag, desc }) => {
                        setItems(prev => {
                            const list = prev[selected] || [];
                            const next = editing
                                ? list.map(x => x.id === editing.id ? { ...x, title, tag, desc } : x)
                                : [...list, { id: Date.now(), title, tag, desc }];
                            return { ...prev, [selected]: next };
                        });
                        setEditing(null);
                        setOpen(false);
                    }}

                />
            )}
        </SafeAreaView>
    );
}
