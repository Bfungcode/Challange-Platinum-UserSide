import React from 'react'
import './App.css';
import { Routes, Route } from "react-router-dom"
import './styling/Header.css'
import './styling/Content.css'
import './styling/Footer.css'
import './styling/detailMobil.css'
import './styling/Carimobil.css'
import './styling/Cari.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import LandingPage from './pages/LandingPage';
import Pencarian from './pages/Pencarian';
import DetailMobil from './components/DetailMobil';
import Pembayaran from './components/Pembayaran';
import Tiket from './components/Tiket';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='SewaMobil'>
        <Route index element={<Pencarian />} />
        <Route path=':id' element={<DetailMobil />} />
      </Route>
      <Route path='Pembayaran'>
        <Route index element={<DetailMobil />} />
        <Route path=':id' element={<Pembayaran />} />
      </Route>
      <Route path='Tiket' element={<Tiket />} />
    </Routes >
  )
}

export default App;
