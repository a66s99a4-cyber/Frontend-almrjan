import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Services from "./pages/Services"
import Pricing from "./pages/Pricing"
import Booking from "./pages/Booking"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Admin from "./pages/Admin"
import OurWork from "./pages/OurWork"
import BasicCleaning from "./pages/BasicCleaning"
import ProfessionalCleaning from "./pages/ProfessionalCleaning"
import About from "./pages/About"

const API = "https://almarjan-backend-rt2o.onrender.com"

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
  const [lang, setLang] = useState("ar")

  useEffect(() => {
    axios
      .post(`${API}/stats/visit`, {
        page: window.location.pathname
      })
      .catch(() => {})
  }, [])

  return (
    <>
      <Navbar user={user} setUser={setUser} lang={lang} setLang={setLang} />

      <Routes>
        <Route path="/" element={<Home user={user} lang={lang} />} />
        <Route path="/services" element={<Services lang={lang} />} />
        <Route path="/pricing" element={<Pricing lang={lang} />} />
        <Route path="/booking" element={<Booking user={user} lang={lang} />} />
        <Route path="/basic-cleaning" element={<BasicCleaning user={user} lang={lang} />} />
        <Route path="/professional-cleaning" element={<ProfessionalCleaning user={user} lang={lang} />} />
        <Route path="/about" element={<About lang={lang} />} />
        <Route path="/login" element={<Login setUser={setUser} lang={lang} />} />
        <Route path="/register" element={<Register lang={lang} />} />
        <Route path="/admin" element={<Admin user={user} lang={lang} />} />
        <Route path="/our-work" element={<OurWork lang={lang} />} />
      </Routes>

      <Footer lang={lang} />
    </>
  )
}

export default App
