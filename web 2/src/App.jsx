import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Signin from './Pages/Signin'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Perfil from './Pages/Perfil';
import NewMidia from './Pages/NewMidia';
import OtherPerfil from './Pages/OtherPerfil';
import ViewMidia from './Pages/ViewMidia';
import Plalyst from './Pages/Playlists';
import Radio from './Pages/Radio';


export default function App() {


  

  return (

    <div>

      <Router>
        
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/perfil' element={<Perfil />}></Route>
          <Route path='/createMidia' element={<NewMidia />}></Route>
          <Route path='/otherPerfil' element={<OtherPerfil />}></Route>
          <Route path='viewMidia' element={<ViewMidia />}></Route>
          <Route path='playlists' element={<Plalyst />}></Route>
          <Route path='/Radio' element={<Radio />}></Route>

        </Routes>

      </Router>

    </div>
  )
}
