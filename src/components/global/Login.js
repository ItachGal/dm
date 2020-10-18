import { Avatar, Button, Checkbox, FormControlLabel } from '@material-ui/core'
import React, {useState} from 'react'
import { auth, provider } from '../../firebase'
import { actionTypes } from '../../reducer'
import { useStateValue } from '../../StateProvider'
import "./Login.css"

function Login() {
    const [{}, dispatch] = useStateValue();
    const [keepaliveFlag, setKeepaliveFlag] = useState(false);

    const signIn = () =>{
        auth.signInWithPopup(provider).then( 
            result => {dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
                keepalive: keepaliveFlag
            });
        }).catch( error => alert(JSON.stringify({keepaliveFlag})));
    }
    return (
        <div className="login">
            <div className="login__container">
                <div className="login__text">
                    <h1>Sign in</h1>
                </div>
                <Button type="submit" onClick={signIn}>
                    <Avatar alt="Sign in with Google" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                </Button>
                <div className="login__keepalive">
                    <FormControlLabel 
                        control={<Checkbox color="default" name="checkedA" onClick={() => {setKeepaliveFlag(prev => !prev)}}/>}
                        label="Stay logged in"
                    />
                </div>
            </div>
        </div>
    )
}

export default Login
