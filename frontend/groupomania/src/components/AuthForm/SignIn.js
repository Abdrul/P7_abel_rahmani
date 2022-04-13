import React,{useState, useRef} from 'react'
import './AuthForm.css'
import { Navigate, useNavigate } from 'react-router-dom';

export default function SignIn() {

    const navigate = useNavigate();

    const [error, setError] = useState('');

    const inputs = useRef([]);
    
    const addInputs = element => {
        if(element && !inputs.current.includes(element)) {
            inputs.current.push(element);
        };
    }; 

    async function handleSubmit(e) {
        e.preventDefault();
        
        const email = inputs.current[0].value;
        const password = inputs.current[1].value;
        
        try {

            if(email, password) {
                            
                let response = await fetch('http://localhost:8080/api/auth/login', {
                    method: 'POST',
                    body : JSON.stringify({
                        email: email,
                        password: password
                    }),
                    headers : {
                        "Content-Type": "application/json",
                    },
                })
                
                let data = await response.json();
                navigate('/home')
                return data
            } else {
                setError('Email ou mot de passe invalide')
            }
                
        } catch(error) {
            console.log(error);
        };
    };


    return (
        <div className='global-modal'>

            <div className="container-modal">

                <form onSubmit={handleSubmit} className="form-auth">

                    <h2>Connexion</h2>

                    <p className='error-sign'>
                    {error}
                    </p>

                    <label htmlFor="mail">Votre email</label>
                    <input ref={addInputs} type="email" id='mail' />

                    <label htmlFor="psw">Votre mot de passe</label>
                    <input ref={addInputs} type="password" id='psw'/>

                    <button className='btn-log'>Se connecter</button>

                </form>

                <p className='bottom-help-txt'>Vous n'avez pas de compte ?</p>

            </div>

        </div>
    )
}
