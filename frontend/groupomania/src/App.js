import './App.css';
import Home from './pages/Home';
import Thread from './pages/Thread';
import Profil from './pages/Profil';
import {Routes, Route} from 'react-router-dom'
import Error from './components/Error';
import Admin from './pages/Admin';
import {TokenContext} from './components/AuthProvider'
import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'




function App() {

  const user = useSelector(state => state.user2.dataUser2)



  return (
    <div className='body-app'>


        <Routes>

          <Route path='/' element={<Home/>} />

          <Route path='/home' element={user.user?.admin ? <Admin/>: <Thread/>} />

          <Route path='/profil' element={user.token ? <Profil/>: <Error/>  } />

        </Routes>

    </div>
  );
}

export default App;
