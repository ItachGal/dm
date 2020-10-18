import { Avatar, IconButton } from '@material-ui/core'
import { MoreVert, Chat, DonutLarge, SearchOutlined } from '@material-ui/icons'
import React, {useState, useEffect} from 'react'
import db from '../../firebase'
import { useStateValue } from '../../StateProvider'
import NewChat from './NewChat'
import './Sidebar.css'
import SidebarChat from './SidebarChat'
function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{ user }, ] = useStateValue();
    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot( (snapshot) => 
            setRooms(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })))
        );       
        return () => {
            unsubscribe();
        };
    }, []);
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLarge/>
                    </IconButton>

                    <IconButton>
                        <Chat/>
                    </IconButton>
                    
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                    
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined/>
                    <input placeholder="Search or Start Chat" type="text"/>
                </div>
            </div>

            <div className="sidebar__chats">
                <NewChat/>
                {rooms.map(room => (<SidebarChat key={room.id} id={room.id} name={room.data.name}/>))}
            </div>
        </div>
    )
}

export default Sidebar
