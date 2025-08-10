// src/services/storage/local.js
import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = 'archives';
export const getArchives = async () => JSON.parse(await AsyncStorage.getItem(KEY) || '[]');
export const saveArchive = async (a) => { const list = await getArchives(); list.unshift(a); await AsyncStorage.setItem(KEY, JSON.stringify(list)); };
export const deleteArchive = async (id) => { const list = await getArchives(); await AsyncStorage.setItem(KEY, JSON.stringify(list.filter(x => x.id !== id))); };
export const getArchive = async (id) => { const list = await getArchives(); return list.find(x => x.id === id); };
