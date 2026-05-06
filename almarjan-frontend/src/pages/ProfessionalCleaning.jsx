import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const API = "https://almarjan-backend-rt2o.onrender.com"

const ProfessionalCleaning = ({ user, lang }) => {
  const [form, setForm] = useState({
    area: "Inspection",
    propertyType: "Inspection",
    cleaningType: "Professional",
    locationLink: "",
    areaName: "",
    houseNumber: "",
    date: "",
    time: "",
    notes: "",
    paymentMethod: "whatsapp"
  })

  const [createdBooking, setCreatedBooking] = useState(null)
  const [error, setError] = useState("")

  if (!user) {
    return (
      <section className="professional-page" dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="professional-login-box">
          <h2>{lang === "ar" ? "سجل دخول عشان تحجز معاينة" : "Sign in to book inspection"}</h2>
          <Link to="/login" className="main-btn">
            {lang === "ar" ? "تسجيل الدخول" : "Sign In"}
          </Link>
        </div>
      </section>
    )
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert(lang === "ar" ? "الموقع غير مدعوم" : "Location not supported")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        const link = `https://www.google.com/maps?q=${lat},${lng}`

        setForm({ ...form, locationLink: link })
      },
      () => {
        alert(lang === "ar" ? "ما قدرنا نجيب الموقع" : "Could not get location")
      }
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!form.locationLink) {
      setError(lang === "ar" ? "حدد موقعك أول" : "Please select your location first")
      return
    }

    try {
      const token = localStorage.getItem("token")

      const res = await axios.post(`${API}/bookings`, form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setCreatedBooking(res.data)
    } catch {
      setError(lang === "ar" ? "صار خطأ في حجز المعاينة" : "Inspection booking failed")
    }
  }

  const openWhatsapp = () => {
    const msg = `
Hello Al Marjan Cleaning

Professional Cleaning Inspection Booking

Booking ID: ${createdBooking._id}
Name: ${createdBooking.customerName}
Phone: ${createdBooking.phone}
Area: ${createdBooking.areaName}
House Number: ${createdBooking.houseNumber}
Location: ${createdBooking.locationLink}
Date: ${createdBooking.date}
Time: ${createdBooking.time}
Notes: ${createdBooking.notes || "No notes"}
`

    window.open(`https://wa.me/97366937709?text=${encodeURIComponent(msg)}`, "_blank")
  }

  return (
    <main className="professional-page" dir={lang === "ar" ? "rtl" : "ltr"}>
      <section className="professional-hero">
        <div className="professional-text">
          <span>{lang === "ar" ? "تنظيف احترافي" : "Professional Cleaning"}</span>

          <h1>
            {lang === "ar"
              ? "معاينة قبل السعر لتنظيف أدق"
              : "Inspection Before Pricing for Better Cleaning"}
          </h1>

          <p>
            {lang === "ar"
              ? "هذه الخدمة مخصصة للتنظيف العميق والمواد المتخصصة. نحجز معاينة أولًا ونحدد السعر حسب الحالة."
              : "This service is for deep cleaning and specialized materials. We inspect first, then provide the final price."}
          </p>
        </div>

        <div className="professional-image-card">
          <div className="professional-image"></div>
        </div>
      </section>

      <section className="inspection-section">
        <div className="inspection-form-card">
          <h2>{lang === "ar" ? "حجز موعد معاينة" : "Book Inspection Appointment"}</h2>

          <form onSubmit={handleSubmit}>
            <button type="button" className="location-btn" onClick={getLocation}>
              {lang === "ar" ? "حدد موقعي من خرائط قوقل" : "Get Google Maps Location"}
            </button>

            {form.locationLink && (
              <div className="price-preview">
                {lang === "ar" ? "تم تحديد الموقع" : "Location selected"} ✅
              </div>
            )}

            <input
              name="areaName"
              value={form.areaName}
              onChange={handleChange}
              placeholder={lang === "ar" ? "اسم المنطقة" : "Area Name"}
              required
            />

            <input
              name="houseNumber"
              value={form.houseNumber}
              onChange={handleChange}
              placeholder={lang === "ar" ? "رقم المنزل" : "House Number"}
              required
            />

            <div className="date-row">
              <input name="date" type="date" value={form.date} onChange={handleChange} required />
              <input name="time" type="time" value={form.time} onChange={handleChange} required />
            </div>

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder={lang === "ar" ? "اكتب تفاصيل التنظيف المطلوب" : "Write cleaning details"}
            />

            <div className="price-preview">
              {lang === "ar"
                ? "السعر يحدد بعد المعاينة"
                : "Price will be provided after inspection"}
            </div>

            <button className="gold-btn">
              {lang === "ar" ? "حجز المعاينة" : "Book Inspection"}
            </button>
          </form>

          {error && <p className="error-text">{error}</p>}
        </div>

        {createdBooking && (
          <div className="inspection-success">
            <h2>{lang === "ar" ? "تم حجز المعاينة" : "Inspection Booked"}</h2>
            <p>Booking ID: {createdBooking._id}</p>
            <button onClick={openWhatsapp}>
              {lang === "ar" ? "تواصل عبر الواتساب" : "Continue on WhatsApp"}
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

export default ProfessionalCleaning
