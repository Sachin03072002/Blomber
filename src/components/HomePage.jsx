import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/HomePage.module.css";
import firebase from "firebase/compat/app";
import "firebase/firestore";

function HomePage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  async function onSubmitHandler(event) {
    event.preventDefault();
    const snapshot = await firebase
      .firestore()
      .collection("friend")
      .where("friendId", "==", userId)
      .get();

    if (snapshot.docs.length > 0) {
      console.log(snapshot.docs);
      console.log(snapshot.docs[0]);
      const doc = snapshot.docs[0].data();
      const docId = snapshot.docs[0].id;
      navigate(`/reactChatWeb/${doc.friendId}`);
      await firebase
        .firestore()
        .collection("friend")
        .doc(docId)
        .update({ friendOnline: true });
    } else {
      console.log("No such id exists");
      const newFriend = {
        friendId: userId,
        friendOnline: true,
      };

      const newFriendRef = await firebase
        .firestore()
        .collection("friend")
        .add(newFriend);

      navigate(`/reactChatWeb/${userId}`);
      console.log("New friend created with ID:", newFriendRef.id);
    }
  }

  return (
    <React.Fragment>
      <main className={styles.homeMain}>
        <section className={styles.homeSection}>
          <img
            src="https://tobidigital.com/wp-content/uploads/2020/05/whatsapp-business-api-logo-icon.png"
            alt="friends"
            className={styles.homeImg}
          />
          <form className={styles.homeForm} onSubmit={onSubmitHandler}>
            <h1>Welcome to Bloooomber!!!!</h1>
            <input
              type="text"
              onChange={(e) => {
                setUserId(e.target.value);
              }}
              value={userId}
              className="form-control my-3"
              id="inputEmail3"
              placeholder="Enter ID"
              required
            />
            <div className="d-flex justify-content-between w-100">
              <button className="btn btn-outline-success" type="submit">
                My Friends
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  setUserId("");
                }}
              >
                Clear
              </button>
            </div>
          </form>
        </section>
      </main>
    </React.Fragment>
  );
}

export default HomePage;
