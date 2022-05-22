import './App.css';
import Home from './pages/Home';
import Thread from './pages/Thread';
import Profil from './pages/Profil';
import {Routes, Route} from 'react-router-dom'
import Error from './components/Error';
import Admin from './pages/Admin';




function App() {

  const token = JSON.parse(localStorage.getItem('token'));
  // console.log(token);

  return (
    <div className='body-app'>
        

        <Routes>

          <Route path='/' element={<Home/>} />

          <Route path='/home' element={<Thread/>} />

          <Route path='homeAdmin' element={<Admin/>} />

          <Route path='/profil' element={token ? <Profil/> : <Error/>} />

        </Routes>





    </div>
  );
}

export default App;
