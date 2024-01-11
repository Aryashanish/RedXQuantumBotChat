import "./styles.css"
import { useEffect } from 'react';
import { doc, collection, onSnapshot, getFirestore, orderBy, query } from 'firebase/firestore';

const ChatComponent = ({
  currentUser,
  recipientUser,
  messages,
  setMessages,
  inputText,
  setInputText,
  sendMessage,
}) => {
  const firestore = getFirestore();

  useEffect(() => {
    if (recipientUser) {
      const chatId = recipientUser;
      const chatRef = doc(firestore, 'groups', chatId);

      const q = query(collection(chatRef, 'messages'), orderBy('timestamp', 'asc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => {
          const messageData = doc.data();
          const senderWithEmail = `${messageData.sender} (${messageData.senderEmail})`;
          return { ...messageData, sender: senderWithEmail };
        });
        setMessages(newMessages);
      });

      return () => unsubscribe();
    }
  }, [recipientUser, setMessages, firestore]);

  // Sort the messages based on the timestamp
  const sortedMessages = [...messages].sort((a, b) => a.timestamp - b.timestamp);

  return (
    <div className="chat-box m-5">
      <div className="chat-messages">
        {sortedMessages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender.includes(currentUser) ? 'user' : 'sender'}`}
          >
            <strong>{message.senderEmail}: </strong> {message.text}
            <br />
            <span className="timestamp">{formatTimestamp(message.timestamp)}</span>
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

// Function to format timestamp
const formatTimestamp = (timestamp) => {
  // Convert Firestore Timestamp to JavaScript Date
  const date = timestamp.toDate();
  
  const options = { hour: 'numeric', minute: 'numeric' };
  const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
  return formattedTime;
};

export default ChatComponent;
