import importlib
import pkgutil
from fastapi import APIRouter


def register_router(package_name: str = __name__) -> APIRouter:
    router = APIRouter()
    package = importlib.import_module(package_name)
    for module_info in pkgutil.walk_packages(path=package.__path__, prefix=f"{package_name}."):
        name = module_info.name
        if not name.endswith(".urls"):
            continue
        try:
            module = importlib.import_module(name)
        except ModuleNotFoundError:
            continue
        r = getattr(module, 'router', None)

        if isinstance(r, APIRouter):
            router.include_router(router=r)
    return router
