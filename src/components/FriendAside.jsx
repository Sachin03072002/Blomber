import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import styles from "../assets/FriendAside.module.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export default function FriendAside({
  friendId,
  friendName,
  friendPhoto,
  friendOnline,
}) {
  const params = useParams();
  const [lastMessage, setLastMessage] = useState();
  const adminId = params.adminId;
  const conversationId = generateConversationID(adminId, friendId);
  const activeNavLink = { backgroundColor: "#333", color: "aliceBlue" };
  const onlineStatus = friendOnline
    ? { color: "lightgreen" }
    : { color: "red" };

  function generateConversationID(str1, str2) {
    if (str1 < str2) {
      return str1 + str2;
    } else {
      return str2 + str1;
    }
  }

  useEffect(() => {
    const updateLastMessage = async () => {
      const docRef = firebase
        .firestore()
        .collection("lastConversation")
        .doc(conversationId);

      await docRef.set({ lastMessage: lastMessage || "" });
    };

    updateLastMessage();
  }, [conversationId, lastMessage]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const docRef = firebase
        .firestore()
        .collection("lastConversation")
        .doc(conversationId);

      // Check if the document exists
      const docSnapshot = await docRef.get();

      if (docSnapshot.exists) {
        setLastMessage(docSnapshot.data().lastMessage);
      } else {
        // Handle the case when the document is not found
        console.log("Document does not exist");

        // Create a new document
        await docRef.set({ lastMessage: "" });
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [conversationId]);

  return (
    <section key={friendId}>
      <NavLink
        to={`${friendId}`}
        className={styles.box}
        style={({ isActive }) => {
          return isActive ? activeNavLink : null;
        }}
      >
        <i
          className={`fa-solid fa-circle fa-xs ${styles.onlineStatusDot}`}
          style={onlineStatus}
        ></i>
        <img
          src="https://pluspng.com/img-png/user-png-icon-young-user-icon-2400.png"
          alt={friendPhoto}
          width="100px"
        />
        <div className={styles.insideDiv}>
          <h1 className={styles.H1}>{friendId}</h1>
          {lastMessage && <small>{lastMessage}</small>}
        </div>
      </NavLink>
    </section>
  );
}
