import React, {useState, useRef} from 'react'; 
import './chatroom.css'; 

import firebase from 'firebase/app'; 
import 'firebase/auth'; 
import 'firebase/firestore'
import Messages from './Message';

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


function Sender(props){
	const [temp, setTemp] = useState(''); 

	const updateMessage = e => setTemp(e.target.value);
	
	const retToParent = event =>{
		event.preventDefault(); 
		props.setMessage(temp); 
		setTemp(''); 
	}

	return (<div className="sender">
		<form>
			<input id="messageReader" value={temp} type="text" placeholder="Type here..." onChange={event => updateMessage(event)}></input>
			<button type='submit' onClick={event => retToParent(event)}>Send</button>
		</form>
	</div>);
}

export default function Chat(props) {
	const [, setMessage] = useState(''); 
	const messagesRef = firebase.firestore().collection(props.chatNum);
	const scroll = useRef(); 

	const updateMessage = val => {
		sendMessage(val); 
	}
 

	// console.log("Updated"); 
	const sendMessage = async (toSend) => {
		console.log("SendMessage");
		// Send Message into FireBase
		// setMessage(document.getElementById("messageReader").value);
		if (!toSend) return; 
		var user = firebase.auth().currentUser ? firebase.auth().currentUser.displayName : 'Anonymous'; 
		await messagesRef.add({
			text: toSend, 
			timeSent : firebase.firestore.FieldValue.serverTimestamp(),
			username : user,
		})
		setMessage('');
		
		scroll.current.scrollIntoView({behavior : 'smooth'})

	}
	return (
		<div className="chatroom">
			<div className='scroll'>
				<Messages chatNum={props.chatNum} />
				<span ref={scroll}></span>
			</div>
			<Sender setMessage={updateMessage}/>
		</div>
	)
}
