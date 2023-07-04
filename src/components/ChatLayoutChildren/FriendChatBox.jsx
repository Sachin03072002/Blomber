import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Conversation from "../Conversation";
import Navbar from "../Navbar";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export default function FriendChatBox() {
  const params = useParams();
  const adminId = params.adminId;
  const friendId = params.friendId;
  const [friendData, setFriendData] = useState([]);
  const [conversationData, setConversation] = useState([]);
  const [generatedId, setGeneratedId] = useState(null);
  const [message, setMessage] = useState("");

  const time = new Date().toLocaleTimeString();

  function generateConversationID(str1, str2) {
    const sortedIds = [str1, str2].sort();
    return sortedIds.join("");
  }

  async function onSubmitHandler(event) {
    event.preventDefault();
    console.log("message forwarded");
    console.log(message);
    const conversationID = generateConversationID(adminId, friendId);
    const conversationSnapshot = await firebase
      .firestore()
      .collection("friendsConversation")
      .where("conversationId", "==", conversationID)
      .get();

    if (conversationSnapshot.docs[0]) {
      const docData = conversationSnapshot.docs[0].data();
      const conversation = [
        ...docData.conversation,
        { friendID: adminId, message, time },
      ];
      const docId = conversationSnapshot.docs[0].id;
      await firebase
        .firestore()
        .collection("friendsConversation")
        .doc(docId)
        .set({ ...docData, conversation });
    } else {
      await firebase
        .firestore()
        .collection("friendsConversation")
        .add({
          conversationId: conversationID,
          conversation: [{ friendID: adminId, message, time }],
        });
    }

    setMessage("");
  }

  useEffect(() => {
    const conversationID = generateConversationID(adminId, friendId);
    setGeneratedId(conversationID); // Set the initial value of generatedId

    const intervalId = setInterval(async () => {
      const friendSnapshot = await firebase
        .firestore()
        .collection("friend")
        .where("friendId", "==", friendId)
        .get();
      setFriendData(friendSnapshot.docs[0].data());

      const conversationSnapshot = await firebase
        .firestore()
        .collection("friendsConversation")
        .where("conversationId", "==", conversationID)
        .get();

      if (conversationSnapshot.docs[0]) {
        setConversation(conversationSnapshot.docs[0].data());
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [friendId, adminId]);

  console.log(generatedId);
  return (
    <section
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar
        friendName={friendData.friendId}
        backColor={friendData.backColor}
        friendPhoto={friendData.friendPhoto}
        conversation={conversationData.conversation}
      />
      <Conversation
        conversation={conversationData.conversation}
        uniqueId={generatedId}
      />
      <form
        onSubmit={onSubmitHandler}
        style={{
          padding: "20px 10px",
          backgroundColor: "#777",
          borderRadius: "0.5rem",
        }}
      >
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type Here . . ."
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />
          <button
            style={{ borderLeft: "1px solid #333" }}
            className="btn btn-light"
            type="submit"
            id="button-addon2"
          >
            <i className="fa-solid fa-play"></i>
          </button>
        </div>
      </form>
    </section>
  );
}
