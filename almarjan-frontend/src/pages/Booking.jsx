import { useEffect, useState } from "react"
import axios from "axios"
import logo from "../assets/logo.jpeg"

const API = "https://almarjan-backend-rt2o.onrender.com"

const Booking = ({ lang }) => {
  const [booking, setBooking] = useState({
    customerName: "",
    phone: "",
    area: "",
    propertyType: "",
    cleaningType: "Basic",
    rooms: "",
    tankCleaning: false,
    locationLink: "",
    houseNumber: "",
    date: "",
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
            cleaningType: "Basic",
            rooms: booking.rooms || 0,
            tankCleaning: booking.tankCleaning
          }
        })

        setSelectedPrice(res.data.finalPrice)
      } catch {
        setSelectedPrice(null)
      }
    }

    getPrice()
  }, [booking.area, booking.propertyType, booking.rooms, booking.tankCleaning])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setBooking({
      ...booking,
      [name]: type === "checkbox" ? checked : value
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
Rooms: ${bookingData.rooms || 0}
Tank Cleaning: ${bookingData.tankCleaning ? "Yes" : "No"}
House Number: ${bookingData.houseNumber || "Not provided"}
Location: ${bookingData.locationLink || "Not provided"}

Date: ${bookingData.date}

Price: ${bookingData.price || 0} BHD
Notes: ${bookingData.notes || "No notes"}

Please confirm my booking.
`

    window.open(`https://wa.me/97366937709?text=${encodeURIComponent(msg)}`, "_blank")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!booking.customerName || !booking.phone) {
      setError(lang === "ar" ? "اكتب الاسم ورقم التلفون" : "Enter name and phone")
      return
    }

    if (!booking.locationLink) {
      setError(lang === "ar" ? "لازم تحدد موقعك من الخريطة" : "Please select your location")
      return
    }

    if (selectedPrice === null) {
      setError(lang === "ar" ? "السعر غير موجود، اختر منطقة ونوع مكان صحيح" : "Price not found")
      return
    }

    try {
      const res = await axios.post(`${API}/bookings`, {
        ...booking,
        cleaningType: "Basic",
        paymentMethod: "whatsapp"
      })

      setCreatedBooking(res.data)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch {
      setError(lang === "ar" ? "صار خطأ في الحجز" : "Booking failed")
    }
  }

  if (createdBooking) {
    return (
      <section className="booking-success-page" dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="receipt-card mega-success">
          <div className="success-icon">✓</div>

          <h2>{lang === "ar" ? "تم الحجز بنجاح" : "Booking Created Successfully"}</h2>

          <p>
            {lang === "ar"
              ? "تم حفظ طلبك، اضغط على زر الواتساب لتأكيد الحجز معنا مباشرة."
              : "Your booking is saved. Click WhatsApp to confirm directly with us."}
          </p>

          <div className="success-details">
            <p><strong>{lang === "ar" ? "الاسم:" : "Name:"}</strong> {createdBooking.customerName}</p>
            <p><strong>{lang === "ar" ? "التلفون:" : "Phone:"}</strong> {createdBooking.phone}</p>
            <p><strong>{lang === "ar" ? "التاريخ:" : "Date:"}</strong> {createdBooking.date}</p>
            <p><strong>{lang === "ar" ? "السعر:" : "Price:"}</strong> {createdBooking.price} BHD</p>
          </div>

          <button className="whatsapp-big-btn" onClick={() => openWhatsapp()}>
            {lang === "ar" ? "تأكيد الحجز عبر الواتساب" : "Confirm on WhatsApp"}
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="booking-page" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="booking-container single-booking">
        <div className="booking-form-card">
          <img src={logo} alt="Al Marjan" className="booking-logo" />

          <h2>{lang === "ar" ? "احجز خدمة التنظيف" : "Book Cleaning Service"}</h2>

          <p className="booking-subtitle">
            {lang === "ar"
              ? "بدون تسجيل دخول، اكتب بياناتك واختر التاريخ فقط."
              : "No login needed. Enter your details and choose the date only."}
          </p>

          <form onSubmit={handleSubmit}>
            <input
              name="customerName"
              value={booking.customerName}
              onChange={handleChange}
              placeholder={lang === "ar" ? "اسم الزبون" : "Customer Name"}
              required
            />

            <input
              name="phone"
              value={booking.phone}
              onChange={handleChange}
              placeholder={lang === "ar" ? "رقم التلفون" : "Phone Number"}
              required
            />

            <select name="area" value={booking.area} onChange={handleChange} required>
              <option value="">{lang === "ar" ? "اختر المنطقة" : "Choose Area"}</option>
              {options.areas.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <select
              name="propertyType"
              value={booking.propertyType}
              onChange={handleChange}
              required
            >
              <option value="">{lang === "ar" ? "اختر نوع المكان" : "Choose Place"}</option>
              {options.propertyTypes.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <input
              name="rooms"
              type="number"
              min="0"
              value={booking.rooms}
              onChange={handleChange}
              placeholder={lang === "ar" ? "عدد الغرف" : "Number of rooms"}
            />

            <label className="check-row">
              <input
                name="tankCleaning"
                type="checkbox"
                checked={booking.tankCleaning}
                onChange={handleChange}
              />
              <span>{lang === "ar" ? "أحتاج تنظيف خزانات" : "I need tank cleaning"}</span>
            </label>

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
              placeholder={lang === "ar" ? "رقم المنزل / الشقة" : "House / Apartment Number"}
            />

            <input
              name="date"
              type="date"
              value={booking.date}
              onChange={handleChange}
              required
            />

            <textarea
              name="notes"
              value={booking.notes}
              placeholder={lang === "ar" ? "ملاحظات إضافية" : "Extra Notes"}
              onChange={handleChange}
            />

            <button className="gold-btn">
              {lang === "ar" ? "إرسال الحجز" : "Submit Booking"}
            </button>
          </form>

          {error && <p className="error-text">{error}</p>}
        </div>
      </div>
    </section>
  )
}

export default Booking
