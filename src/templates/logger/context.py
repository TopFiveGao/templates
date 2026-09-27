from contextvars import ContextVar, Token
from typing import Optional, NamedTuple

# 请求级上下文，异步安全
request_id_ctx: ContextVar[str] = ContextVar("request_id", default="-")
user_id_ctx: ContextVar[Optional[str]] = ContextVar("user_id", default=None)
trace_id_ctx: ContextVar[str] = ContextVar("trace_id", default="-")


class RequestContextTokens(NamedTuple):
    """请求上下文的恢复凭证， Token """
    request_id: Token[str]
    user_id: Token[Optional[str]]
    trace_id: Token[str]


def bind_request_context(request_id: str, user_id: str | None = None, trace_id: str = "-") -> RequestContextTokens:
    """在请求入口处调用，返回 token 用于恢复"""
    t1 = request_id_ctx.set(request_id)
    t2 = user_id_ctx.set(user_id)
    t3 = trace_id_ctx.set(trace_id)
    return RequestContextTokens(request_id=t1, user_id=t2, trace_id=t3)


def clear_request_context(tokens: RequestContextTokens) -> None:
    """请求结束时恢复上下文，防止污染下一个请求"""
    request_id_ctx.reset(tokens.request_id)
    user_id_ctx.reset(tokens.user_id)
    trace_id_ctx.reset(tokens.trace_id)


def get_context() -> dict:
    """供 formatter 调用，统一取出所有上下文"""
    return {
        "request_id": request_id_ctx.get(),
        "user_id": user_id_ctx.get(),
        "trace_id": trace_id_ctx.get(),
    }
