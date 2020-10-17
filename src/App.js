import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Chat from './components/global/Chat';
import Sidebar from './components/global/Sidebar';
import Login from './components/global/Login';

function App() {
  const [user, setUser] = useState(null)
  return (
    <div className="app">
      {!user ? (<Login/>): 
       (
        <div className="app__body">
          <Router>
            <Sidebar/>
            <Switch>

              <Route path="/rooms/:roomId">
                <Chat/>
              </Route>

              <Route path="/">
                {/* <Chat/> */}
              </Route>

            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
