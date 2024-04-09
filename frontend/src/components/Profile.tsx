import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Profile() {
    const traite = ["Non traité", "Non validé", "Validé"]

    const [rendus, setRendus] = useState([])

    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user){
            navigate('/')
            return
        }

        const formData = new FormData();
        formData.append("userId", user.Id_Apprenant);

        axios.post('http://localhost:8000/rendus', formData)
          .then(function (response) {
            console.log(response.data);
            setRendus(response.data["rendus"])
          })
          .catch(function (error) {
            console.log(error);
          });
    }, [])

    return (
        <div>
            <p className="text-center text-lg">{user ? user.email : null} profile</p>
            <p>Rendus:</p>
            {
                rendus.length == 0 ? <p>Aucun rendu</p>
                :
                rendus.map((data, idx) => (
                    <div className="mt-5 border" key={idx}>
                        <p>Rendu {idx+1} (Publication ID: {data["Id_Publication"]})</p>
                        <p>Status 1: {traite[data["statut1"]]}</p>
                        <p>Status 2: {traite[data["statut2"]]}</p>
                        <p>Status 3: {traite[data["statut3"]]}</p>
                    </div>
                ))
            }
        </div>
    )
}
