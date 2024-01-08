import { useState, useEffect, useContext } from 'react';
import ChatComponent from './ChatComponent';
import { initializeApp } from 'firebase/app';
import { doc, collection, addDoc, getFirestore, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserContext } from '../../Context/UserContext';

const firebaseConfig = {
  apiKey: "AIzaSyCOeTx0wTtixprtOk_fSxSInrihMDPfx3s",
  authDomain: "redxquantumbotchat.firebaseapp.com",
  projectId: "redxquantumbotchat",
  storageBucket: "redxquantumbotchat.appspot.com",
  messagingSenderId: "71785071891",
  appId: "1:71785071891:web:057960c26db71d519106e6"
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

function App() {
  const userContext = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState('');
  const [recipientUser, setRecipientUser] = useState('RedX');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const auth = getAuth();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.displayName || 'Guest');
        setUserEmail(user.email);
      } else {
        setCurrentUser('Guest');
        setUserEmail('');
      }
    });

    return () => unsubscribeAuth();
  }, [auth]);

  // Define the sendMessage function
  const sendMessage = async () => {
    if (inputText.trim() !== '' && recipientUser.trim() !== '') {
      const chatId = recipientUser;
      const chatRef = doc(firestore, 'groups', chatId);
  
      await addDoc(collection(chatRef, 'messages'), {
        text: inputText,
        sender: currentUser,
        senderEmail: userContext.user.email, // Include the user's email
        timestamp: new Date(),
      });
  
      setInputText('');
    }
  };

  const trimEmail = (email) => {
    const atIndex = email.indexOf('@');
    return atIndex !== -1 ? email.substring(0, atIndex) : email;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='text text-center text-2xl m-5 font-semibold'>
          Welcome to RedX Community, {trimEmail(userContext.user.email)}</h1>
      </header>
      <div className='flex'>
        <div className='m-4'>
          <h1 className='font-bold text-2xl bg-cyan-50 rounded-lg p-1 text-center'>Groups</h1>
          <h1 className='font-semibold mt-4 bg-red-400 rounded-lg p-3 cursor-pointer'>Redx Community</h1>
        </div>
        <div className="w-full">
          <ChatComponent
            currentUser={currentUser}
            recipientUser={recipientUser}
            messages={messages}
            setMessages={setMessages}
            inputText={inputText}
            setInputText={setInputText}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
