import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDq2AmTCZ5FKI6aGXjrF-b22_97RXHyzs8",
    authDomain: "my-url-shortener-2e6bb.firebaseapp.com",
    projectId: "my-url-shortener-2e6bb",
    storageBucket: "my-url-shortener-2e6bb.appspot.com",
    messagingSenderId: "1024787849930",
    appId: "1:1024787849930:web:2075f0ad6b35b6058d4a33",
    measurementId: "G-51WXVJYN3N"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  export default db;
  
  
