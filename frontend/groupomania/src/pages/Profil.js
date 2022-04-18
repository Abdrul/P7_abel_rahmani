import React, {useContext} from 'react'
import './Profil.css'
import { useDispatch, useSelector } from 'react-redux';
import { UuidContext } from '../components/Appcontext';
import { getUser } from '../redux/redux';



export default function Profil() {

    const testUser = useContext(UuidContext);
    console.log(testUser);

    async function test() {
        try {
            let response = await fetch(`http://localhost:8080/api/user`, {
                method: 'GET',
                headers : testUser,
            })
            
            let data = await response.json();

            console.log(data);

        } catch (err) {
            console.log(err);
        }

    }
    test()

    // const user = useSelector(state => console.log(state));
    // const dispatch = useDispatch();

    return (
        <div>
            {/* {uuid ? "token" : "pas token"} */}
            <h1>Bienvenue sur votre profil : </h1>

        </div>
    )
}
