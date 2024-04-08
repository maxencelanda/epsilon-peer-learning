import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext";

export default function Home() {

  const { user, removeUser } = useContext(UserContext)

  console.log(user)

  return (
    <div>
      <nav className="grid grid-cols-7 text-center mt-2">
        <Link to="/upload" className="col-start-3">Upload</Link>
        
        {
          user ? <button onClick={removeUser}>Logout</button> : <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          </>
        }
        
      </nav>
    </div>
  )
}
