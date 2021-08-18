import React, {useState} from 'react'; 
import Message from './Message';
import './chatroom.css'; 

import firebase from 'firebase/app'; 
import 'firebase/auth'; 
import 'firebase/firestore'

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

export default function Chat() {
	const [message, setMessage] = useState(''); 
	const messagesRef = firebase.firestore().collection('Chat1');


	const updateMessage = (event) => {
		setMessage(event.target.value)
	}

	const sendMessage = async (e) => {
		// Send Message into FireBase
		e.preventDefault(); 

		await messagesRef.add({
			text: message, 
			timeSent : firebase.firestore.FieldValue.serverTimestamp(),
		})
		setMessage(''); 

	}
	return (
		<>
			<div className="messageBox">
				<Message />
			</div>
			<div className="sender">
				<form>
					<input value={message} type="text" placeholder="Type here..." onChange={event => updateMessage(event)}></input>
					<button type='submit' onClick={event => sendMessage(event)}>Send</button>
				</form>
			</div>
		</>
	)
}
