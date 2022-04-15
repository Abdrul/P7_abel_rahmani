import React, {useState} from 'react'
import './Home.css'
import Icon from '../assets/icon.svg'
import SignIn from '../components/AuthForm/SignIn';
import SignUp from '../components/AuthForm/SignUp';

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

            {signIn && <SignIn modalUp={handleModalsUp}/>}
            {signUp && <SignUp modalIn={handleModalsIn}/>}

        </div>

    )
}
