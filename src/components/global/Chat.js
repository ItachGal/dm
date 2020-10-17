import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined, Send } from '@material-ui/icons';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import "./Chat.css"
function Chat() {
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('')
    const { roomId } = useParams();
    useEffect(() => {
        if (roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => ( setRoom(snapshot.data().name)))
        }
    }, [roomId])

    const sendMessage = (e) =>{
        setMessage("");
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{room}</h3>
                    <p>Last message @ </p>
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
                <p className={`chat__message ${true && "chat__receiver"}`}>
                    <span className="chat__name">name</span>
                    Hello
                    <span className="chat__timestamp">time</span>
                </p>
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
