import React,{useState} from 'react';
import IconLogo from '../../assets/iconLogo.svg'
import IconLogout from '../../assets/iconLogout.svg'
import IconProfil from '../../assets/iconProfil.svg'
import { Link } from 'react-router-dom';
import './Navbar.css'

export default function Navbar() {

  const clearStorage = () => {
    localStorage.clear();
  };


  return (
    <nav className='nav-home'>

        <div className='container-img'>

          <div className='container-home-icon'>
            <Link to='/home'>
            <img src={IconLogo} alt="icon-logo" className='icon-home' />
            </Link>
            <p>Groupomania</p>
          </div>

          <div className='container-logout-profil-icon'>

            <div className='container-profil-icon'>
              <Link to='/profil'>
                <img src={IconProfil} alt="icon-profil" className='icon-profil' />
                <p>Mon profil</p>
              </Link>
            </div>

            <div className='container-logout-icon'>
              <Link to='/' onClick={clearStorage}>
                <img src={IconLogout} alt="icon-logout" className='icon-logout' />
                <p>Déconnexion</p>
              </Link>
            </div>

          </div>

        </div>

    </nav>
  )
}
