import React, { useContext, useState } from "react";
import { FormOutlined, UnorderedListOutlined, HeartOutlined, BookOutlined, FileTextOutlined, UserOutlined} from "@ant-design/icons";
// import { icons } from "antd/lib/image/PreviewGroup";
import { Layout, Menu, Typography } from "antd";
import CreatePost from "../components/CreatePost";
import AllPosts from "../components/AllPosts";
import LikedPosts from "../components/LikedPosts";
import Logout from "../components/Logout";
import Profile from "../components/Profile";
import MyPosts from "../components/MyPosts";
import BookmarkedPosts from "../components/BookmarkedPosts";

import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
const { Title } = Typography;
const { Header, Content, Sider } = Layout;

const HomeContext: React.FC = () => {
  const userVal = useContext(AuthContext) || { isLoggedIn: false, name: "" };
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("CreatePost");

  const onTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} width={200}>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
          <Menu.Item
            key="/home/create-post"
            onClick={() => onTabChange("CreatePost")}
            icon={<FormOutlined />}
          >
            <Link to="/home/create-post"> Create Your Own Post </Link>
          </Menu.Item>
          <Menu.Item
            key="/home/all-posts"
            onClick={() => onTabChange("AllPosts")}
            icon={<UnorderedListOutlined />}
          >
            <Link to="/home/all-posts"> All Posts</Link>
          </Menu.Item>
          <Menu.Item
            key="/home/liked-posts"
            onClick={() => onTabChange("LikedPosts")}
            icon={<HeartOutlined />}
          >
            <Link to="/home/liked-posts"> All Liked Posts </Link>
          </Menu.Item>
          <Menu.Item
            key="/home/bookmarked-posts"
            onClick={() => onTabChange("BookmarkedPosts")}
            icon={<BookOutlined />}
          >
            <Link to="/home/bookmarked-posts">B ookmarked Posts </Link>
          </Menu.Item>
          <Menu.Item
            key="/home/my-posts"
            onClick={() => onTabChange("MyPosts")}
            icon={<FileTextOutlined />}
          >
            <Link to="/home/my-posts"> My Posts </Link>
          </Menu.Item>
          <Menu.Item
            key="/home/my-profile"
            onClick={() => onTabChange("Profile")}
            icon={<UserOutlined />}
          >
            <Link to="/home/my-profile"> My Profile </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            display: "flex",
            alignItems: "center",
            padding: 0,
            background: "#fff",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <Title level={3} style={{ margin: 0, paddingLeft: "16px" }}>
            Social Media App
          </Title>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "16px",
            }}
          >
            Welcome, {userVal.isLoggedIn && userVal.name}{" "}
            <span style={{ marginRight: "8px" }} />
            <Logout />
          </span>
        </Header>
        <Content
          style={{
            minHeight: 280,
            overflow: "initial",
            margin: "24px 16px",
            padding: 24,
          }}
        >
          {activeTab === "CreatePost" && <CreatePost />}
          {activeTab === "AllPosts" && <AllPosts />}
          {activeTab === "LikedPosts" && <LikedPosts />}
          {activeTab === "BookmarkedPosts" && <BookmarkedPosts />}
          {activeTab === "MyPosts" && <MyPosts />}
          {activeTab === "Profile" && <Profile />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeContext;
