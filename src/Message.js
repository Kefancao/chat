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
	return(
		<div className="message">
			<p>{props.text}</p>
		</div>
	)
}


export default function Messages() {
	const messagesRef = firebase.firestore().collection('Chat1');
	const query = messagesRef.orderBy('timeSent').limit(100);
	const [messages] = useCollectionData(query, { idField : 'id' });

	return (
		<div className="messageBox">
			{messages && messages.map(message => (
				<Message key={message.id} text={message.text} spent={message.timeSent}/>
			))}
		</div>

	)
}
