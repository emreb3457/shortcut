import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom"
import ProtectedRoute from "./utils/ProtectedRoute"
import Home from './pages/Home';
import LocationAdmin from './pages/Location';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/location" element={<ProtectedRoute isAdmin={true}><LocationAdmin /></ProtectedRoute>} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
