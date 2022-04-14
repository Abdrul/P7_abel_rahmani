import React, {useState} from 'react'
import './Navbar.css'
import Icon from './icon.svg'
import SignIn from '../AuthForm/SignIn';
import SignUp from '../AuthForm/SignUp';

export default function Navbar() {

    const [signIn, setSignIn] = useState(true);
    const [signUp, setSignUp] = useState(false);

    const handleModalsUp = (e) => {

            setSignUp(true);
            setSignIn(false);

    };

    const handleModalsIn = (e) => {

            setSignIn(true);
            setSignUp(false);

    };


    return (
        
        <div className="container-navbar">

            <div className="container-icon">
                <img src={Icon} />
            </div>

            <nav className='nav'>

                <button onClick={handleModalsIn} className={signIn ? "btn-active" : "button-passive"}>Connexion</button>
                <button onClick={handleModalsUp} className={signUp ? "btn-active" : "button-passive"}>Inscription</button>

            </nav>

            {signIn && <SignIn txt2={handleModalsUp}/>}
            {signUp && <SignUp txt={handleModalsIn} txt2={handleModalsUp}/>}

        </div>

    )
}
