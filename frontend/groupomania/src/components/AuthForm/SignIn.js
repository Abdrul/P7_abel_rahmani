import React,{useState, useRef} from 'react'
import './AuthForm.css'

export default function SignIn() {

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

            console.log(await response.json()); 
            return setError(await response.json()) 
        
        } catch(error) {
            console.log(error);
        };
    };


    return (
        <div className='global-modal'>

            <div className="container-modal">

                <form onSubmit={handleSubmit} className="form-auth">

                    <h2>Connexion</h2>

                    <label htmlFor="mail">Votre email</label>
                    <input ref={addInputs} type="email" id='mail' />

                    {error}
                    <label htmlFor="psw">Votre mot de passe</label>
                    <input ref={addInputs} type="password" id='psw'/>

                    <button className='btn-log'>Se connecter</button>

                </form>

                <p className='bottom-help-txt'>Vous n'avez pas de compte ?</p>

            </div>

        </div>
    )
}
