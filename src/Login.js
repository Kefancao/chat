import React, {useState} from 'react'

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

export default function LogIn(props) {
	const [code, setCode] = useState(''); 
	const messagesRef = firebase.firestore().collection('Rooms');
	const query = messagesRef.orderBy('roomID'); 
	const [messages] = useCollectionData(query, { idField : 'id' });
	const [joinAnonoymous, setJoinAnonoymous] = useState(false); 

	const codeUpdate = (event) => {
		setCode(event.target.value); 
		console.log(code); 
	}

	const changeKey = () => {
		var lowered = code.toLowerCase(); 
		for (var i = 0; i < messages.length; ++i){
			if (messages[i].roomID === lowered){
				props.setKey(lowered); 
				return; 
			}
		}

		alert("Invalid Room Id"); 
		setCode(''); 
	}

	const auth = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
    	firebase.auth().signInWithPopup(provider);

		if (firebase.auth().currentUser) props.setUsername(firebase.auth().currentUser.displayName); 
	}
 
	return (
		<div className="signIn">
			{/* For if the user does not want to sign in and just join as anonoymous */}
			{joinAnonoymous ? 
				<form>
					<label>Join Code: </label>
					<input type="text" name="code" placeholder="Type your code here..." onChange={event => codeUpdate(event)}></input>
					<button onClick={changeKey}>Join</button>
				</form> 
				: <button className="auth" onClick={()=> setJoinAnonoymous(true)}>Join as {props.username}</button>
			}
			{/* Google Auth */}
			<div className="auth"> 
				<button onClick={auth}>Sign In with Google</button>
			</div>
		</div>
	)
}
