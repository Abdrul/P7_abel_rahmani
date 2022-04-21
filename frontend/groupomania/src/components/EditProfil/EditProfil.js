import React, {useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getOneUser} from '../../redux/redux'
import { Link } from 'react-router-dom';
// import de la fonction pour recup le token d'auth 
import authHeader from '../AuthHeader'
import IconLogo from '../../assets/iconLogo.svg'
import IconLogout from '../../assets/iconLogout.svg'
import IconHome from '../../assets/iconHome.svg'
import Pdp from '../../assets/pdp.svg'
import IconEdit from '../../assets/iconEdit.svg'
import './EditProfil.css'


export default function EditProfil() {


  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState('');
  const [image, setImage] = useState(Pdp);


  // id de l'utilisateur stocke dans le localstorage
  const id = JSON.parse(localStorage.getItem('user'));

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // const user2 = useSelector((state) => console.log(state));
  // console.log(user);

  // function get one user by id

  async function fetchOneUser() {
      try {
          let response = await fetch(`http://localhost:8080/api/user/${id}`, {
              method: 'GET',
              headers : {
                "Authorization": authHeader()
              }
          });
          
          let data = await response.json();

          dispatch(getOneUser(data.data));

      } catch (err) {
          console.log(err);
      };
  };

  //function edit profil

  async function fetchEditUser() {
    try {
      let response = await fetch(`http://localhost:8080/api/user/${id}`, {
          method: 'PUT',
          headers : {
            "Content-Type": "application/json",
            "Authorization": authHeader()
            },

          body: JSON.stringify({
            email: form.email,
            firstname: form.firstname
          })
          
        });
        
        let data = await response.json();
        console.log(data);


    } catch (err) {
        console.log(err);
    };
  };

  async function fetchDeleteUser() {
    try {
      let response = await fetch(`http://localhost:8080/api/user/${id}`, {
          method: 'DELETE',
          headers : {
            "Authorization": authHeader()
            }
        });
        
        let data = await response.json();

    } catch (err) {
        console.log(err);
    };
  }


  // use effect pour faire appel a l'api qu'une fois
  
  useEffect(() => {
    fetchOneUser();

  }, []);

  // use effect pour recuperer les donnees une fois

  useEffect(() => {
    if(user) {
      setForm({
        email: user.email,
        firstname: user.firstname
      })
    }
  }, [user]);

  //Function display input and edit profil with api

  const modifyButton = (e) => {
    setEdit(!edit);
    // fetchEditUser()
    // setTestButton('Valider')
  };

  // onchange input to edit profil

  const handleModifyProfil = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  //onchange input edit photo de profil

  const editPicture = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    };
  };

  //clearLS

  const clearStorage = () => {
    localStorage.clear();
  };

  const validEditButton = () => {
    setEdit(false);
    fetchEditUser();
  };

  const testDelete = () => {
    fetchDeleteUser();
  }


  return (
    <div className='container-edit'>

      <nav className='nav-edit-profil'>

        <div className='icon-logo-edit-profil'>
            <img src={IconLogo} alt="icon-logo" />
        </div>

          <h1>Votre Profil</h1>

        <div className='icon-home-logout-edit-profil'> 

          <div className='icon-home-edit-profil'>
            <Link to="/home">
              <img src={IconHome} alt="icon-home" />
            </Link>
          </div>
          <div className='icon-logout-edit-profil'>
            <Link to="/" onClick={clearStorage}>
            <img src={IconLogout} alt="icon-logout" />
            </Link>
          </div>

        </div>

      </nav>

      <div className='div-edit-profil'>

          <div className='div-img-profil'>
            <div className='update-img'>
              <img src={image} alt="photo-de-profil" className='profil-picture'/>
              <label htmlFor="file" >
                <img src={IconEdit} alt="icon-edit" className='icon-edit'  />
              </label>
                <input onChange={editPicture} name="file" id="file" type="file" accept='image/png, image/jpeg, image/jpg' />
            </div>
          </div>

            {edit ? (
              
          <div className='information-edit-profil'>

            <label htmlFor="email">Votre email</label>
            <input onChange={handleModifyProfil} defaultValue={form.email} name="email" />

            <label htmlFor="firstname">Votre nom</label>
            <input onChange={handleModifyProfil} defaultValue={form.firstname} name="firstname" />

            <button className='btn-valid-edit' onClick={validEditButton}>Valider</button>

          </div>

          ) : (
          <div className='information-profil'>
            <div>
              <p> Email : {form.email} </p>
              <p> Prénom : {form.firstname} </p>
            </div>
          </div>
            )}

            <div>
              <button className='btn-edit' onClick={modifyButton} >Modifer votre profil</button>
              <Link to='/'>
              <button onClick={testDelete}>Supprimer votre compte</button>
              </Link>
            </div>

      </div>

    </div>

  )
}
