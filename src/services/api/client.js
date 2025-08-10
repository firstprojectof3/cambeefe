// src/api/client.ts
import axios from "axios";
import { Platform } from "react-native";

function getBaseURL() {
  // 에뮬레이터/시뮬레이터 기본값
  if (Platform.OS === "ios") return "http://localhost:8000";
  return "http://10.0.2.2:8000";
  // 실기기에서 테스트할 땐 위를 아래처럼 교체:
  // return "http://<Mac_IP>:8000";
}

export const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});
