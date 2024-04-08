import axios from 'axios'
import { useState } from 'react'
import { useAuth } from '../context/useAuth'
import { Link } from 'react-router-dom'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  
  const { login } = useAuth()
  // FAIRE CONTEXT POUR ISCONNECTED

  const handleSubmit = async e => {
    const Apprenant = {
      'email': email,
      'password': password
    }
    setLoading(true)
    const resp = await axios.post("http://localhost:8000/login", Apprenant);
    setMessage(resp.data["message"])
    console.log(resp.data["user"])
    console.log(resp.data["erreur"])
    if (resp.data["user"]){
      console.log("user connected", resp.data["user"]["Id_Apprenant"], resp.data["user"]["email"])
      console.log(typeof(resp.data["user"]["Id_Apprenant"]))
      login({
        id: resp.data["user"]["Id_Apprenant"].toString(),
        email: resp.data["user"]["email"],
      })
    }
    setLoading(false)
  }

  const handleEmailChange = e => {
    setMessage(null)
    setEmail(e.target.value)
  }

  const handlePwdChange = e => {
    setMessage(null)
    setPassword(e.target.value)
  }

  return (
    <div>
      <Link to="/" className='block my-5'>Back</Link>
      <input type="email" onChange={handleEmailChange} name="email" placeholder='Email' required/>
      <input type="password" onChange={handlePwdChange} name="pwd" placeholder='Mot de passe' required/>
      <button type="submit" onClick={handleSubmit}>Login</button>
      {loading ? <p>Loading</p>: null}
      {message ? <p>{message}</p>: null}
    </div>
  )
}
