import axios from 'axios'
import { useState } from 'react'

export default function Register () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  console.log(email)
  async function register (e: React.FormEvent) {
    const formData = new FormData()
    const headers = { '': '' }
    const resp = await axios.post(
      'http://localhost:8000/registerDB',
      formData,
      headers
    )
    console.log(resp.data['message'])
  }

  return (
    <div className='flex flex-col justify-center'>
      <label htmlFor='email'>Email :</label>
      <input
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <label htmlFor='password'>Mot de passe :</label>
      <input type='password' name='password' />
      <label htmlFor='passwordCheck'>Verification du mot de passe</label>
      <input type='password' />
      <button type='submit' onClick={register}>
        aaaaaaaaaaaaaaa
      </button>
    </div>
  )
}
