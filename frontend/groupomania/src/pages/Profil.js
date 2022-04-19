import React, {useContext, useState, useEffect} from 'react'
import './Profil.css'
import { useDispatch, useSelector } from 'react-redux';
import { getOneUser } from '../redux/redux';
import authHeader from '../components/AuthHeader';

export default function Profil() {


    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    console.log(user);


    
    useEffect(() => {

        async function fetchOneUser() {
            try {
                const id = JSON.parse(localStorage.getItem('user'));
                let response = await fetch(`http://localhost:8080/api/user/${id}`, {
                    method: 'GET',
                    headers : authHeader(),
                })
                
                let data = await response.json();
    
                dispatch(getOneUser(data.data))
    
                // console.log(data.data);
                
            } catch (err) {
                console.log(err);
            }
    
        };
        
        fetchOneUser();

    }, []);



    return (
        <div>

            <h1>Bienvenue sur votre profil : {user.email} </h1>
            <h1>Bienvenue sur votre profil : {user.firstname} </h1>


        </div>
    )
}
