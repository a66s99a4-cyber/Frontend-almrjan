import { useState } from "react"
import axios from "axios"

const API = "https://almarjan-backend-rt2o.onrender.com"

const ProfessionalCleaning = ({ lang }) => {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    area: "Inspection",
    propertyType: "Inspection",
    cleaningType: "Professional",
    locationLink: "",
    areaName: "",
    houseNumber: "",
    date: "",
    notes: "",
    paymentMethod: "whatsapp"
  })

  const [createdBooking, setCreatedBooking] = useState(null)
  const [error, setError] = useState("")

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

    if (!form.customerName || !form.phone) {
      setError(lang === "ar" ? "اكتب الاسم ورقم التلفون" : "Enter name and phone")
      return
    }

    if (!form.locationLink) {
      setError(lang === "ar" ? "حدد موقعك أول" : "Please select your location first")
      return
    }

    try {
      const res = await axios.post(`${API}/bookings`, form)
      setCreatedBooking(res.data)
      window.scrollTo({ top: 0, behavior: "smooth" })
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
Notes: ${createdBooking.notes || "No notes"}
`

    window.open(`https://wa.me/97366937709?text=${encodeURIComponent(msg)}`, "_blank")
  }

  if (createdBooking) {
    return (
      <section className="booking-success-page" dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="receipt-card mega-success">
          <div className="success-icon">✓</div>

          <h2>{lang === "ar" ? "تم حجز المعاينة" : "Inspection Booked"}</h2>

          <p>
            {lang === "ar"
              ? "تم حفظ طلبك، تواصل معنا في الواتساب لتأكيد المعاينة."
              : "Your request is saved. Contact us on WhatsApp to confirm."}
          </p>

          <button className="whatsapp-big-btn" onClick={openWhatsapp}>
            {lang === "ar" ? "تأكيد عبر الواتساب" : "Confirm on WhatsApp"}
          </button>
        </div>
      </section>
    )
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
              ? "بدون تسجيل دخول، احجز موعد معاينة ونرد عليك عبر الواتساب."
              : "No login needed. Book an inspection and we will contact you on WhatsApp."}
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
            <input
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              placeholder={lang === "ar" ? "اسم الزبون" : "Customer Name"}
              required
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder={lang === "ar" ? "رقم التلفون" : "Phone Number"}
              required
            />

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
            />

            <input name="date" type="date" value={form.date} onChange={handleChange} required />

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
      </section>
    </main>
  )
}

export default ProfessionalCleaning
