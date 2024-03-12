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

