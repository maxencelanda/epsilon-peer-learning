import axios from 'axios'
import { useState } from 'react'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  
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
      console.log("user connected") // faire le context
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
      <input type="email" onChange={handleEmailChange} name="email" placeholder='Email' required/>
      <input type="password" onChange={handlePwdChange} name="pwd" placeholder='Mot de passe' required/>
      <button type="submit" onClick={handleSubmit}>Login</button>
      {loading ? <p>Loading</p>: null}
      {message ? <p>{message}</p>: null}
    </div>
  )
}
