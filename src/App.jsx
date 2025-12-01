import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './components/About';
// import Services from './components/Services';
import Contact from './components/Contact';
import Confirmation from './pages/Confirmation';
import ServicesPage from './pages/ServicesPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="App">
      <Navbar />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;