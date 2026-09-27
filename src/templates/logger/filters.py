from __future__ import annotations

import re
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from loguru import Record

SENSITIVE_KEYS = ("password", "token", "secret", "authorization", "cookie")
MASK = "***"

# 常见敏感字段正则（如 password=xxx）
_PATTERN = re.compile(
     r"(?i)(" + "|".join(SENSITIVE_KEYS) + r")"
    r"([\"']?\s*[:=]\s*)"
    r"([\"']?)([^\"'\s,}]+)([\"']?)"
)


def mask_message(message: str) -> str:
    """对日志正文做脱敏"""
    return _PATTERN.sub(
        lambda m: f"{m.group(1)}{m.group(2)}{m.group(3)}{MASK}{m.group(5)}",
        message,
    )


def sanitize_filter(record: Record) -> bool:
    """loguru filter：返回 True 才输出"""
    record["message"] = mask_message(record["message"])
    for k in list(record["extra"].keys()):
        if any(s in k.lower() for s in SENSITIVE_KEYS):
            record["extra"][k] = MASK
    return True
