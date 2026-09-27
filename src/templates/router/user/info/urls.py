from fastapi import APIRouter

router = APIRouter()
_prefix = __name__.split(".", 3)[3].rsplit(".", 1)[0].replace(".", "/")


@router.get(path=f"/{_prefix}", summary=" ", tags=[_prefix.split("/", 1)[0]])
async def index():
    return {"hello": "world"}
