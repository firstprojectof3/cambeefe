// src/api/client.ts
import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";

/**
 * 우선순위:
 * 1) 실기기(폰) 테스트용 .env / app.config.js 에서 주입된 값
 * 2) (없으면) 호니 맥 IP 고정값: 172.30.1.56:8000
 * 3) (시뮬/에뮬 전환 시) iOS: 127.0.0.1, Android: 10.0.2.2
 *
 * 백엔드 실행은 반드시 외부 바인딩:
 * python3 -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
 */

type Extra = {
  API_BASE_URL_DEVICE?: string;   // 실기기: http://<Mac_IP>:8000
  API_BASE_URL_IOS?: string;      // iOS 시뮬레이터
  API_BASE_URL_ANDROID?: string;  // Android 에뮬레이터
};

const extra = (Constants.expoConfig?.extra ?? {}) as Extra;

// 호니 맥 IP (실기기 기본)
const DEFAULT_DEVICE_BASE = "http://172.30.1.56:8000";

function getBaseURL(): string {
  // 1) .env/app.config.js 에서 주입된 실기기 주소가 있으면 최우선
  if (extra.API_BASE_URL_DEVICE) return extra.API_BASE_URL_DEVICE;

  // 2) 기본은 호니 맥 IP로 고정 (실기기 테스트 편의)
  const deviceBase = DEFAULT_DEVICE_BASE;

  // 3) 만약 시뮬레이터/에뮬레이터로 바꿔 테스트한다면,
  //    아래 두 줄 중 하나로 교체해서 사용:
  // return Platform.OS === "ios"
  //   ? (extra.API_BASE_URL_IOS ?? "http://127.0.0.1:8000")
  //   : (extra.API_BASE_URL_ANDROID ?? "http://10.0.2.2:8000");

  return deviceBase;
}

export const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// 디버그: 현재 베이스 URL 확인
if (__DEV__) {
  // eslint-disable-next-line no-console
  console.log("API baseURL =", api.defaults.baseURL);
}
