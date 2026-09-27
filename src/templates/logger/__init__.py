from loguru import logger
from .config import LogConfig
from .context import bind_request_context, clear_request_context, get_context


def init_logging(**kwargs):
    """启动时初始化日志；同一进程首次调用的配置生效。"""
    kwargs.setdefault("service_name", "app")
    cfg = LogConfig(**kwargs)
    return cfg.setup()


__all__ = [
    "logger",
    "init_logging",
    "bind_request_context",
    "clear_request_context",
    "get_context",
]
