import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Editprofile from './components/Editprofile';
import { useSelector } from 'react-redux';
import Create from './components/Create';
import Editpost from './components/Editpost';
import Addcomment from './components/Addcomment';
import Followers from './components/Followers';
import Following from './components/Following';
import People from './components/People';
function App() {
  const isAuthenticated = useSelector(state=>state.user.auth)
  return (
    <Router>
      {isAuthenticated && <Navbar/>}
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/people' element={<People/>}/>
        <Route path='/profile/:id' element={<Profile/>}/>
        <Route path='/profile/:id/edit' element={<Editprofile/>}/>
        <Route path='/profile/:id/following' element={<Following/>}/>
        <Route path='/profile/:id/followers' element={<Followers/>}/>
        <Route path='/post/edit/:id' element={<Editpost/>}/>
        <Route path='/comment/:id' element={<Addcomment/>}/>
      </Routes>
    </Router>
  )
}

export default App
