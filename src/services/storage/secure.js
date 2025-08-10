// src/services/storage/secure.js (토큰 저장 자리)
import * as SecureStore from 'expo-secure-store';
export const setToken = (t) => SecureStore.setItemAsync('authToken', t);
export const getToken = () => SecureStore.getItemAsync('authToken');
export const clearToken = () => SecureStore.deleteItemAsync('authToken');
