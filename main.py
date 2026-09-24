import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from router import register_router


app = FastAPI(
    title="栖西里电力集团API接口",
    version="1.0.0",
    docs_url=None,
    redoc_url=None,
)
app.mount(path="/assets", app=StaticFiles(directory="assets"), name="assets")
app.include_router(router=register_router())


def main():
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)


if __name__ == "__main__":
    main()
