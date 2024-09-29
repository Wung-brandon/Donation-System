
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/Home/Home'
import CardDetails from './components/Cards/cardDetails'
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  

  return (
    <>
    <Router>
    <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/card/:id" element={<CardDetails />} />
        </Routes>

    </Router>
      
     
    </>
  )
}

export default App
