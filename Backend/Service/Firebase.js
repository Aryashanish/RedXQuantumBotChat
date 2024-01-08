// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOeTx0wTtixprtOk_fSxSInrihMDPfx3s",
  authDomain: "redxquantumbotchat.firebaseapp.com",
  projectId: "redxquantumbotchat",
  storageBucket: "redxquantumbotchat.appspot.com",
  messagingSenderId: "71785071891",
  appId: "1:71785071891:web:057960c26db71d519106e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports = {app}