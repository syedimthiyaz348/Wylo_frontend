import { useState } from "react";
import "./index.css";

const CreatePost = (props) => {
  const { setPageRendering, close } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleErr, setTitleErr] = useState(false);
  const [contentErr, setContentErr] = useState(false);

  const enteringTitle = (event) => {
    let titleValue = event.target.value;
    if (titleValue.length < 1) {
      setTitleErr(true);
    } else {
      setTitle(titleValue);
      setTitleErr(false);
    }
  };

  const enteringContent = (event) => {
    let contentValue = event.target.value;
    if (contentValue < 1) {
      setContentErr(true);
    } else {
      setContent(contentValue);
      setContentErr(false);
    }
  };

  const enteringNewData = async (event) => {
    event.preventDefault();
    if (title !== "") {
      if (content !== "") {
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
      } else {
        setContentErr(true);
      }
    } else {
      setTitleErr(true);
    }
  };
  return (
    <div>
      <form onSubmit={enteringNewData}>
        <label>Title :</label>
        <input onChange={enteringTitle} type="text" />
        {titleErr && <p className="error-msg">*Required</p>}
        <label>Content : </label>
        <textarea onChange={enteringContent} type="text" />
        {contentErr && <p className="error-msg">*Required</p>}
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
