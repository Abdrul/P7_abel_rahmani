import './App.css';
import Home from './pages/Home';
import Thread from './pages/Thread';
import {Routes, Route} from 'react-router-dom'



function App() {
  return (
    <>
      
      <Routes>

        <Route path='/' element={<Home/>} />

        <Route path='/home' element={<Thread/>} />

      </Routes>


    </>
  );
}

export default App;
