// src/api/client.ts
import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";

// app.config.js 에서 주입될 수 있는 값(없어도 동작하도록 기본값 포함)
type Extra = {
  API_BASE_URL_DEVICE?: string;   // 실기기(폰)에서 사용할 주소: http://<맥IP>:8000
  API_BASE_URL_IOS?: string;      // iOS 시뮬레이터: 기본 127.0.0.1
  API_BASE_URL_ANDROID?: string;  // Android 에뮬레이터: 기본 10.0.2.2
};
const extra = (Constants.expoConfig?.extra ?? {}) as Extra;

function getBaseURL(): string {
  // 1) 실기기에서 테스트할 땐 이 값이 있으면 최우선 사용
  if (extra.API_BASE_URL_DEVICE) return extra.API_BASE_URL_DEVICE;

  // 2) 시뮬레이터/에뮬레이터 기본
  if (Platform.OS === "ios") {
    return extra.API_BASE_URL_IOS ?? "http://127.0.0.1:8000";
  }
  return extra.API_BASE_URL_ANDROID ?? "http://10.0.2.2:8000";
}

export const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// 디버그: 현재 베이스 URL 확인
if (__DEV__) {
  console.log("API baseURL =", api.defaults.baseURL);
}
