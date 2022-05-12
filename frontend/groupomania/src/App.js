import './App.css';
import Home from './pages/Home';
import Thread from './pages/Thread';
import Profil from './pages/Profil';
import {Routes, Route} from 'react-router-dom'



function App() {



  return (
    <div className='body-app'>
        

        <Routes>

          <Route path='/' element={<Home/>} />

          <Route path='/home' element={<Thread/>} />

          <Route path='/profil' element={<Profil/>} />

        </Routes>


    </div>
  );
}

export default App;
