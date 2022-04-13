import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import {Routes, Route} from 'react-router-dom'
import SignIn from './components/AuthForm/SignIn';
import SignUp from './components/AuthForm/SignUp';


function App() {
  return (
    <>
      
      <Routes>

        <Route path='/' element={<Navbar/>} />

        <Route path='/home' element={<Home/>} />

      </Routes>


    </>
  );
}

export default App;
