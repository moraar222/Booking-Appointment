import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Salon from "./pages/salon/Salon";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/salons" element={<List/>}/>
        <Route path="/salons/:id" element={<Salon/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
