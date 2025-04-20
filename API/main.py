import socket
import warnings

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

hostname=socket.gethostname()   

warnings.filterwarnings('ignore')

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from MainTool import *
from Test import *

if __name__ == '__main__':
    uvicorn.run('main:app', port=8000, host ="0.0.0.0", reload=True)