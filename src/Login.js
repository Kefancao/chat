import React, {useState, useEffect} from 'react'

import firebase from 'firebase/app'; 
import 'firebase/auth'; 
import 'firebase/firestore'; 

export default function LogIn(props) {
	const [code, setCode] = useState(''); 

	const codeUpdate = (event) => {
		setCode(event.target.value); 
		console.log(code); 
	}

	const changeKey = () => {
		console.log(code);
		props.setKey(code); 
	}
 
	return (
		<div className="signIn">
			<form>
				<input type="text" name="code" placeholder="Type your code here..." onChange={event => codeUpdate(event)}></input>
				<button onClick={changeKey}>Join</button>
			</form>
		</div>
	)
}
