import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WorldMap from './pages/WorldMap';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar/>
        <div className="pt-[80px]">
          <Routes> 
            <Route path = "/WorldMap" element={<WorldMap/>}/>
            <Route path = "/" element={<HomePage/>}/>
            <Route path = "/signup" element={<SignUp/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
