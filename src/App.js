import './App.css';
import  { BrowserRouter as Router, Routes, Route } from  'react-router-dom';
import Admin from './components/pages/Admin';
import Landing from './components/pages/Landing';
import Login from './components/pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Admin" element={<Admin />} />
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
