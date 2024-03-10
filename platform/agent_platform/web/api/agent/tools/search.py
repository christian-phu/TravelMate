from typing import Any, List
from urllib.parse import quote

from agent_platform.settings import settings
from agent_platform.web.api.agent.stream_mock import stream_string
from agent_platform.web.api.agent.tools.reason import Reason
from agent_platform.web.api.agent.tools.tool import Tool
from agent_platform.web.api.agent.tools.utils import (
    CitedSnippet,
    summarize_with_sources,
)

import aiohttp
from aiohttp import ClientResponseError
from fastapi.responses import StreamingResponse
from loguru import logger



async def fetch_google_search_results(query: str, search_mode: str = "search") -> dict[str, Any]:
    """Asynchronously fetch results from Google using a specific API."""
    endpoint = f"https://google.serper.dev/{search_mode}"
    headers = {
        "X-API-KEY": settings.serp_api_key or "",
        "Content-Type": "application/json"}
    params = {"q": query}

    async with aiohttp.ClientSession() as session:
        response = await session.post(
            endpoint,
            headers=headers,
            params=params
            )
        response.raise_for_status()
        return await response.json()


class Search(Tool):
    description = (
        "Utilize Google to conduct concise and current searches on fundamental queries about public data, "
        "current events, and individuals.\n"
    )
    public_description = "Utilize Google to find details on recent happenings."
    rg_description = "The query argument to search for. Should be a non-empty string."
    image_url = "/tools/google.png"

    @staticmethod
    def available() -> bool:
        """Determines if the tool can be accessed based on the API Key."""
        return bool(settings.serp_api_key)
    async def execute_search(
        self,
        goal: str, task: str, input_str: str,
        *args: Any, **kwargs: Any
    ) -> StreamingResponse:

        try:
            search_results = await fetch_google_search_results(input_str)
            return await self.process_results(goal, task, input_str, search_results)
        except ClientResponseError:
            logger.exception("Google search failed. Using reasoning fallback.")
            return await Reason(self.model, self.language).call(goal, task, input_str, *args, **kwargs)

    async def process_results(
        self,
        goal: str,
        task: str,
        query: str,
        results: dict[str, Any]
    ) -> StreamingResponse:

        snippets = self.compile_snippets(query, results)
        if snippets:
            return summarize_with_sources(self.model, self.language, goal, task, snippets)
        else:
            return stream_string("No valuable Google Search Result found.", True)

    def compile_snippets(self, query: str, results: dict[str, Any]) -> List[CitedSnippet]:
        snippets = []

        answer_box = self.parse_answer_box(results.get("answerBox", {}), query)
        if answer_box:
            snippets.append(answer_box)

        for i, result in enumerate(results.get("organic", [])[:10]):
            snippet = self.formulate_snippet(result)
            if snippet:
                snippets.append(
                    CitedSnippet(
                        i + 1,
                        "\\n".join(snippet['texts']),
                        snippet['link']
                        )
                    )
        return snippets

    @staticmethod
    def parse_answer_box(answer_box: dict, query: str) -> CitedSnippet:
        answer_values = []
        if answer := answer_box.get("answer") or answer_box.get("snippet"):
            answer_values.append(answer.replace("\\n", " "))
        elif snippets := answer_box.get("snippetHighlighted"):
            answer_values.append(", ".join(snippets))
        if answer_values:
            return CitedSnippet(
                1,
                "\\n".join(answer_values),
                f"<https://www.google.com/search?q={quote(query)}>"
            )

    @staticmethod
    def formulate_snippet(result: dict) -> dict:
        texts, link = [], result.get("link", "")
        if snippet := result.get("snippet"):
            texts.append(snippet)

        for attribute, value in result.get("attributes", {}).items():
            texts.append(f"{attribute}: {value}.")

        return {'texts': texts, 'link': link}

    async def call(
        self,
        goal: str, task: str, input_str: str,
        *args: Any, **kwargs: Any
    ) -> StreamingResponse:
        return await self.execute_search(goal, task, input_str, *args, **kwargs)
