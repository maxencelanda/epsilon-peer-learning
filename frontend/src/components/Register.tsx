import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/AuthContext'

export default function Register () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [envoiValide, setEnvoiValide] = useState(false)
  const [message, setMessage] = useState('')

  const { user, addUser } = useContext(UserContext)
  const navigate = useNavigate();

  if (user){
    navigate('/')
  }

  useEffect(() => {
    setMessage('')
    if (password == passwordCheck && password != '') {
      setEnvoiValide(true)
    } else {
      setEnvoiValide(false)
    }
  }, [password, passwordCheck])

  async function handleSubmit (event: React.FormEvent) {
    event.preventDefault()
    const Apprenant = {
      email: email,
      password: password
    }
    if (envoiValide == true) {
      try {
        const resp = await axios.post('http://localhost:8000/registerDB', Apprenant)
        addUser(resp.data["user"])
        console.log(resp.data["user"])
        navigate('/')
      } catch (e: any) {
        if (e.response && e.response.data) {
          alert(e.response.data.detail)
          setMessage("Erreur")
        }
      }
    } else {
      setMessage("Les mots de passe ne correspondent pas")
    }
  }
  
  return (
    <div className='flex flex-col justify-center'>
      <h1>Créez un compte : </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email :</label>
        <input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label htmlFor='password'>Mot de passe :</label>
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <label htmlFor='passwordCheck'>Verification du mot de passe</label>
        <input
          type='password'
          value={passwordCheck}
          onChange={e => setPasswordCheck(e.target.value)}
          required
        />
        <button type='submit'>envoyer les données</button>
        {message ? <p>{message}</p>: null}
      </form>
    </div>
  )
}
