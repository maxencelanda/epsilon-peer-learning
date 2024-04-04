from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
import pymysql
import os

connection = pymysql.connect(host="localhost", user="root", passwd="", database="epsilonpeer2peer")
print(f"connected successfully to {connection}")

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
async def create_upload_file(fileUpload: UploadFile = File(...)):
    try:
        fileToStore = await fileUpload.read()
        current_path = os.path.dirname(os.path.abspath(__file__))
        with open(f"{current_path}/uploadedFiles/{fileUpload.filename}", "wb") as f:
            f.write(fileToStore)
    except Exception:
        return {"message": "Problème dans l'envoi du fichier"}
    finally:
        fileUpload.file.close()
    
    return {"filename": fileUpload.filename}