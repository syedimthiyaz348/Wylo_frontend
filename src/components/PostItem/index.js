import "./index.css";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { IoMdClose } from "react-icons/io";
import EditPost from "../EditPost";

const PostItem = (props) => {
  const { postDetails, setPageRendering } = props;
  const { id, title, content } = postDetails;

  

  const deletingPost = async () => {
    const url = `https://wylo-posts-dun.vercel.app/delete/${id}`;
    const options = {
      method: "DELETE",
    };
    const response = await fetch(url, options);
    setPageRendering((prevState) => !prevState);
    alert("Post Deleted")
  };

  return (
    <div className="each-post">
      <div className="title-edit">
        <h1 className="title-heading">{title}</h1>
        <div>
        <Popup
          modal
          trigger={
            <button type="button" className="edit-button">
              Edit
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
              <div>
                <EditPost setPageRendering={setPageRendering} close={close} id={id} title={title} content={content}/>
              </div>
            </div>
          )}
        </Popup>
        <button onClick={deletingPost} className="delete-button">
          <MdOutlineDeleteOutline />
        </button>
        </div>
      </div>
      <div className="description">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default PostItem;
