import { useState } from "react";
import "./index.css";

const CreatePost = (props) => {
  const { setPageRendering, close } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleErr, setTitleErr] = useState(false);
  const [contentErr, setContentErr] = useState(false);

  const handlingTitle = (event) => {
    setTitle(event.target.value);
  };

  const handlingContent = (event) => {
    setContent(event.target.value);
  };

  const enteringNewData = async (event) => {
    event.preventDefault();
    if (title !== '') {
      if (content !== ''){
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
        setTitle("");
        setContent("");
        alert("Post Successfully Created");
      } else {
        alert("Data Not updated");
      }
      }else{
        setContentErr(true)
      }
    } else {
      setTitleErr(true);
    }
  };
  return (
    <div>
      <form onSubmit={enteringNewData}>
        <label>Title :</label>
        <input value={title} onChange={handlingTitle} type="text" />
        {titleErr && <p className="error-msg">*Required</p>}
        <label>Content : </label>
        <textarea value={content} onChange={handlingContent} type="text" />
        {contentErr && <p className="error-msg">*Required</p>}
        <button className="create-button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
