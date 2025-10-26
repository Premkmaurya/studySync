import React,{useState} from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const App = () => {
  const [content,setContent] = useState("")
  return (
    <div style={{ width: "80%", margin: "2rem auto" }}>
      <h2>React Quill Editor</h2>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        placeholder="Start typing..."
      />
      <p style={{ marginTop: "1rem" }}>Output:</p>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "100px",
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default App