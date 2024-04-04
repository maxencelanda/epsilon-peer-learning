from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
import mysql.connector

mydb = mysql.connector.connect(
  host="epsilonpeer2peer",
  user="",
  password=""
)

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:5173/",
    "localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

todos = [
    {
        "id": "1",
        "item": "Read a book."
    },
    {
        "id": "2",
        "item": "Cycle around town."
    }
]

@app.get("/todo", tags=["todos"])
async def read_root() -> dict:
    return {"data": todos}

@app.post("/uploadfile/")
async def create_upload_file(fileUpload: UploadFile | None = None):
    print(fileUpload)
    if not fileUpload:
        return {"message": "Aucun fichier upload"}
    return {"filename": fileUpload.filename}