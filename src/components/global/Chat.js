import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined, Send } from '@material-ui/icons';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import "./Chat.css";
import firebase from "firebase";

function Chat() {
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]);
    const { roomId } = useParams();
    const [{user}, ] = useStateValue();
    useEffect(() => {
        if (roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => ( setRoom(snapshot.data().name)));
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => ( setMessages(snapshot.docs.map(doc => doc.data()))));
        }
    }, [roomId])

    const sendMessage = (e) =>{
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: message,
            name: user.displayName,
            uid: user.uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setMessage("");
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{room}</h3>
                    <p>Last message @ {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>

                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map( m => (
                    <p className={`chat__message ${m.uid === user.uid && "chat__receiver"}`}>
                        <span className="chat__name">{m.name}</span>
                    {m.message}
                    <span className="chat__timestamp">
                        {new Date(m.timestamp?.toDate()).toUTCString()}
                    </span>
                    </p>
                ))}
                
            </div>
            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticon/>
                </IconButton>
                <form>
                    <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Type a message" type="text"/>
                    <IconButton onClick={sendMessage} type="submit"><Send/></IconButton>
                </form>
                <IconButton>
                    <Mic/>
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
