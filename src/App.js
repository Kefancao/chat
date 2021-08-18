import React, { useState, useEffect } from 'react';

import Chat from './Chat'; 

import LogIn from './Login';


import firebase from 'firebase/app'; 
import 'firebase/auth'; 
import 'firebase/firestore'; 

const firebaseConfig = {
	apiKey: "AIzaSyA4fbIfuvkx1DMtZK-Q0jGuzBZruVzVhRM",
	authDomain: "quick-chat-db609.firebaseapp.com",
	projectId: "quick-chat-db609",
	storageBucket: "quick-chat-db609.appspot.com",
	messagingSenderId: "557271218039",
	appId: "1:557271218039:web:38f82323173721e9111372",
	measurementId: "G-B66PQED7GZ"
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}else {
	firebase.app(); // if already initialized, use that one
}


function App() {
  const [key, setKey] = useState('none'); 
  const [user, setUser] = useState(false); 
  
  useEffect(() => {
    if (key === 'none' || key === 'noneX'){
      if (key === 'noneX') alert("Invalid Room id :(" + key)
      setUser(false); 
    }
    else setUser(true);  
  }, [key])

  return (
    <>
      <div className="outer">
        {user ? null : <h1>Quick Chat</h1>}
        {user ? <Chat chatNum={key} /> : <LogIn setKey = {setKey} />}
      </div>
    </>
  )
}

export default App;
