import './App.css';
import Home from './pages/Home';
import Thread from './pages/Thread';
import Profil from './pages/Profil';
import {Routes, Route} from 'react-router-dom'



function App() {

  const token = JSON.parse(localStorage.getItem('token'));

  return (
    <div className='body-app'>
        

        <Routes>

          <Route path='/' element={<Home/>} />

          <Route path='/home' element={<Thread/>} />

          {token ?
          <Route path='/profil' element={<Profil/>} />
          : "pas accès"
          }

        </Routes>


    </div>
  );
}

export default App;
