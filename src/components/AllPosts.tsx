import React, { useState, useEffect } from "react";
import SERVER_URL from "../SERVER_URL";
// import { Router } from "react-router-dom";
// import HomeContext from "../pages/HomeContext";
import axios from "axios";
import Post from "./Post";

interface Comment {
  _id: string;
  data: [string, string]; 
}

interface PostData {
  _id: string;
  title: string;
  username: string;
  name: string;
  content: string;
  likes: string[];
  bookmarks: string[];
  comments: Comment[];
  date: string;
}

const AllPosts: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    axios
      .get<PostData[]>(`${SERVER_URL}/api/allposts`)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post._id}
          id={post._id}
          title={post.title}
          username={post.username}
          name={post.name}
          content={post.content}
          likes={post.likes}
          bookmarks={post.bookmarks}
          comments={post.comments}
          date={post.date}
        />
      ))}
    </div>
  );
};

export default AllPosts;
