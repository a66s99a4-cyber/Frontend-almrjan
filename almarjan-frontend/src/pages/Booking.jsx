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
    locationLink: "",
    houseNumber: "",
    date: "",
    notes: "",
    paymentMethod: "whatsapp"
  })

  const [options, setOptions] = useState({
    areas: [],
    propertyTypes: []
  })

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
            rooms: 0,
            tankCleaning: false,
            tankCleaningSize: "none"
          }
        })

        const final =
          res.data.finalPrice !== undefined && res.data.finalPrice !== null
            ? res.data.finalPrice
            : res.data.price !== undefined && res.data.price !== null
            ? res.data.price
            : 0

        setSelectedPrice(Number(final))
      } catch (error) {
        console.log(error)
        setSelectedPrice(null)
      }
    }

    getPrice()
  }, [booking.area, booking.propertyType])

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value
    })

    setError("")
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert(lang === "ar" ? "الموقع غير مدعوم" : "Geolocation not supported")
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
        alert(lang === "ar" ? "فشل تحديد الموقع" : "Could not get location")
      }
    )
  }

  const openWhatsapp = (bookingData = createdBooking) => {
    if (!bookingData) return

    const msg = `
السلام عليكم

تم إنشاء حجز جديد من الموقع

الاسم: ${bookingData.customerName}
رقم الهاتف: ${bookingData.phone}

المنطقة: ${bookingData.area}
نوع المكان: ${bookingData.propertyType}

رقم المنزل: ${bookingData.houseNumber || "غير موجود"}

التاريخ: ${bookingData.date}

السعر: ${bookingData.price || selectedPrice || 0} BHD

الموقع:
${bookingData.locationLink}

ملاحظات:
${bookingData.notes || "لا يوجد"}
`

    window.open(
      `https://wa.me/97366937709?text=${encodeURIComponent(msg)}`,
      "_blank"
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!booking.customerName || !booking.phone) {
      setError(lang === "ar" ? "اكتب الاسم ورقم الهاتف" : "Enter name and phone")
      return
    }

    if (!booking.area || !booking.propertyType) {
      setError(lang === "ar" ? "اختر المنطقة ونوع المكان" : "Choose area and place type")
      return
    }

    if (!booking.locationLink) {
      setError(lang === "ar" ? "حدد موقعك من الخريطة" : "Select your location")
      return
    }

    if (selectedPrice === null || Number(selectedPrice) <= 0) {
      setError(lang === "ar" ? "السعر غير متوفر لهذا الاختيار" : "Price not available")
      return
    }

    try {
      const res = await axios.post(`${API}/bookings`, {
        customerName: booking.customerName,
        phone: booking.phone,
        area: booking.area,
        propertyType: booking.propertyType,
        cleaningType: "Basic",

        rooms: 0,
        tankCleaning: false,
        tankCleaningSize: "none",

        locationLink: booking.locationLink,
        areaName: booking.area,
        houseNumber: booking.houseNumber,
        date: booking.date,
        notes: booking.notes,

        price: Number(selectedPrice),
        paymentMethod: "whatsapp"
      })

      setCreatedBooking(res.data)

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    } catch (error) {
      console.log("BOOKING ERROR:", error.response?.data || error.message)

      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          (lang === "ar" ? "فشل الحجز" : "Booking failed")
      )
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
              ? "اضغط الزر لتأكيد الحجز عبر الواتساب"
              : "Confirm your booking on WhatsApp"}
          </p>

          <div className="success-details">
            <p>
              <strong>{lang === "ar" ? "الاسم:" : "Name:"}</strong>{" "}
              {createdBooking.customerName}
            </p>

            <p>
              <strong>{lang === "ar" ? "الهاتف:" : "Phone:"}</strong>{" "}
              {createdBooking.phone}
            </p>

            <p>
              <strong>{lang === "ar" ? "التاريخ:" : "Date:"}</strong>{" "}
              {createdBooking.date}
            </p>

            <p>
              <strong>{lang === "ar" ? "السعر:" : "Price:"}</strong>{" "}
              {createdBooking.price || selectedPrice} BHD
            </p>
          </div>

          <button className="whatsapp-big-btn" onClick={() => openWhatsapp()}>
            {lang === "ar" ? "تأكيد عبر الواتساب" : "Confirm on WhatsApp"}
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="booking-page" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="booking-container single-booking">
        <div className="booking-form-card luxury-booking-card">
          <img src={logo} alt="Al Marjan" className="booking-logo" />

          <h2>{lang === "ar" ? "احجز التنظيف العادي" : "Book Basic Cleaning"}</h2>

          <p className="booking-subtitle">
            {lang === "ar"
              ? "اختر المنطقة ونوع المكان وحدد موقعك"
              : "Choose area, place type and location"}
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
              placeholder={lang === "ar" ? "رقم الهاتف" : "Phone Number"}
              required
            />

            <select name="area" value={booking.area} onChange={handleChange} required>
              <option value="">{lang === "ar" ? "اختر المنطقة" : "Choose Area"}</option>

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
              <option value="">{lang === "ar" ? "اختر نوع المكان" : "Choose Place"}</option>

              {options.propertyTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {selectedPrice !== null && (
              <div className="price-preview">
                <span>{lang === "ar" ? "السعر:" : "Price:"}</span>{" "}
                <strong>{Number(selectedPrice).toFixed(3)} BHD</strong>
              </div>
            )}

            <button type="button" onClick={getLocation} className="location-btn">
              {lang === "ar" ? "تحديد الموقع من قوقل" : "Get Google Maps Location"}
            </button>

            {booking.locationLink && (
              <div className="price-preview">
                ✅ {lang === "ar" ? "تم تحديد الموقع" : "Location Selected"}
              </div>
            )}

            <input
              name="houseNumber"
              value={booking.houseNumber}
              onChange={handleChange}
              placeholder={lang === "ar" ? "رقم البيت / الشقة" : "House / Apartment Number"}
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
              onChange={handleChange}
              placeholder={lang === "ar" ? "ملاحظات إضافية" : "Extra Notes"}
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
