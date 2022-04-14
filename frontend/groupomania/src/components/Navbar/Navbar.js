import React, {useState} from 'react'
import './Navbar.css'
import Icon from './icon.svg'
import SignIn from '../AuthForm/SignIn';
import SignUp from '../AuthForm/SignUp';

export default function Navbar() {

    const [signIn, setSignIn] = useState(true);
    const [signUp, setSignUp] = useState(false);

    const handleModalsUp = (e) => {
        if(e.target.id === "register") {
            setSignUp(true);
            setSignIn(false);
        }
    };

    const handleModalsIn = (e) => {
        if(e.target.id === "login") {
            setSignIn(true);
            setSignUp(false);
        }
    };


    return (
        
        <div className="container-navbar">

            <div className="container-icon">
                <img src={Icon} />
            </div>

            <nav className='nav'>

                <button id="login" onClick={handleModalsIn} className={signIn ? "btn-active" : "button-passive"}>Connexion</button>
                <button id="register" onClick={handleModalsUp} className={signUp ? "btn-active" : "button-passive"}>Inscription</button>

            </nav>

            {signIn && <SignIn/>}
            {signUp && <SignUp/>}

        </div>

    )
}
