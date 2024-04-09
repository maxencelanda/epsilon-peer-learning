from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Annotated
from pydantic import BaseModel
import os
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

@app.get("/getstudents")
async def get_students():
    with connection:
        with connection.cursor() as cursor:
            sql = "select * from apprenant"
            cursor.execute(sql)
            allStudents = cursor.fetchall()
    return allStudents

@app.post("/uploadfile/")
async def create_upload_file(filesUpload: List[UploadFile] = File(...)):
    for fileUpload in filesUpload:
        try:
            #fileToStore = await fileUpload.file.read()
            current_path = os.path.dirname(os.path.abspath(__file__))
            with open(f"{current_path}/uploadedFiles/{fileUpload.filename}", "wb") as f:
                while fileToStore := fileUpload.file.read(1024 * 1024):
                    f.write(fileToStore)
            with connection.cursor() as cursor:
                getHighestId = "SELECT MAX(Id_Publication) AS highestId FROM Publication"
                cursor.execute(getHighestId)
                highestId = cursor.fetchone()
                print(highestId, type(highestId))
                idPublication = highestId["highestId"] + 1
                sql = "INSERT INTO Publication VALUES(%s, %s, %s)"
                cursor.execute(sql, (idPublication ,fileUpload.filename, 1))
                connection.commit()
                sql = "INSERT INTO Rendu VALUES(%s, %s, 0, 0, 0)"
                cursor.execute(sql, (1, idPublication))
                connection.commit()
        except Exception:
            return {"message": "Problème dans l'envoi du fichier"}
        finally:
            fileUpload.file.close()
    return {"message": f"Fichier {[fileUpload.filename for fileUpload in filesUpload]} uploadé avec succès"}

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
    
@app.post("/login")
async def get_user(apprenant: Apprenant):
    print(apprenant)
    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM Apprenant WHERE email = %s AND mdp = %s"
            cursor.execute(sql, (apprenant.email, apprenant.password))
            user = cursor.fetchone()
            print(user)
        if not user:
            return {"message": "aucun utilisateur trouvé"}
        return {"message": "succes", "user": user}
    except Exception as e:
        return {"message": "erreur", "erreur": e}
