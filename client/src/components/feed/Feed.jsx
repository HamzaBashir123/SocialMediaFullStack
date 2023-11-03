import { useEffect, useState } from "react"
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import axios from 'axios';


export default function Feed({username}){
    const [posts, setPosts] = useState([]);
   
    
    
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
        const fetchPosts = async () => {
          const res = username
            ? await axios.get("/posts/profile/" + username)
            : await axios.get("posts/timeline/6540cae1dc8dd450046beaec" );
           
            setPosts(res.data)
           
    
        };
        fetchPosts();
      }, [username]);
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