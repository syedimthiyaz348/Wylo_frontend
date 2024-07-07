import "reactjs-popup/dist/index.css";
import CreatePost from "../CreatePost";
import { useState, useEffect } from "react";
import { ThreeCircles } from "react-loader-spinner";
import "./index.css";
import { IoMdClose } from "react-icons/io";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./index.css";
import PostItem from "../PostItem";

const displayConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const PostDisplay = () => {
  const [postsData, setPostsData] = useState([]);
  const [apiStatus, setApiStatus] = useState(displayConstants.initial);
  const [pageRendering, setPageRendering] = useState(false);

  useEffect(() => {
    const callingApi = async () => {
      const url = "https://wylo-posts-dun.vercel.app/postsdata";
      setApiStatus(displayConstants.inProgress);
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok === true) {
        const fetchedData = data.map((eachData) => ({
          id: eachData._id,
          title: eachData.title,
          content: eachData.content,
        }));
        setPostsData(fetchedData);
        setApiStatus(displayConstants.success);
      } else {
        setApiStatus(displayConstants.failure);
      }
    };
    callingApi();
  }, [pageRendering]);

  const postsInProgress = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#000000"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  };

  const failureView = () => {
    return (
      <div>
        <h1>No Posts Available</h1>
      </div>
    );
  };

  const successPostsDisplaying = () => {
    return (
      <div className="all-posts">
        {postsData.map((each) => (
          <PostItem
            key={each.id}
            setPageRendering={setPageRendering}
            postDetails={each}
          />
        ))}
      </div>
    );
  };

  const pageSwitching = () => {
    switch (apiStatus) {
      case displayConstants.success:
        return successPostsDisplaying();
        break;
      case displayConstants.inProgress:
        return postsInProgress();
        break;
      case displayConstants.failure:
        return failureView();
        break;
      default:
        return null;
    }
  };

  return (
    <div className="posts-main-container">
      <div className="popup-container">
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
                <CreatePost setPageRendering={setPageRendering} close={close} />
              </div>
            </div>
          )}
        </Popup>
      </div>
      <div className="posts-container">{pageSwitching()}</div>
      <Popup
          modal
          trigger={
            <button type="button" className="note-button">
              Note
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
              <div className="note-container">
                <h1>Note:</h1>
                <p><b>Post Display Page</b>: All the posts are displayed.</p>
                <p><b>Create Post</b>: On Clicking to the CreatePost Button the New post creation page is opened. </p>
                <p><b>Edit Button</b>: On Clicking the Edit Button the popup is opened to edit the post.</p>
                <p><b>Delete Button</b>: On Clicking Delete Button The Selected Post will get Deleted. </p>
              </div>
            </div>
          )}
        </Popup>
    </div>
  );
};

export default PostDisplay;
