import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Post from "./Post";
import { AuthContext } from "../context/AuthContext";
import SERVER_URL from "../SERVER_URL";

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

const BookmarkedPosts: React.FC = () => {
  const user = useContext(AuthContext);
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    if (user && user.username) {
      axios
        .post<PostData[]>(`${SERVER_URL}/api/bookmarkedposts`, {
          username: user.username,
        })
        .then((response) => {
          setPosts(response.data);
          console.log(response.data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [user]);

  if (!user || !user.username) {
    return <div>Error: User information not available.</div>;
  }

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

export default BookmarkedPosts;
