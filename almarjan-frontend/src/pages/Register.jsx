import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const API = "https://almarjan-backend-rt2o.onrender.com"

const Register = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post(`${API}/auth/register`, form)

      navigate("/login")
    } catch (error) {
      alert("Error creating account")
    }
  }

  return (
    <section className="section">
      <h2>Create Account</h2>

      <form className="form-box" onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

        <button>Create Account</button>
      </form>
    </section>
  )
}

export default Register
