from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from pydantic import BaseModel
import pymysql
import pymysql.cursors
from fastapi import HTTPException

class Apprenant(BaseModel):
    email : str
    password : str

connection = pymysql.connect(host="localhost", user="root", passwd="", database="epsilonpeer2peer",cursorclass=pymysql.cursors.DictCursor)
print(f"connected successfully to {connection}")




app = FastAPI()



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

@app.get("/getstudents")
async def get_students():
    with connection:
        with connection.cursor() as cursor:
            sql = "select * from apprenant"
            cursor.execute(sql)
            allStudents = cursor.fetchall()
    return allStudents

@app.post("/uploadfile/")
async def create_upload_file(fileUpload: UploadFile | None = None):
    print(fileUpload)
    if not fileUpload:
        return {"message": "Aucun fichier upload"}
    return {"filename": fileUpload.filename}

@app.post("/registerDB")
async def create_user(apprenant : Apprenant):
    with connection.cursor() as cursor:
        sql = "select * from apprenant where email = %s"
        cursor.execute(sql, (apprenant.email,))
        result = cursor.fetchall()
        if result:
            raise HTTPException(status_code=405, detail="Compte déja existant")
        try:
            sql = "INSERT INTO apprenant (email, mdp) VALUES (%s, %s)"
            cursor.execute(sql, (apprenant.email, apprenant.password))
            connection.commit()
            return {"message": "reussi"}
        except Exception as e:
            return {"message": f"erreur: {str(e)}"}
    

