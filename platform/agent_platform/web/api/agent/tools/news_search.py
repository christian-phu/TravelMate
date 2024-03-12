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

async def _fetch_google_search_results(query: str, search_mode: str = "news") -> dict[str, Any]:
    """Asynchronously fetch results from Google using a specific API."""
    endpoint = f"https://google.serper.dev/{search_mode}"
    headers = {
        "X-API-KEY": settings.serp_api_key or "",
        "Content-Type": "application/json"}
    params = {"q": query}

    async with aiohttp.ClientSession() as session:
        async with session.get(
            endpoint,
            headers=headers,
            params=params
            ) as response:
            response.raise_for_status()
            return await response.json()


class NewsSearch(Tool):
    description = (
        "Search Google for current, trending, or updated information."
    )
    public_description = "Search google for information about trending news."
    arg_description = "The query argument to search for. This value is always populated and cannot be an empty string."
    image_url = "/tools/google.png"

    @staticmethod
    def available() -> bool:
        return settings.serp_api_key is not None and settings.serp_api_key != ""

    async def call(
        self, goal: str, task: str, input_str: str, *args: Any, **kwargs: Any
    ) -> StreamingResponse:
        try:
            return await self._call(goal, task, input_str, *args, **kwargs)
        except ClientResponseError:
            logger.exception("Error calling Serper API, falling back to reasoning")
            return await Reason(self.model, self.language).call(
                goal, task, input_str, *args, **kwargs
            )

    async def _call(
        self,
        goal: str,
        task: str,
        input_str: str,
        *args: Any,
        **kwargs: Any
    ) -> StreamingResponse:

        results = await _fetch_google_search_results(
            input_str,
        )

        k = 5  # Number of results to return
        snippets: List[CitedSnippet] = []
        if results.get("answerBox"):
            answer_values = []
            answer_box = results.get("answerBox", {})
            if answer_box.get("answer"):
                answer_values.append(answer_box.get("answer"))
            elif answer_box.get("snippet"):
                answer_values.append(answer_box.get("snippet").replace("\n", " "))
            elif answer_box.get("snippetHighlighted"):
                answer_values.append(", ".join(answer_box.get("snippetHighlighted")))

            if len(answer_values) > 0:
                snippets.append(
                    CitedSnippet(
                        len(snippets) + 1,
                        "\n".join(answer_values),
                        f"https://www.google.com/search?q={quote(input_str)}",
                    )
                )

        for i, result in enumerate(results["organic"][:k]):
            texts = []
            link = ""
            if "snippet" in result:
                texts.append(result["snippet"])
            if "link" in result:
                link = result["link"]
            for attribute, value in result.get("attributes", {}).items():
                texts.append(f"{attribute}: {value}.")
            snippets.append(CitedSnippet(len(snippets) + 1, "\n".join(texts), link))

        if len(snippets) == 0:
            return stream_string("No good Google Search Result was found", True)
        print(f"-----------\nSnippets: {snippets}")
        return summarize_with_sources(self.model, self.language, goal, task, snippets)
