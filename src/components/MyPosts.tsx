import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SERVER_URL from "../SERVER_URL";
import axios from "axios";
import { ProTable } from '@ant-design/pro-table';
import { ProColumns } from '@ant-design/pro-table';
import { message, Popconfirm } from 'antd';

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

const MyPosts: React.FC = () => {
  const user = useContext(AuthContext);
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    if (user && user.username) {
      axios
        .post<PostData[]>(`${SERVER_URL}/api/myposts`, {
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

  const handleDelete = async (id: string) => {
    try {
      await axios.post(`${SERVER_URL}/api/deletepost`, { _id: id });
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      message.success('Post deleted successfully!');
    } catch (error) {
      console.error("Error deleting post:", error);
      message.error('Error deleting post');
    }
  };

  const columns: ProColumns<PostData>[] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      hideInTable: true,
    },
    {
      title: 'Likes',
      dataIndex: 'likes',
      key: 'likes',
      hideInTable: true,
    },
    {
      title: 'Bookmarks',
      dataIndex: 'bookmarks',
      key: 'bookmarks',
      hideInTable: true,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Operation',
      valueType: 'option',
      render: (_, record: PostData) => [
        <Popconfirm
          key="delete"
          title="Are you sure to delete this post?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <a href="#home">Delete</a>
        </Popconfirm>,
        <a key="edit" href={`/edit/${record._id}`}>Edit</a>,
      ],
    },
  ];

  const expandableRender = (record: PostData) => (
    <div>
      <h3>Comments</h3>
      {record.comments?.map((comment) => (
        <div key={comment._id}>
          {comment.data && comment.data.length >= 2 && (
            <>
              <strong>{comment.data[0]}:</strong> {comment.data[1]}
            </>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <ProTable<PostData>
      columns={columns}
      dataSource={posts}
      expandable={{ expandedRowRender: expandableRender }}
      rowKey="_id"
      search={false}
      dateFormatter="string"
      headerTitle="My Posts"
    />
  );
};

export default MyPosts;
