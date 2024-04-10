# Epsilon Peer-Learning

Par Maxence LANDA et Vladimir BOUSSEKEYT

# Technos

FastAPI (Python) + ReactJS

# Packages


Python:
- ```pip install uvicorn==0.28.0```
- ```pip install fastapi==0.110.0```
- ```pip install python-multipart==0.0.9```
- ```pip install pymysql```
- ```pip install pydantic```

React:

- `cd .\frontend\`
- `npm install`
- `npm run dev`

MySQL:
- Ouvrir localhost/phpmyadmin
- Importer epsilonpeer2peer.sql dans une BDD du même nom

Pour run:


- Ouvrir un terminal dans le dossier epsilon-peer-learning
- `python .\backend\main.py` ou run le script main.py dans un IDE
- Ouvrir un nouveau terminal dans le dossier epsilon-peer-learning
- `cd .\frontend\`
- `npm run dev`

# Problèmes connus et comment les régler
- Quand on va sur la page de base en front, on est loggé même si on ne l'est pas (ça créer des problèmes si on essaye d'upload)
- Solution: Logout puis se connecter/s'inscrire

- L'upload peut renvoyer une erreure tout en ayant téléchargé le fichier au bon endroit
- Solution: Un module doit être créé avec l'id 1 dans la base de donnée
