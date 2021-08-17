import React, { useState, useEffect } from 'react';

import Chat from './Chat'; 
import Button from './Button'; 
import LogIn from './Login';


import firebase from 'firebase/app'; 
import 'firebase/auth'; 
import 'firebase/firestore'; 

var firebaseConfig = {
  apiKey: "AIzaSyA4fbIfuvkx1DMtZK-Q0jGuzBZruVzVhRM",
  authDomain: "quick-chat-db609.firebaseapp.com",
  projectId: "quick-chat-db609",
  storageBucket: "quick-chat-db609.appspot.com",
  messagingSenderId: "557271218039",
  appId: "1:557271218039:web:38f82323173721e9111372",
  measurementId: "G-B66PQED7GZ"
};

firebase.initializeApp(firebaseConfig); 

function App() {
  const [key, setKey] = useState('none'); 
  const [user, setUser] = useState(false); 
  
  useEffect(() => {
    if (key === 'none') setUser(false); 
    else setUser(true);  
  }, [key])

  return (
    <>
      <div>
        {user ? <Chat /> : <LogIn setKey = {setKey} />}
      </div>
    </>
  )
}

export default App;
