import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WorldMap from './pages/WorldMap';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';
import PosteazaSubiect from './pages/PosteazaSubiect';
import WelcomePage from './pages/WelcomePage';
import Subiecte from './pages/Subiecte';
import ViewSubiect from './pages/ViewSubiect';
import Game from './pages/Game';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar/>
        <div className="pt-[80px]">
          <Routes> 
            <Route path = "*" element={<NotFound/>}/>
            <Route path = "/WorldMap" element={<WorldMap/>}/>
            <Route path = "/" element={<HomePage/>}/>
            <Route path = "/home" element={<HomePage/>}/>
            <Route path = "/homepage" element={<HomePage/>}/>
            <Route path = "/welcome" element={<WelcomePage/>}/>
            <Route path = "/signup" element={<SignUp/>}/>
            <Route path = "/signin" element={<SignIn/>}/>
            <Route path = "/subiecte/posteaza" element={<PosteazaSubiect/>}/>
            <Route path="/subiecte/:materie" element={<Subiecte/>}/>
            <Route path="/subiecte/:materie/:subiectId" element={<ViewSubiect/>}/>
            <Route path="/joc" element={<Game/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
