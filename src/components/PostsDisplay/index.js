import "reactjs-popup/dist/index.css";
import CreatePost from "../CreatePost";
import { useState, useEffect } from "react";
import "./index.css";
import { IoMdClose } from "react-icons/io";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import './index.css'
import PostItem from "../PostItem";

const PostDisplay = () => {

  const [postsData, setPostsData] = useState([])
  const [pageRendering, setPageRendering] = useState(false)

  useEffect(() => {
    const callingApi = async () => {
      const url = 'https://wylo-posts-dun.vercel.app/postsdata'

      const response = await fetch(url);
      const data = await response.json()
      const fetchedData = data.map(eachData => ({
        id : eachData._id,
        title: eachData.title,
        content: eachData.content,
      }))
      setPostsData(fetchedData)
    }
    callingApi()
  },[pageRendering])

  const postsDisplaying = () => {
    return(
      <div className="all-posts">
        {postsData.map(each => (
          <PostItem key={each.id} setPageRendering={setPageRendering} postDetails={each}/>
        ))}
      </div>
    )
  }

  return (
    <div className="posts-main-container">
      <div className="popup-container" >
        <h1>Posts</h1>
      <Popup
        modal
        trigger={
          <button type="button" className="create-post-button">
            Create New Post
          </button>
        }
      >
        {(close) => (
          <div className="create-post-content">
            <button
              type="button"
              className="close-button"
              onClick={() => close()}
            >
              <IoMdClose />
            </button>
            <div className="creating-container">
            <h1>Create New Post</h1>
              <CreatePost setPageRendering={setPageRendering} close={close}/>
            </div>
          </div>
        )}
      </Popup>
      
      </div>
      <div className="posts-container">
        {postsDisplaying()}
      </div>
    </div>
  );
};

export default PostDisplay;
