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
        <Link to="/pricing" className="nav-highlight">
          {lang === "ar" ? "حاسبة السعر" : "Price Calculator"}
        </Link>
        <Link to="/booking">{lang === "ar" ? "احجز الآن" : "Book Now"}</Link>
        <Link to="/professional-cleaning">
          {lang === "ar" ? "تنظيف احترافي" : "Professional"}
        </Link>
        <Link to="/our-work">{lang === "ar" ? "أعمالنا" : "Our Work"}</Link>

        {user?.role === "admin" && (
          <Link to="/admin">{lang === "ar" ? "الأدمن" : "Admin"}</Link>
        )}

        <button onClick={() => setLang(lang === "ar" ? "en" : "ar")}>
          {lang === "ar" ? "EN" : "AR"}
        </button>

        {user?.role === "admin" ? (
          <button className="nav-btn" onClick={logout}>
            {lang === "ar" ? "خروج" : "Logout"}
          </button>
        ) : (
          <Link to="/login" className="admin-login-link">
            {lang === "ar" ? "دخول الأدمن" : "Admin Login"}
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
