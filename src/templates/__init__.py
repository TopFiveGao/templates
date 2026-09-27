from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from .router import register_router
from .logger import init_logging

init_logging(
    service_name=__name__.split(".")[-1],
    log_dir="logs",
    env="dev",
    level="INFO",
    console_level="INFO",
)

app = FastAPI(
    title="栖西里电力集团API接口",
    version="1.0.0",
    docs_url=None,
    redoc_url=None,
)
app.mount(path="/assets", app=StaticFiles(directory="./src/templates/assets"), name="assets")
app.include_router(router=register_router())
