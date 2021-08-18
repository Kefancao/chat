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

export default function Chat(props) {
	const [message, setMessage] = useState(''); 
	const messagesRef = firebase.firestore().collection(props.chatNum);
	const scroll = useRef(); 

	const updateMessage = (event) => {
		setMessage(event.target.value)
	}

	const sendMessage = async (e) => {
		// Send Message into FireBase
		e.preventDefault(); 

		if (!message) return; 
		await messagesRef.add({
			text: message, 
			timeSent : firebase.firestore.FieldValue.serverTimestamp(),
			username : props.username,
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
			<div className="sender">
				<form>
					<input id="messageReader" value={message} type="text" placeholder="Type here..." onChange={event => updateMessage(event)}></input>
					<button type='submit' onClick={event => sendMessage(event)}>Send</button>
				</form>
			</div>
		</div>
	)
}
