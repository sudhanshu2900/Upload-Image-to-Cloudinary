import "./App.css";
import { useState } from "react";

function App() {
  const [image, setImage] = useState("");

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "gallery");

    const result = await fetch(
      "https://api.cloudinary.com/v1_1/dymdjle3o/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await result.json();
    console.log(file.secure_url);
    setImage(file.secure_url);
  };

  return (
    <>
      <div className="container">
        <div className="uploadSection">
          <p>Upload your image here...</p>

          <form>
            <div className="inputSpace">
              <div className="internalContainer">
                <img src="envelop.png" alt="img" />
                <br />
                <input type="file" id="fileInput" onChange={uploadImage} />
              </div>
            </div>

            <button type="submit">upload image</button>
          </form>
        </div>

        <div className="displaySection">
          <p>Your all uploaded images</p>
          <div className="images">
            {image.length > 0 ? (
              <img src={image} alt="img" width={"150rem"} />
            ) : (
              <p>No images are found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
