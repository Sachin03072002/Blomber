import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/Admin.module.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export default function Admin({ adminName, adminPhoto, adminId }) {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      const snapshot = await firebase
        .firestore()
        .collection("friend")
        .where("friendId", "==", adminId)
        .get();
      const docId = snapshot.docs[0].id;
      setAdminData(snapshot.docs[0].data());
    };

    fetchAdminData();
  }, [adminId]);

  async function onLogOutHandler() {
    const snapshot = await firebase
      .firestore()
      .collection("friend")
      .where("friendId", "==", adminId)
      .get();
    const docId = snapshot.docs[0].id;
    console.log(docId);
    await firebase
      .firestore()
      .collection("friend")
      .doc(docId)
      .update({ friendOnline: false });
    navigate("/");
  }

  if (!adminData) {
    // Display a loading state or return null if adminData is not available yet
    return null;
  }

  return (
    <React.Fragment>
      <div className={styles.box}>
        <img
          src={adminPhoto}
          alt="."
          style={{ width: "75px", borderRadius: "1rem" }}
        />
        <div className={styles.insideDiv}>
          <h5 className={styles.H1}>{adminId}</h5>
          <div className={styles.outsideDiv}>
            <button
              onClick={onLogOutHandler}
              type="button"
              className="btn btn-danger my-2"
            >
              <i className="fa-solid fa-right-from-bracket">&nbsp; Logout</i>
            </button>
          </div>
        </div>
        <hr />
      </div>
    </React.Fragment>
  );
}
