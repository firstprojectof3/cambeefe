// src/components/calendar/MonthlyCalendar.js
import React from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';

// 🇰🇷 한국어 로케일 설정
LocaleConfig.locales['ko'] = {
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: '오늘',
};
LocaleConfig.defaultLocale = 'ko';

export default function MonthlyCalendar({ onSelectDate, markedDates }) {
    const today = new Date().toISOString().split('T')[0];
    const isTodaySelected = !!markedDates?.[today]?.selected;

    const todayMark = isTodaySelected
        ? {
            ...markedDates?.[today],
            customStyles: {
                container: {
                    backgroundColor: '#f59e0b', // 선택 배경 유지
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: '#fcd34d',     // 오늘 테두리로 강조
                },
                text: { color: '#fff', fontWeight: '700' },
            },
        }
        : {
            ...(markedDates?.[today] || {}),
            customStyles: {
                container: {
                    backgroundColor: '#fde68a', // 오늘만: 연노랑 배경
                    borderRadius: 20,
                },
                text: { color: '#b45309', fontWeight: '700' },
            },
        };

    return (
        <Calendar
            onDayPress={(day) => onSelectDate(day.dateString)}
            markedDates={{ ...(markedDates || {}), [today]: todayMark }}
            markingType="custom"
            theme={{
                todayTextColor: '#f59e0b',           // markingType=custom일 땐 보조역할
                selectedDayBackgroundColor: '#f59e0b',
                arrowColor: '#f59e0b',
                textDayFontWeight: '500',
                textMonthFontWeight: '700',
                textDayHeaderFontWeight: '600',
            }}
        />
    );
}

