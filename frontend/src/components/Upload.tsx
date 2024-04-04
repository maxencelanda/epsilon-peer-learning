import axios from "axios";
import { useState } from "react"

export default function Upload() {

  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSubmit = async e => {
    if (file != null){
      console.log(file[0])
      const formData = new FormData();
      formData.append(
        "fileUpload",
        file[0]
      );
      const headers = {'Content-Type': file[0].type}
      setUploading(true)
      const msg = await axios.post("http://localhost:8000/uploadfile",formData,headers);
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
      <input type="file" onChange={handleChange} name="fileUpload"/>
      <button type="submit" onClick={handleSubmit}>Upload</button>
      {uploading ? <p>Loading</p>: null}
      {message ? <p>{message}</p>: null}
    </div>
  )
}
