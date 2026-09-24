from fastapi import APIRouter, Request
from fastapi.openapi.docs import (
    get_swagger_ui_oauth2_redirect_html,
    get_redoc_html,
    get_swagger_ui_html
)

router = APIRouter()
_prefix = __name__.split(".", 1)[1].rsplit(".", 1)[0].replace(".", "/")


@router.get(path=f"/{_prefix}", include_in_schema=False)
async def get_docs(request: Request):
    app = request.app
    return get_swagger_ui_html(
        title=app.title,
        openapi_url=app.openapi_url if app.openapi_url else "/openapi.json",
        swagger_js_url="/assets/js/docs.js",
        swagger_css_url="/assets/css/swagger.css",
        swagger_favicon_url="/assets/img/favicon.png",
        oauth2_redirect_url=app.swagger_ui_oauth2_redirect_url
    )


@router.get(path="/redoc", include_in_schema=False)
async def get_redoc(request: Request):
    app = request.app
    return get_redoc_html(
        title=app.title,
        openapi_url=app.openapi_url if app.openapi_url else "/openapi.json",
        redoc_js_url="/assets/js/redoc.js",
        redoc_favicon_url="/assets/img/favicon.png",
    )


@router.get(path="/docs/oauth2-redirect", include_in_schema=False)
async def swagger_ui_redirect():
    return get_swagger_ui_oauth2_redirect_html()
