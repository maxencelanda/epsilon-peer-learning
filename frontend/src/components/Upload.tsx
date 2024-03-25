import axios from "axios";
import { useState } from "react"

export default function Upload() {

  const [file, setFile] = useState(null)

  const handleSubmit = async e => {
    if (file != null){
      console.log(file[0])
      const formData = new FormData();
      formData.append(
        "fileUpload",
        file[0]
      );
      const headers = {'Content-Type': file[0].type}
      await axios.post("http://localhost:8000/uploadfile",formData,headers);

    } else {
      console.log("No file uploaded")
    }
  }

  const handleChange = e => {
    setFile(e.target.files)
  }

  return (
    <div>
      <input type="file" onChange={handleChange} name="fileUpload"/>
      <button type="submit" onClick={handleSubmit}>Upload</button>
    </div>
  )
}
