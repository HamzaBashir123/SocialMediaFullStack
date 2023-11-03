import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username


  useEffect(()=>{
    const fetchUser = async()=>{
        try {
            const res = await axios.get(`/users?username=${username}`)
            setUser(res.data)
            console.log(user + "=========>  USer")
        } catch (error) {
            console.log(error.message)  
        }
    }
    fetchUser();
},[username])


  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={PF + (user?.coverPicture || "post/2.jpeg")}
                alt=""
              />
              <img
                className="profileUserImg"
                src={PF + (user?.profilePicture || "post/2.jpeg")}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc || "No Description"}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username= {username}/>
            <Rightbar user={username} />
          </div>
        </div>
      </div>
    </>
  );
}
