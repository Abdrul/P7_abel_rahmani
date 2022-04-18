import React, {useState, useRef} from 'react'
import './AuthForm.css'

export default function SignUp(props) {

    const [error, setError] = useState('');

    // recuperation input

    const inputs = useRef([]);
    
    const addInputs = element => {
        if(element && !inputs.current.includes(element)) {
            inputs.current.push(element);
        };
    };

    // fonction a l'envoie du formulaire

    async function handleSubmit(e) {
        e.preventDefault();
        
        if(inputs.current[2].value !== inputs.current[3].value) {
            setError('Les mots de passe ne sont pas identiques');
            return;
        };
        
        const email = inputs.current[0].value;
        const firstname = inputs.current[1].value;
        const password = inputs.current[2].value;
        
        try {
            if(email, firstname, password) {

                let response = await fetch('http://localhost:8080/api/auth/signup', {
                    method: 'POST',
                    body : JSON.stringify({
                        email: email,
                        password: password,
                        firstname: firstname
                    }),
                    headers : {
                        "Content-Type": "application/json",
                    },
                });

                let data = await response.json();

                if(data.message === "La tentative à échouée") {
                    setError(data.data.errors[0].message);
                } else if(data.error === "Le mot de passe n'est pas assez fort uppercase,digits") {
                    setError("Le mot de passe doit contenir 8 caratères minimum, et avoir une majuscule et 2 chiffres")
                } else {
                    props.modalIn();
                }
                

            } else {
                setError('Tout les champs doit être remplies');
            }

        } catch(error) {
            console.log(error);
        };
    };


    return (
    <>

        <div className='global-modal'>

            <div className="container-modal">

                <form onSubmit={handleSubmit} className="form-auth">

                    <h2>Inscription</h2>

                    <p className='error-sign'>
                    {error}
                    </p>
                    
                    <label htmlFor="mail">Votre email</label>
                    <input ref={addInputs} type="email" id='mail' />

                    <label htmlFor="firstname">Votre prénom</label>
                    <input ref={addInputs} type="text" id='firstname' />
                    
                    <label htmlFor="psw">Votre mot de passe</label>
                    <input ref={addInputs} type="password" id='psw'/>

                    <label htmlFor="confirm-psw">Confirmez votre mot de passe</label>
                    <input ref={addInputs} type="password" id='confirm-psw'/>

                    <button className='btn-sign'>S'inscrire</button>

                </form>

                <p onClick={props.modalIn} className='bottom-help-txt'>Vous avez déjà un compte ?</p>

            </div>

        </div>
        
    </>
    )
}
