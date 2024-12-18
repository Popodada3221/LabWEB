import "./styles/App.css"

import { Routes, Route, Link } from 'react-router-dom';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { About } from './pages/About';
import { NavBar } from './components/NavBar';
import { Catalogue, routes } from './pages/Catalogue';
import { Contacts } from './pages/Contacts';
import { TourCard } from "./components/TourCard";
import { createContext } from "react";
import { APIContext } from './components/api';
import { Tray } from "./pages/Tray";

function App() {

  const APIContext = createContext()
  return (
    <div className="App">
      <header>
        <NavBar></NavBar>
      </header>

      <Routes>
        <Route path="/Contacts" element={<Contacts />} />
        <Route path="/Catalogue" element={<Catalogue />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/About" element={<About />} />
        <Route path="/Card" element={<Tray />} />
        {routes}

      </Routes>

      <footer>
        <p align="center">PEGAS Touristik — ведущий оператор туристических услуг в РФ и СНГ. © 2024<br /><a href='https://s01.cdn.pegast.ru/get/c8/24/6e/ddedc0dce7aa26c41b7555e4b3ff8c39a8ec3b7f49857d01d33455efb0/%20и%20положение%20о%20мерах%20по%20ЗПД%20Пегас%20Иркутск.pdf' target='_blank'>
          политика конфиденциальности
        </a></p>
      </footer>
    </div>
  );
}

export default App;
