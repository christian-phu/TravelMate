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
