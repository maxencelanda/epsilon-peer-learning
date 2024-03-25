import { useState } from "react"

export default function Upload() {

  const [file, setFile] = useState(null)

  const handleSubmit = e => {
    if (file != null){
      console.log(file[0].name)
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
