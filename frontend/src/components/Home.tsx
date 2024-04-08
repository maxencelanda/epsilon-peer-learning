import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <nav className="grid grid-cols-7 text-center mt-2">
        <Link to="/upload" className="col-start-3">Upload</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </div>
  )
}
