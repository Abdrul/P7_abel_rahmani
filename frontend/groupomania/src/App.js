import './App.css';
import Home from './pages/Home';
import Thread from './pages/Thread';
import Profil from './pages/Profil';
import {Routes, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './redux/redux'
// import {useState, useEffect} from 'react';
// import {UuidContext} from './components/Appcontext'
import UuidContextProvider from './components/Appcontext';



function App() {


  return (
    <div className='body-app'>


      <Provider store={store}>
        {/* <UuidContext.Provider value={uuid}> */}


        <UuidContextProvider>
        
        <Routes>

          <Route path='/' element={<Home/>} />

          <Route path='/home' element={<Thread/>} />

          <Route path='/profil' element={<Profil/>} />

        </Routes>

        {/* </UuidContext.Provider>       */}

        </UuidContextProvider>
        
      </Provider>

    </div>
  );
}

export default App;
