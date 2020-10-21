import { Avatar } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import db from '../../firebase';
import "./SidebarChat.css"

function SidebarChat({ id, name }) {
    const [lastMessages, setLastMessages] = useState("");
    useEffect(() => {
        if (id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot( (snapshot) => (
                setLastMessages(snapshot.docs.map((doc) => doc.data()))
            ));
        }
    }, [id]); //TODO if issue <-
    return (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`}/>
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{lastMessages[0]!= null ?lastMessages[0]?.message.substring(0,5) + '...': ''}</p>
                </div>
            </div>
        </Link>
    )
}

export default SidebarChat
