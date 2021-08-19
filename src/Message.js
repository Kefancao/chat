import React from 'react'

import firebase from 'firebase/app'; 
import 'firebase/auth'; 
import 'firebase/firestore'
import {useCollectionData} from 'react-firebase-hooks/firestore'; 

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

function Message(props){
	var curr; 
	if (!firebase.auth().currentUser) curr = 'Anonymous'; 
	else curr = firebase.auth().currentUser.displayName; 
	var isUser = curr === props.username ? 'sent': 'received';
	return(
		<div className={'message' + isUser}>
			<p className='username'>{props.username}</p>
			<p className="message">{props.text}</p>
		</div>
	)
}


export default function Messages(props) {
	const messagesRef = firebase.firestore().collection(props.chatNum);
	const query = messagesRef.orderBy('timeSent', 'desc').limit(30);
	const [messages] = useCollectionData(query, { idField : 'id' });
	if (messages) messages.reverse(); 
	return (
		<div className="messageBox">
			{messages && messages.map(message => (
				<Message key={message.id} text={message.text} username={message.username} spent={message.timeSent}/>
			))}
		</div>

	)
}
