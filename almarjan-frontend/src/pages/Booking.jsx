import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import logo from "../assets/logo.jpeg"

const API = "https://almarjan-backend-rt2o.onrender.com"

const Booking = ({ user, lang }) => {
  const [booking, setBooking] = useState({
    area: "",
    propertyType: "",
    cleaningType: "Basic",
    locationLink: "",
    houseNumber: "",
    date: "",
    time: "",
    notes: "",
    paymentMethod: "whatsapp"
  })

  const [options, setOptions] = useState({ areas: [], propertyTypes: [] })
  const [selectedPrice, setSelectedPrice] = useState(null)
  const [createdBooking, setCreatedBooking] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    axios
      .get(`${API}/prices/options`)
      .then((res) => setOptions(res.data))
      .catch(() => setOptions({ areas: [], propertyTypes: [] }))
  }, [])

  useEffect(() => {
    const getPrice = async () => {
      setSelectedPrice(null)

      if (!booking.area || !booking.propertyType) return

      try {
        const res = await axios.get(`${API}/prices`, {
          params: {
            area: booking.area,
            propertyType: booking.propertyType,
            cleaningType: "Basic"
          }
        })

        setSelectedPrice(res.data.price)
      } catch {
        setSelectedPrice(null)
      }
    }

    getPrice()
  }, [booking.area, booking.propertyType])

  if (!user) {
    return (
      <section className="section" dir={lang === "ar" ? "rtl" : "ltr"}>
        <h2>
          {lang === "ar" ? "لازم تسجل دخول عشان تحجز" : "Please sign in to book"}
        </h2>

        <Link to="/login" className="main-btn">
          {lang === "ar" ? "تسجيل الدخول" : "Sign In"}
        </Link>
      </section>
    )
  }

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value
    })
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert(lang === "ar" ? "الموقع غير مدعوم في جهازك" : "Geolocation is not supported")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        const link = `https://www.google.com/maps?q=${lat},${lng}`

        setBooking({
          ...booking,
          locationLink: link
        })
      },
      () => {
        alert(lang === "ar" ? "ما قدرنا نجيب موقعك" : "Could not get your location")
      }
    )
  }

  const openWhatsapp = (bookingData = createdBooking) => {
    if (!bookingData) return

    const priceText =
      bookingData.price !== null && bookingData.price !== undefined
        ? `${bookingData.price} BHD`
        : "Price not found"

    const msg = `
Hello Al Marjan Cleaning

I completed a booking from the website.

Booking ID: ${bookingData._id}
Name: ${bookingData.customerName}
Phone: ${bookingData.phone}

Service Details:
Cleaning Type: Basic Cleaning
Place Type: ${bookingData.propertyType}
Area: ${bookingData.area}
House Number: ${bookingData.houseNumber}
Location: ${bookingData.locationLink}

Appointment:
Date: ${bookingData.date}
Time: ${bookingData.time}

Price: ${priceText}
Notes: ${bookingData.notes || "No notes"}

Please send me the IBAN/payment details.
`

    window.open(`https://wa.me/97366937709?text=${encodeURIComponent(msg)}`, "_blank")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!booking.locationLink) {
      setError(lang === "ar" ? "لازم تحدد موقعك من الخريطة" : "Please select your location")
      return
    }

    if (selectedPrice === null) {
      setError(lang === "ar" ? "السعر غير موجود، اختر منطقة ونوع مكان صحيح" : "Price not found, choose valid area and place type")
      return
    }

    try {
      const token = localStorage.getItem("token")
      const finalPrice = selectedPrice

      const res = await axios.post(
        `${API}/bookings`,
        {
          ...booking,
          cleaningType: "Basic",
          price: finalPrice,
          paymentMethod: "whatsapp"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const bookingWithPrice = {
        ...res.data,
        cleaningType: "Basic",
        price: finalPrice
      }

      setCreatedBooking(bookingWithPrice)
      openWhatsapp(bookingWithPrice)
    } catch {
      setError(lang === "ar" ? "صار خطأ في الحجز" : "Booking failed")
    }
  }

  return (
    <section className="booking-page" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="booking-container">
        <div className="booking-form-card">
          <img src={logo} alt="Al Marjan" className="booking-logo" />

          <h2>{lang === "ar" ? "احجز خدمة التنظيف" : "Book Cleaning Service"}</h2>

          <p className="booking-subtitle">
            {lang === "ar"
              ? "اختر المنطقة، حدد الموقع، وبعد الحجز بتتحول للواتساب للدفع."
              : "Choose your area, select your location, then continue on WhatsApp for payment."}
          </p>

          <form onSubmit={handleSubmit}>
            <select name="area" value={booking.area} onChange={handleChange} required>
              <option value="">
                {lang === "ar" ? "اختر المنطقة" : "Choose Area"}
              </option>

              {options.areas.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              name="propertyType"
              value={booking.propertyType}
              onChange={handleChange}
              required
            >
              <option value="">
                {lang === "ar" ? "اختر نوع المكان" : "Choose Place"}
              </option>

              {options.propertyTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <div className="price-preview">
              {lang === "ar" ? "نوع التنظيف: تنظيف عادي" : "Cleaning Type: Basic Cleaning"}
            </div>

            {selectedPrice !== null && (
              <div className="price-preview">
                {lang === "ar" ? "السعر:" : "Price:"} {selectedPrice} BHD
              </div>
            )}

            <button type="button" onClick={getLocation} className="location-btn">
              {lang === "ar" ? "حدد موقعي من خرائط قوقل" : "Get My Google Maps Location"}
            </button>

            {booking.locationLink && (
              <div className="price-preview">
                {lang === "ar" ? "تم تحديد الموقع" : "Location selected"} ✅
              </div>
            )}

            <input
              name="houseNumber"
              value={booking.houseNumber}
              onChange={handleChange}
              placeholder={lang === "ar" ? "رقم المنزل" : "House Number"}
              required
            />

            <div className="date-row">
              <input
                name="date"
                type="date"
                value={booking.date}
                onChange={handleChange}
                required
              />

              <input
                name="time"
                type="time"
                min="07:30"
                max="16:00"
                step="1800"
                value={booking.time}
                onChange={handleChange}
                required
              />
            </div>

            <textarea
              name="notes"
              value={booking.notes}
              placeholder={lang === "ar" ? "ملاحظات إضافية" : "Extra Notes"}
              onChange={handleChange}
            />

            <div className="payment-box">
              <strong>{lang === "ar" ? "طريقة الدفع:" : "Payment Method:"}</strong>

              <p>
                {lang === "ar"
                  ? "بعد إنشاء الحجز، سيتم تحويلك للواتساب لإرسال تفاصيل الحجز واستلام بيانات الدفع."
                  : "After creating the booking, you will be redirected to WhatsApp to send booking details and receive payment information."}
              </p>
            </div>

            <button className="gold-btn">
              {lang === "ar"
                ? "إنشاء الحجز والانتقال للواتساب"
                : "Create Booking & Continue to WhatsApp"}
            </button>
          </form>

          {error && <p className="error-text">{error}</p>}
        </div>

        <div className="booking-info-card">
          <div className="booking-image"></div>

          <h2>
            {lang === "ar"
              ? "تنظيف عادي بسعر فوري"
              : "Basic cleaning with immediate price"}
          </h2>

          <p>
            {lang === "ar"
              ? "بعد الحجز، بتوصلنا معلوماتك في الأدمن، وبتتحول للواتساب عشان نرسل لك بيانات الدفع."
              : "After booking, your details will appear in the admin page, and WhatsApp will open for payment instructions."}
          </p>
        </div>
      </div>

      {createdBooking && (
        <div className="receipt-section">
          <div className="receipt-card">
            <h2>{lang === "ar" ? "تم إنشاء الحجز" : "Booking Created"}</h2>

            <p>
              {lang === "ar"
                ? "تم حفظ الحجز في صفحة الأدمن. كمل معنا في الواتساب عشان الدفع."
                : "Your booking has been saved in the admin page. Continue on WhatsApp for payment."}
            </p>

            <div className="receipt-actions">
              <button onClick={() => openWhatsapp()}>
                {lang === "ar" ? "افتح الواتساب" : "Open WhatsApp"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Booking
