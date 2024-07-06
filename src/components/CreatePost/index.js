import { useState } from "react";
import "./index.css";

const CreatePost = (props) => {
  const { setPageRendering, close } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const enteringTitle = (event) => {
    setTitle(event.target.value);
  };

  const enteringContent = (event) => {
    setContent(event.target.value);
  };

  const enteringNewData = async (event) => {
    event.preventDefault();
    const url = "https://wylo-posts-dun.vercel.app/addpost";
    const postData = { title: title, content: content };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(postData),
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      setPageRendering((prevState) => !prevState);
      close();
      alert("Post Successfully Created");
    } else {
      alert("Data Not updated");
    }
  };
  return (
    <div>
      <form onSubmit={enteringNewData}>
        <label>Title :</label>
        <input onChange={enteringTitle} type="text" />
        <label>Content : </label>
        <textarea onChange={enteringContent} type="text" />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
