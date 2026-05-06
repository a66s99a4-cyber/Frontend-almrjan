import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/logo.jpeg"

const Navbar = ({ user, setUser, lang, setLang }) => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    navigate("/")
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo-wrap">
        <img src={logo} alt="Al Marjan Logo" className="nav-logo" />
        <span>{lang === "ar" ? "المرجان للتنظيف" : "Al Marjan Cleaning"}</span>
      </Link>

      <div className="nav-links">
        <Link to="/">{lang === "ar" ? "الرئيسية" : "Home"}</Link>
        <Link to="/basic-cleaning">{lang === "ar" ? "تنظيف عادي" : "Basic"}</Link>
        <Link to="/professional-cleaning">{lang === "ar" ? "تنظيف احترافي" : "Professional"}</Link>
        <Link to="/our-work">{lang === "ar" ? "أعمالنا" : "Our Work"}</Link>

        {user?.role === "admin" && (
          <Link to="/admin">{lang === "ar" ? "الأدمن" : "Admin"}</Link>
        )}

        <button onClick={() => setLang(lang === "ar" ? "en" : "ar")}>
          {lang === "ar" ? "EN" : "AR"}
        </button>

        {!user ? (
          <>
            <Link to="/login">{lang === "ar" ? "دخول" : "Login"}</Link>
            <Link to="/register" className="nav-btn">
              {lang === "ar" ? "تسجيل" : "Register"}
            </Link>
          </>
        ) : (
          <button className="nav-btn" onClick={logout}>
            {lang === "ar" ? "خروج" : "Logout"}
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
