// src/api/chat.ts
import { api } from "./client";

export async function ping() {
  const { data } = await api.get("/ping");
  return data; // { status: "ok" }
}

export async function sendChat(userId: string, message: string) {
  const { data } = await api.post("/api/chat", {
    user_id: userId,
    message,
  });
  // data 예시: { reply: string }
  return data;
}
