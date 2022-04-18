import React,{useState} from 'react';
import IconHome from '../../assets/iconHome.svg'
import IconLogout from '../../assets/iconLogout.svg'
import IconProfil from '../../assets/iconProfil.svg'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Navbar.css'

export default function Navbar() {

  const test = () => {
    localStorage.clear();
  };


  return (
    <nav className='nav-home'>

        <div className='container-img'>

          <div className='container-home-icon'>
            <Link to='/home'>
            <img src={IconHome} alt="" className='icon-home' />
            </Link>
            <p>Groupomania</p>
          </div>

          <div className='container-logout-profil-icon'>

            <div className='container-profil-icon'>
              <Link to='/profil'>
                <img src={IconProfil} alt="" className='icon-profil' />
                <p>Mon profil</p>
              </Link>
            </div>

            <div className='container-logout-icon'>
              <Link to='/' onClick={test}>
                <img src={IconLogout} alt="" className='icon-logout' />
                <p>Déconnexion</p>
              </Link>
            </div>

          </div>

        </div>

    </nav>
  )
}
