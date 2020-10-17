import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import db from '../../firebase';
import "./SidebarChat.css"

function SidebarChat({ id, name, addNewChat }) {

    const createChat = () => {
        const roomName = prompt("Please enter chat name");
        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
            })
        }
    }
    return !addNewChat ? (
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${name}.svg`}/>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
            </div>
        </div>
    ): (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat
