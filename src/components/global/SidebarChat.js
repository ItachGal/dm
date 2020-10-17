import { Avatar } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import "./SidebarChat.css"

function SidebarChat({ id, name, addNewChat }) {
    return (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`}/>
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                </div>
            </div>
        </Link>
    )
}

export default SidebarChat
