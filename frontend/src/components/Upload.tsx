import axios from "axios";
import { useContext, useState } from "react"
import { UserContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Upload() {

  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState(null)

  const { user } = useContext(UserContext)

  const handleSubmit = async e => {
    if (file != null){
      const formData = new FormData();

      formData.append("userId", user.id);
      for (let i = 0; i < file.length; i++){
        formData.append("filesUpload", file[i]);
      }
      console.log(formData.get("userId"))
      const headers = {'Content-Type': "multipart/form-data"};
      setUploading(true)
      const msg = await axios.post("http://localhost:8000/uploadfile",formData, headers);
      setUploading(false)
      setMessage(msg.data["message"])
    } else {
      console.log("No file uploaded")
    }
  }

  const handleChange = e => {
    setMessage(null)
    setFile(e.target.files)
  }

  return (
    <div>
      {
      user ? 
      <>
        <input type="file" multiple onChange={handleChange} name="fileUpload" formEncType='multipart/form-data'/>
        <button type="submit" onClick={handleSubmit}>Upload</button>
        {uploading ? <p>Loading</p>: null}
        {message ? <p>{message}</p>: null}
      </> : <p><Link to="/login" className="underline">Connectez-vous</Link> pour commencer à upload!</p>
      }
      
    </div>
  )
}
