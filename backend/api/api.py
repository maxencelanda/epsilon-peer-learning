from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from pydantic import BaseModel
import pymysql

connection = pymysql.connect(host="localhost", user="root", passwd="", database="epsilonpeer2peer",cursorclass=pymysql.cursors.DictCursor)
print(f"connected successfully to {connection}")

app = FastAPI()

class 

origins = [
    "http://localhost:5173",
    "http://localhost:5173/",
    "http://localhost:5173/Register",
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

@app.post("/registerDB")
async def create_user():
    with connection:
        with connection.cursor as cursor: 
            sql = "SELECT `id` FROM `users` WHERE `email`=%s"
            cursor.execute(sql, ('webmaster@python.org',))
            result = cursor.fetchone()
            return {"message": result}