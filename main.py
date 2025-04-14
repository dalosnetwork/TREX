from fastapi import FastAPI
import uvicorn
from router import ask_aggregate

app = FastAPI()

app.include_router(ask_aggregate.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8041)