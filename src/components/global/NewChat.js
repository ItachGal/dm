import React from 'react'
import db from '../../firebase';
import "./SidebarChat.css"

function NewChat() {
    const createChat = () => {
        const roomName = prompt("Please enter chat name");
        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
            })
        }
    }
    return (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    )
}

export default NewChat
