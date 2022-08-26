import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom"
import ProtectedRoute from "./utils/ProtectedRoute"
import Home from './pages/Home';
import Location from './pages/Location';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/location" element={<ProtectedRoute><Location /></ProtectedRoute>} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
