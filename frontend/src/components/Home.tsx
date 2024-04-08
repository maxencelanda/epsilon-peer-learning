import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Home() {

  const { user } = useAuth()

  return (
    <div>
      <nav className="grid grid-cols-7 text-center mt-2">
        <Link to="/upload" className="col-start-3">Upload</Link>
        {
          user ? null : <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          </>
        }
        
      </nav>
    </div>
  )
}
