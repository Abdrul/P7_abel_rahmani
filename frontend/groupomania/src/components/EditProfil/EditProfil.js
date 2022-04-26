import React, {useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getOneUser} from '../../feature/fetchUser.slice'
import { Link } from 'react-router-dom';
// import de la fonction pour recup le token d'auth 
import authHeader from '../AuthHeader'
import IconLogo from '../../assets/iconLogo.svg'
import IconLogout from '../../assets/iconLogout.svg'
import IconHome from '../../assets/iconHome.svg'
import Pdp from '../../assets/pdp.svg'
import IconEdit from '../../assets/iconEdit.svg'
import IconCheck from '../../assets/iconCheck.svg'
import './EditProfil.css'


export default function EditProfil() {

  const [error, setError] = useState();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState('');
  const [sendFile, setSendFile] = useState(false);


  // id de l'utilisateur stocke dans le localstorage
  const id = JSON.parse(localStorage.getItem('user'));

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.dataUsers);



  // function get one user by id

  useEffect(() => {
    const fetchOneUser = async () => {
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
    }
    fetchOneUser()
  }, [dispatch]);

  useEffect(() => {
    if(user) {
      setForm({
        email: user.email,
        firstname: user.firstname,
        imageUrl: user.imageUrl,
        image: null
      });
    }
  }, [user]);

  //function edit profil

  async function fetchEditUser() {
    try {

      let formData = new FormData();
      formData.append('image', form.image);
      formData.append('email', form.email);
      formData.append('firstname', form.firstname);

      let response = await fetch(`http://localhost:8080/api/user/${id}`, {
          method: 'PUT',
          headers : {
            "Authorization": authHeader(),
            },

            body: formData
        });
        let data = await response.json();

        if(data.data.errors) {
          setError('Le prénom doit contenir uniquement des caractères alphanumérique')
        } else {
          setError();
        }

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

    } catch (err) {
        console.log(err);
    };
  };



  //Function display input and edit profil with api

  const modifyButton = () => {
    setEdit(!edit);
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

    setSendFile(!sendFile);

    const files = e.target.files[0];

    setForm({
      ...form,
      imageUrl: URL.createObjectURL(e.target.files[0]),
      image: files
    })

    // fetchEditUser();

  };

  const validEditImg = () => {
    fetchEditUser();
    setSendFile(false);
  }

  //clearLS from icon logout

  const clearStorage = () => {
    localStorage.clear();
  };

  // function submit

  const validEditButton = (e) => {
    e.preventDefault();
    setEdit(false);
    fetchEditUser();
  };
  
  // function deletebutton

  const deleteProfil = () => {
    fetchDeleteUser();
    localStorage.clear();
  };


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
                <img src={form.imageUrl ? form.imageUrl : Pdp} alt="photo-de-profil" className='profil-picture'/>
                {sendFile && <img onClick={validEditImg} src={IconCheck} alt="icon-check" className='icon-check' />}
                <label htmlFor="file" >
                  <img src={IconEdit} alt="icon-edit" className='icon-edit'  />
                </label>
                  <input onChange={editPicture} name="file" id="file" type="file" accept='image/png, image/jpeg, image/jpg' />
              </div>
            </div>

            <p className='error-firstname-edit-profil'>{error}</p>

        {edit ? (
          
        <form onSubmit={validEditButton} className='information-edit-profil'>

          <label htmlFor="email">Votre email</label>
          <input onChange={handleModifyProfil} defaultValue={form.email} name="email" type="email" />

          <label htmlFor="firstname">Votre nom</label>
          <input onChange={handleModifyProfil} defaultValue={form.firstname} name="firstname" />

          <button className='btn-valid-edit'>Valider</button>

        </form>

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
            <button className='btn-delete-profil' onClick={deleteProfil}>Supprimer votre compte</button>
            </Link>
          </div>

      </div>

    </div>

  )
}
