import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const API = "https://almarjan-backend-rt2o.onrender.com"

const Login = ({ setUser }) => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
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
      const res = await axios.post(`${API}/auth/login`, form)

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))

      setUser(res.data.user)
      navigate("/")
    } catch (error) {
      alert("Invalid email or password")
    }
  }

  return (
    <section className="section">
      <h2>Sign In</h2>

      <form className="form-box" onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button>Sign In</button>
      </form>
    </section>
  )
}

export default Login
