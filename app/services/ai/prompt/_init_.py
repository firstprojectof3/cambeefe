# services/ai/prompt_builder/__init__.py
from .food_prompt import build_food_prompt
from .scholarship_prompt import build_scholarship_prompt
from .graduation_prompt import build_graduation_prompt
from .prompt_builder import build_generic_prompt

def build_prompt(user, message):
    if "식단" or "학식" in message:
        return build_food_prompt(user, message)
    elif "장학금" in message:
        return build_scholarship_prompt(user, message)
    elif "졸업" or "남은 졸업 학점" or "졸업 학점" in message:
        return build_graduation_prompt(user, message)
    return build_generic_prompt(user, message)
