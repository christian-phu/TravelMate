from typing import Any, Optional, Type

from langchain_community.chat_models import ChatOpenAI
from pydantic import Field

from agent_platform.schemas.agent import LLM_Model, ModelSettings
from agent_platform.schemas.user import UserBase
from agent_platform.settings import Settings


class WrappedChatOpenAI(ChatOpenAI):
    client: Any = Field(
        default=None,
        description="Meta private value but mypy will complain its missing",
    )
    max_tokens: int
    model_name: LLM_Model = Field(alias="model")


WrappedChat = WrappedChatOpenAI


def create_model(
    settings: Settings,
    model_settings: ModelSettings,
    user: UserBase,
    streaming: bool = False,
    force_model: Optional[LLM_Model] = None,
) -> WrappedChat:

    llm_model = force_model or model_settings.model
    model: Type[WrappedChat] = WrappedChatOpenAI
    kwargs = {
        "openai_api_base": settings.openai_api_base,
        "openai_api_key": model_settings.custom_api_key or settings.openai_api_key,
        "temperature": model_settings.temperature,
        "model": llm_model,
        "max_tokens": model_settings.max_tokens,
        "streaming": streaming,
        "max_retries": 5,
        "model_kwargs": {"user": user.email},
    }

    return model(**kwargs)
