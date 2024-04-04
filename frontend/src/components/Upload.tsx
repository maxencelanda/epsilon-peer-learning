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
      
      for (let i = 0; i < file.length; i++){
        formData.append("filesUpload", file[i]);
      }
      const headers = {'Content-Type': "multipart/form-data"}
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
      <input type="file" multiple onChange={handleChange} name="fileUpload" formEncType='multipart/form-data'/>
      <button type="submit" onClick={handleSubmit}>Upload</button>
      {uploading ? <p>Loading</p>: null}
      {message ? <p>{message}</p>: null}
    </div>
  )
}
