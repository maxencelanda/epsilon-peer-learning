from fastapi import FastAPI, File, UploadFile, Form
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

def connnect_to_db():
    connection = pymysql.connect(host="localhost", user="root", passwd="", database="epsilonpeer2peer",cursorclass=pymysql.cursors.DictCursor)
    return connection

@app.get("/getstudents")
async def get_students():
    connection = connnect_to_db()
    with connection:
        with connection.cursor() as cursor:
            sql = "select * from apprenant"
            cursor.execute(sql)
            allStudents = cursor.fetchall()
    connection.close()
    return allStudents

@app.post("/uploadfile/")
async def create_upload_file(userId: str = Form(...), filesUpload: List[UploadFile] = File(...)):
    for fileUpload in filesUpload:
        try:
            current_path = os.path.dirname(os.path.abspath(__file__))
            print(f"{current_path}/uploadedFiles/{userId}/{fileUpload.filename}")
            if not os.path.exists(f"{current_path}/uploadedFiles/{userId}"):
                os.makedirs(f"{current_path}/uploadedFiles/{userId}") # creer dossier s'il nexiste pas, pq ca le fait pas de base pitie??????
                
            with open(f"{current_path}/uploadedFiles/{userId}/{fileUpload.filename}", "wb") as f:
                while fileToStore := fileUpload.file.read(1024 * 1024):
                    f.write(fileToStore)
                    
            connection = connnect_to_db()
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
                cursor.execute(sql, (int(userId), idPublication))
                connection.commit()
                connection.close()
        except Exception:
            return {"message": "Problème dans l'envoi du fichier"}
        finally:
            fileUpload.file.close()
    return {"message": f"Fichier {[fileUpload.filename for fileUpload in filesUpload]} uploadé avec succès"}

@app.post("/registerDB")
async def create_user(apprenant : Apprenant):
    connection = connnect_to_db()
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
            sql = "SELECT Id_Apprenant, email FROM Apprenant WHERE email = %s"
            cursor.execute(sql, (apprenant.email))
            result = cursor.fetchone()
            connection.close()
            return {"message": "reussi", "user": result}
        except Exception as e:
            return {"message": f"erreur: {str(e)}"}
    
@app.post("/login")
async def get_user(apprenant: Apprenant):
    print(apprenant)
    try:
        connection = connnect_to_db()
        with connection.cursor() as cursor:
            sql = "SELECT Id_Apprenant, email FROM Apprenant WHERE email = %s AND mdp = %s"
            cursor.execute(sql, (apprenant.email, apprenant.password))
            user = cursor.fetchone()
            print(user)
            connection.close()
        if not user:
            return {"message": "aucun utilisateur trouvé"}
        return {"message": "succes", "user": user}
    except Exception as e:
        return {"message": "erreur", "erreur": e}

@app.post("/rendus")
async def get_rendus(userId: str = Form(...)):
    print(userId)
    try:
        connection = connnect_to_db()
        with connection.cursor() as cursor:
            sql = "SELECT * FROM Rendu WHERE Id_Apprenant = %s"
            cursor.execute(sql, (userId))
            rendus = cursor.fetchall()
            print(rendus)
            connection.close()
        if not rendus:
            return {"message": "aucun rendu trouvé", "rendus": []}
        return {"message": "succes", "rendus": rendus}
    except Exception as e:
        return {"message": "erreur", "erreur": e}
