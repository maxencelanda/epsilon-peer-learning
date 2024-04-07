import { useState } from 'react'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  console.log('zebi')
  return (
    <form action='flex'>
      <label htmlFor='email'>Email :</label>
      <input type='email' id='email' />
      <label htmlFor='password'>Mot de passe :</label>
      <input type='password' />
    </form>
  )
}
