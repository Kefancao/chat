import React from 'react'

import firebase from 'firebase/app'; 
import 'firebase/auth'; 
import 'firebase/firestore'; 

export default function LogIn() {
	const GoogleSignIn = async() => {
		const provider = new firebase.auth.GoogleAuthProvider(); 

		firebase.auth().useDeviceLanguage(); 

		try {
			await firebase.auth().signInWithPopup(provider); 
		} catch (error){
			console.log(error.message); 
		}
	}
	return (
		<div className="signIn">
			<button onClick={GoogleSignIn}>
				Sign in with Google. 
			</button>
		</div>
	)
}
