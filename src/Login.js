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

function makeid(length) {
	var result           = '';
	var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function CreateRoom(props){
	const docRef = firebase.firestore().collection('Rooms');  

	const createRoomKey = () => {
		var roomID = makeid(5);  
		docRef.add({roomID : roomID}); 
		alert("Your new room Id is " + roomID); 
		props.setJoin(true); 
		props.setCode(roomID); 
	}

	return (!props.join ? <div className='auth button-29' onClick={createRoomKey}>Create Room</div> : null); 

}
function SignOut(props) {
	const logOut = async () => {
		await firebase.auth().signOut(); 
		props.rerender(old => !old); 
	}
	return firebase.auth().currentUser && (
	  <div className="auth button-29" onClick={logOut}>Sign Out</div>
	); 
  }


export default function LogIn(props) {
	const [code, setCode] = useState(''); 
	const [, setRerender] = useState(false);
	const messagesRef = firebase.firestore().collection('Rooms');
	const query = messagesRef.orderBy('roomID'); 
	const [messages] = useCollectionData(query, { idField : 'id' });
	const [joinAnonymous, setJoinAnonymous] = useState(false); 

	// if (firebase.auth().currentUser) props.setUsername(firebase.auth().currentUser.displayName); 
	const codeUpdate = (event) => {
		setCode(event.target.value); 
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

	const auth = async () => {
		const provider = new firebase.auth.GoogleAuthProvider();
    	await firebase.auth().signInWithPopup(provider);
		setRerender(old => !old); 
	}
 
	return (
		<div className="signIn">
			{/* For if the user does not want to sign in and just join as Anonymous */}
			{joinAnonymous ? 
				<form className="joinKey">
					<label>Join Code: </label>
					<input value = {code} type="text" name="code" placeholder="Type your code here..." onChange={event => codeUpdate(event)}></input>
					<button onClick={changeKey}>Join</button>
				</form> 
				: <div className="auth button-29" onClick={()=> setJoinAnonymous(true)}>Join as {firebase.auth().currentUser ? firebase.auth().currentUser.displayName : 'Anonymous'}</div>
			}
			{/* Google Auth */}
			{!firebase.auth().currentUser ?
				<div className="auth button-29" onClick={auth}>Sign In with Google</div>
				: 
				null
			} 
			{firebase.auth().currentUser ? 
			<>
			<CreateRoom setJoin ={setJoinAnonymous} join = {joinAnonymous} setCode={setCode}/>
			<SignOut rerender={setRerender}/> 
			</>: null}
		</div>
	)
}
