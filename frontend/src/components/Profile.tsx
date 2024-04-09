import { useContext, useEffect } from "react"
import { UserContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Profile() {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    if (!user){
        navigate('/')
    }

    return (
        <div>
            <p className="text-center text-lg">{user.email} profile</p>
            <p>Rendus:</p>

        </div>
    )
}
