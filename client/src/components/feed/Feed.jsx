import { useEffect, useState } from "react"
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import axios from 'axios';


export default function Feed(){
    const [posts, setPosts] = useState([]);
    
    
    useEffect(()=>{
        
        const fetchPosts = async()=>{
            try {
                const res = await axios.get("posts/")
                 setPosts((res.data).data)
                
            } catch (error) {
                console.log(error.message)
                
            }
        }
        fetchPosts();

    },[])
    return(
        <div className="feed">
            
            <div className="feedWrapper">
                <Share/>
               
                {posts.map((p)=> (

                    <Post key={p.id} post={p}/>

                )

                )}
               
             
            </div>
        </div>
    )

}