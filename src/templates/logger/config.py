import sys
from pathlib import Path
from loguru import logger

from .formatters import console_formatter, json_formatter
from .filters import sanitize_filter
from .intercept import intercept_std_logging

_configured = False


class LogConfig:
    def __init__(
        self,
        service_name: str,
        log_dir: str = "logs",
        env: str = "dev",
        level: str = "INFO",
        console_level: str = "INFO",
    ):
        self.service_name = service_name
        self.log_dir = Path(log_dir)
        self.env = env
        self.level = level
        self.console_level = console_level
        self._initialized = False

    def setup(self):
        """首次调用配置进程级日志；后续调用复用现有配置。"""
        global _configured
        if self._initialized or _configured:  # 跨实例幂等，避免重复添加 handler
            return logger

        # 在移除已有输出之前检查级别，配置错误时保留原日志能力。
        logger.level(self.level)
        logger.level(self.console_level)
        self.log_dir.mkdir(parents=True, exist_ok=True)

        logger.remove()  # 移除默认 handler

        # 1. 控制台 handler
        logger.add(
            sys.stdout,
            level=self.console_level,
            colorize=self.env != "prod",
            format=console_formatter if self.env != "prod" else json_formatter,
            filter=sanitize_filter,
            backtrace=False,
            diagnose=False,
        )

        # 2. 全量文件 handler（异步、轮转、压缩、脱敏）
        logger.add(
            self.log_dir / "app_{time:YYYY-MM-DD}.log",
            level=self.level,
            rotation="00:00",
            retention="30 days",
            compression="zip",
            enqueue=True,          # 队列写入；独立 worker 应使用独立文件或集中收集
            encoding="utf-8",
            format=json_formatter,
            filter=sanitize_filter,
            backtrace=False,
            diagnose=False,
        )

        # 3. 错误单独分流，方便告警/快速排查
        logger.add(
            self.log_dir / "error_{time:YYYY-MM-DD}.log",
            level="ERROR",
            rotation="00:00",
            retention="90 days",
            compression="zip",
            enqueue=True,
            encoding="utf-8",
            format=json_formatter,
            filter=sanitize_filter,
            backtrace=False,
            diagnose=False,
        )

        # 4. 全局 bind 服务信息
        logger.configure(
            extra={
                "service": self.service_name,
                "env": self.env,
            }
        )

        # 5. 收编标准库
        intercept_std_logging()

        self._initialized = True
        _configured = True
        return logger
