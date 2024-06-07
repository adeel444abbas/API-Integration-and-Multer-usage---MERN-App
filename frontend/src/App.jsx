import { useState } from "react";
import "./App.css";
import axios from "axios";
import RegisteredUsers from "./RegisteredUsers";

function App() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setName("");
    setImage("");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    try {
      let response = await axios.post(
        "http://localhost:3000/uploadImage",
        formData
      );
      let data = await response.data;
      console.log("data:", data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <h3>Upload an Image</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={name}
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="form/-input"
            />
          </div>
          <button type="submit" className="btn">
            Register
          </button>
        </form>
      </div>
      <RegisteredUsers />
    </>
  );
}

export default App;
