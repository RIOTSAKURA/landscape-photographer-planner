import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TripPage from './pages/TripPage';
import TripDetailPage from './pages/TripDetailPage';
import SpotSearchPage from './pages/SpotSearchPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/trips" element={<TripPage />} />
          <Route path="/trips/:id" element={<TripDetailPage />} />
          <Route path="/spots" element={<SpotSearchPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
