from fastapi import APIRouter

router = APIRouter()
_prefix = __name__.split(".", 1)[1].rsplit(".", 1)[0].replace(".", "/")


@router.get(path=f"/{_prefix}", summary=" ", tags=[_prefix.split("/", 1)[0]])
async def get_profile():
    return {"user": "用户"}
