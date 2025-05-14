import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EmotionDetail from './pages/EmotionDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans antialiased">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/emotion/:id" element={<EmotionDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 