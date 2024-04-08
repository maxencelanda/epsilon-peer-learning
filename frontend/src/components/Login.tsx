import { useState } from 'react'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  
  const handleSubmit = async e => {
    console.log(email, password)
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
      <input type="email" onChange={handleEmailChange} name="email" required/>
      <input type="password" onChange={handlePwdChange} name="pwd" required/>
      <button type="submit" onClick={handleSubmit}>Login</button>
      {loading ? <p>Loading</p>: null}
      {message ? <p>{message}</p>: null}
    </div>
  )
}
