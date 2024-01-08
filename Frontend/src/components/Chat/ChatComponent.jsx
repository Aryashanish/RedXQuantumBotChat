import "./styles.css"
import { useEffect } from 'react';
import { doc, collection, onSnapshot, getFirestore } from 'firebase/firestore';

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

      const unsubscribe = onSnapshot(collection(chatRef, 'messages'), (snapshot) => {
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

  return (
    <div className="chat-box m-5">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender.includes(currentUser) ? 'user' : 'sender'}`}
          >
            <strong>{message.senderEmail}: </strong> {message.text}
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

export default ChatComponent;
