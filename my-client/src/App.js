import './App.css';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import { BrowserRouter as Router,Routes , Route } from 'react-router-dom';
import Editform from './Editform';
function App() {
  return (
    <div className="App">
     {/* <Login/> */}
     <Router>
      <Routes>
      <Route exact path="/" element={<Register/>} />  
      <Route path="/Login" element={<Login/>} />  
      <Route path="/Dashboard" element={<Dashboard/>} />  
      <Route path="/Editform/:id" element={<Editform/>} />  
      </Routes>
     </Router>
    </div>
  );
}

export default App;
