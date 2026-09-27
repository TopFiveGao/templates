from __future__ import annotations

import json
import traceback
from typing import TYPE_CHECKING

from .context import get_context

if TYPE_CHECKING:
    from loguru import Record

# 生产环境保留的额外字段白名单（防止 record["extra"] 里塞进不可序列化对象）
_ALLOWED_EXTRA = {"service", "env", "version", "module", "user_id", "order_no"}


def console_formatter(record: Record) -> str:
    """开发环境：带颜色，一行一条"""
    ctx = get_context()
    ctx_str = " ".join(f"{k}={v}" for k, v in ctx.items() if v and v != "-")
    record["extra"]["_context"] = ctx_str or "-"
    return (
        "<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</green> | "
        "<level>{level: <8}</level> | "
        "<magenta>{extra[_context]}</magenta> | "
        "<cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - "
        "<level>{message}</level>\n{exception}"
    )

def json_formatter(record: Record) -> str:
    """生产环境：稳定 JSON，字段固定，方便 ELK/Loki 解析"""
    ctx = get_context()
    entry = {
        "timestamp": record["time"].strftime("%Y-%m-%d %H:%M:%S.%f")[:-3],
        "level": record["level"].name,
        "message": record["message"],
        "module": record["name"],
        "function": record["function"],
        "line": record["line"],
        "process_id": record["process"].id,
        "thread_id": record["thread"].id,
        **ctx,
    }
    # 合并白名单内的 extra 字段
    for k in _ALLOWED_EXTRA:
        if k in record["extra"]:
            entry[k] = record["extra"][k]

    if record["exception"]:
        exc = record["exception"]
        entry["exception"] = "".join(
            traceback.format_exception(exc.type, exc.value, exc.traceback)
        ).rstrip()

    record["extra"]["_json"] = json.dumps(entry, ensure_ascii=False, default=str)
    return "{extra[_json]}\n"
