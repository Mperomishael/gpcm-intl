// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import AdminPage from './pages/AdminPage.tsx';
import AboutPage from './pages/about/AboutPage.tsx';
import GeneralOverseerPage from './pages/general-overseer/GeneralOverseerPage.tsx';
import LivePage from './pages/live/LivePage.tsx';
import MinistriesPage from './pages/ministries/MinistriesPage.tsx';
import ContactPage from './pages/contact/ContactPage.tsx';
import GivePage from './pages/give/GivePage.tsx';
import GalleryPage from './pages/gallery/GalleryPage.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/General-Overseer" element={<GeneralOverseerPage />} />
        <Route path="/live" element={<LivePage />} />
        <Route path="/ministries" element={<MinistriesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/give" element={<GivePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
