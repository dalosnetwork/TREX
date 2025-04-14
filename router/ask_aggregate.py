from fastapi import APIRouter, Request
from handler import handler

router = APIRouter()

@router.post("/aggregate")
async def aggregate(request: Request):
    data = await request.json()

    token1Address = data.get("token1Address")
    token1Amount = data.get("token1Amount")
    token2Address = data.get("token2Address")

    return handler.TREXHandler().aggregate(token1Address, token1Amount, token2Address)