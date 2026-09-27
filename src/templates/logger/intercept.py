import logging
from loguru import logger


class InterceptHandler(logging.Handler):
    """把标准库 logging 的记录转发给 loguru"""

    def emit(self, record: logging.LogRecord):
        try:
            level = logger.level(record.levelname).name
        except ValueError:
            level = record.levelno

        # 向上找到真正调用日志的栈帧，保证 filename/line 正确
        frame, depth = logging.currentframe(), 0
        while frame and (depth == 0 or frame.f_code.co_filename == logging.__file__):
            frame = frame.f_back
            depth += 1

        logger.opt(depth=depth, exception=record.exc_info).log(
            level, record.getMessage()
        )


def intercept_std_logging(level: int = logging.NOTSET):
    """收编标准库 logging"""
    logging.basicConfig(handlers=[InterceptHandler()], level=level, force=True)

    # 重点收编的三方库，可按需扩展
    for name in (
        "uvicorn",
        "uvicorn.access",
        "uvicorn.error",
        "fastapi",
        "sqlalchemy.engine",
        "httpx",
        "celery",
    ):
        _logger = logging.getLogger(name)
        _logger.handlers = []
        _logger.setLevel(level)
        _logger.propagate = True
