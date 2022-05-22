import './App.css';
import Home from './pages/Home';
import Thread from './pages/Thread';
import Profil from './pages/Profil';
import {Routes, Route} from 'react-router-dom'
import Error from './components/Error';
import Admin from './components/Admin/Admin';



function App() {

  const token = JSON.parse(localStorage.getItem('token'));
  const admin = JSON.parse(localStorage.getItem('admin'));

  return (
    <div className='body-app'>
        

        <Routes>

          <Route path='/' element={<Home/>} />

          {admin ?
          <Route path='/home' element={<Admin/>} />
          : <Route path='/home' element={<Thread/>} />
          }

          {token ?
          <Route path='/profil' element={<Profil/>} />
          : <Route path='/profil' element={<Error/>} />
          }

        </Routes>


    </div>
  );
}

export default App;
