import { MoreVert } from "@mui/icons-material";
import "./post.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {format} from "timeago.js"
import {Link} from "react-router-dom"

export default function Post({ post , username}) {
  
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLike] = useState(false);
  const [isLiked1, setIsLike1] = useState(false);
  const [user, setUser] = useState({});
  const PF =  process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(()=>{
    const fetchUser = async()=>{
        try {
            const res = await axios.get(`/users?userId=${post.userId}`)
            setUser(res.data)    

        } catch (error) {
            console.log(error.message)  
        }
    }
    fetchUser();
},[post.userId])

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLike(!isLiked);
  };
  const likeHandler1 = () => {
    setLike(isLiked1 ? like - 1 : like + 1);
    setIsLike1(!isLiked1);
  };
  

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            {username ?<img
              src={PF+ (user.profilePicture || "person/noAvatar.jpg")}
              alt=""
              className="postProfileImg"
              />  :
              <Link to={`profile/${user.username}`}>
              <img
                src={PF+ ( user.profilePicture || "person/noAvatar.jpg")}
                alt=""
                className="postProfileImg"
                />  
                </Link>
               }
           
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">  
            <MoreVert /> 
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={PF + post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src= {`${PF}like.png`} 
              style={{
                border: isLiked ? "2px solid red" : "2px solid transparent",
              }}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src= {`${PF}heart.png`} 
              style={{
                border: isLiked1 ? "2px solid red" : "2px solid transparent",
              }}
              onClick={likeHandler1}
              alt=""
            />
            <span className="postLikeCounter">{like + " people like it"}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
