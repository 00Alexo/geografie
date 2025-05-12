import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WorldMap from './pages/WorldMap';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';
import PosteazaSubiect from './pages/PosteazaSubiect';
import WelcomePage from './pages/WelcomePage';
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
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
