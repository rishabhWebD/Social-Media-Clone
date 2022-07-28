import axios from "axios";
import { useEffect, useState, useContext } from "react";
import "./conversation.css";
import { AuthContext } from "../../context/AuthContext";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState([]);

  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    console.log(friendId);
    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
        console.log(user);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img className="conversationImg" src={user?.profilePicture} alt="" />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
