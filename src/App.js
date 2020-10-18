import React, {useEffect} from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Chat from './components/global/Chat';
import Sidebar from './components/global/Sidebar';
import Login from './components/global/Login';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function App() {
  const [{user}, dispatch] = useStateValue();  
  useEffect(() => {
    const tmpUser = localStorage.getItem('user');
    if (tmpUser){
      dispatch({
        type: actionTypes.SET_USER,
        user: JSON.parse(tmpUser),
        keepalive: true
      });
    }
  }, [dispatch]);
  

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
