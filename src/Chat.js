import React, {useState} from 'react'; 
import Message from './Message';
import './chatroom.css'; 

export default function Chat() {
	const [message, setMessage] = useState(''); 



	const updateMessage = (event) => {
		setMessage(event.target.value)
	}

	const sendMessage = () => {
		// Send Message into FireBase
	}
	return (
		<>
			<div className="messageBox">
				<Message />
			</div>
			<div className="sender">
				<form>
					<input type="text" placeholder="Type here..." onChange={event => updateMessage(event)}></input>
					<button onClick={sendMessage}>Send</button>
				</form>
			</div>
		</>
	)
}
