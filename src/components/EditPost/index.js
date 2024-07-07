import { useState } from "react";
import "./index.css";

const EditPost = (props) => {
  const { id, setPageRendering, close, title } = props;
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const editingTitle = (event) => {
    setEditedTitle(event.target.value);
  };
  const editingContent = (event) => {
    setEditedContent(event.target.value);
  };
  const onUpdatingPost = async (event) => {
    event.preventDefault();
    const url = `https://wylo-posts-dun.vercel.app/post/${id}`;
    let changedData;
    if (editedTitle === "") {
      changedData = { content: editedContent };
    } else if (editedContent === "") {
      changedData = { title: editedTitle };
    } else {
      changedData = { title: editedTitle, content: editedContent };
    }
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(changedData),
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      alert("Changes Saved Successfully");
      setPageRendering((prevState) => !prevState);
      setEditedContent("");
      setEditedTitle("");
      close();
    } else {
      alert("Data not Changed");
    }
  };
  return (
    <div className="editing-continer">
      <h1>Edit Your Post</h1>
      <p>Previous Title: {title}</p>
      <form onSubmit={onUpdatingPost}>
        <label>Title:</label>
        <input onChange={editingTitle} type="text" />
        <label>Content :</label>
        <textarea onChange={editingContent} cols="60" type="text" />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPost;
