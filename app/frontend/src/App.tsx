import './App.css';
import ContextProvider from './context/ContextProvider';
import Login from './pages/Login';
import {Route, Routes} from 'react-router-dom';
import Register from './pages/Register';
import HomePage from './pages/Homepage';
function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepage/:id" element={<HomePage />} />
        </Routes>
      </ContextProvider>
    </div>
  );
}

export default App;
