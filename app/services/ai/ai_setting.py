from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()  # 환경 변수 로드

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def call_openai(client, messages):
    return client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
