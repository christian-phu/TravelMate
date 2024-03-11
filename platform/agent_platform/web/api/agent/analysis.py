from typing import Dict

from pydantic import BaseModel, validator


class AnalysisArguments(BaseModel):
    reasoning: str
    arg: str


class Analysis(AnalysisArguments):
    action: str

    @validator("action")
    def action_must_be_valid_tool(cls, v: str) -> str:
        from agent_platform.web.api.agent.tools.tools import get_available_tools_names

        if v not in get_available_tools_names():
            raise ValueError(f"Analysis action must be one of {get_available_tools_names()}")
        return v

    @validator("action")
    def search_action_must_have_arg(cls, v: str, values: Dict[str, str]) -> str:
        from agent_platform.web.api.agent.tools.search import Search
        from agent_platform.web.api.agent.tools.tools import get_tool_name

        if v == get_tool_name(Search) and not values["arg"]:
            raise ValueError("Search action must have an argument")
        return v

    @classmethod
    def get_default_analysis(cls, task: str) -> "Analysis":
        from agent_platform.web.api.agent.tools.tools import get_default_tool_name

        return cls(
            reasoning="Hmm... I need to do something",
            action=get_default_tool_name(),
            arg=task,
        )
