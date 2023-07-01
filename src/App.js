import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { getDatabase, onChildAdded, push, ref, set } from "firebase/database";

function App() {
  const [name, setName] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState('');
  const db = getDatabase();
  const chatListRef = ref(db, 'chats');
  const updateHeight = () => {
    const el = document.getElementById('chat');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }
  useEffect(() => {
    const unsubscribe = onChildAdded(chatListRef, (data) => {
      setChats(chats => [...chats, data.val()]);
      setTimeout(() => {
        updateHeight();
      }, 100);
    });

    return () => {
      unsubscribe(); // Unsubscribe from the onChildAdded listener when component unmounts
    };
  }, []);

  const sendChat = () => {
    const chatRef = push(chatListRef);
    set(chatRef, {
      name,
      message: msg
    });
    setMsg('');
  };

  return (
    <div>
      {name ? null : (
        <div>
          <input
            type="text"
            placeholder="Enter name to start"
            onBlur={e => setName(e.target.value)}
          />
        </div>
      )}
      {name ? (
        <div>
          <h3>User: {name}</h3>
          <div id='chat' className="chat-container">
            {chats.map((c, i) => (
              <div key={i} className={`container ${c.name === name ? 'me' : ''}`}>
                <p className='chat-bubble'>
                  <strong>{c.name}:</strong>
                  <span>{c.message}</span>
                </p>
              </div>
            ))}
          </div>
          <div className='btm'>
            <input
              type="text"
              name="text"
              id=""
              placeholder="Enter your chat"
              onInput={e => setMsg(e.target.value)}
              value={msg}
            />
            <button onClick={e => sendChat()}>Send</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
