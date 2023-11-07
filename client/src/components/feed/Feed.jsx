import { useContext, useEffect, useState } from "react"
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";


export default function Feed({username}){
    const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext)
   
    
    
    // useEffect(()=>{
    //     console.log(username)
        
    //     const fetchPosts = async()=>{
    //         try {
    //             const res = username ? await axios.get(`/posts/profile/${username}`) :
    //             await axios.get("/posts/timeline/6540cae1dc8dd450046beaec")
    //              setPosts(res.data)
                
    //         } catch (error) {
    //             console.log(error.message)
                
    //         }
    //     }
    //     fetchPosts();

    // },[])

    useEffect(() => {
        console.log(username)
        const fetchPosts = async () => {
          const res = username
            ? await axios.get("/posts/profile/" + username)
            : await axios.get("posts/timeline/" + user._id );
           
            setPosts(res.data)
           
    
        };
        fetchPosts();
      }, [username ,user._id]);
    return(
        <div className="feed">
            
            <div className="feedWrapper">
                <Share/>
               
                {posts.map((p)=> (

                    <Post key={p._id} post={p} username={username}/>

                )

                )}
               
             
            </div>
        </div>
    )

}