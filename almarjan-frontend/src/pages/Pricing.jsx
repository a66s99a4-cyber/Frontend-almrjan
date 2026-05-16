import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const API = "https://almarjan-backend-rt2o.onrender.com"

const Pricing = ({ lang }) => {
  const [form, setForm] = useState({
    area: "",
    propertyType: "",
    cleaningType: "Basic",
    rooms: "",
    tankCleaning: false
  })

  const [price, setPrice] = useState(null)
  const [message, setMessage] = useState("")
  const [options, setOptions] = useState({
    areas: [],
    propertyTypes: []
  })

  const getOptions = async () => {
    try {
      const res = await axios.get(`${API}/prices/options`)
      setOptions(res.data)
    } catch {
      setOptions({ areas: [], propertyTypes: [] })
    }
  }

  useEffect(() => {
    getOptions()
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    })
  }

  const checkPrice = async () => {
    setPrice(null)
    setMessage("")

    if (!form.area || !form.propertyType) {
      setMessage(lang === "ar" ? "اختار المنطقة ونوع المكان" : "Choose area and place type")
      return
    }

    try {
      const res = await axios.get(`${API}/prices`, {
        params: {
          area: form.area,
          propertyType: form.propertyType,
          cleaningType: "Basic",
          rooms: form.rooms || 0,
          tankCleaning: form.tankCleaning
        }
      })

      setPrice(res.data.finalPrice)
    } catch {
      setMessage(lang === "ar" ? "لا يوجد سعر لهذه الاختيارات" : "No price found for this choice")
    }
  }

  return (
    <section className="pricing-main-section" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="calculator-card">
        <div className="calculator-header">
          <span>{lang === "ar" ? "حاسبة السعر الفورية" : "Instant Price Calculator"}</span>
          <h2>{lang === "ar" ? "احسب سعر التنظيف قبل الحجز" : "Calculate before booking"}</h2>
          <p>
            {lang === "ar"
              ? "اختر التفاصيل وشوف السعر مباشرة، وبعدها تقدر تحجز بدون حساب."
              : "Choose the details, see the price, then book without an account."}
          </p>
        </div>

        <div className="calculator-grid">
          <select name="area" value={form.area} onChange={handleChange}>
            <option value="">{lang === "ar" ? "اختر المنطقة" : "Choose Area"}</option>
            {options.areas.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>

          <select name="propertyType" value={form.propertyType} onChange={handleChange}>
            <option value="">{lang === "ar" ? "اختر نوع المكان" : "Choose Place"}</option>
            {options.propertyTypes.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>

          <input
            name="rooms"
            type="number"
            min="0"
            value={form.rooms}
            onChange={handleChange}
            placeholder={lang === "ar" ? "عدد الغرف" : "Number of rooms"}
          />

          <label className="check-row">
            <input
              name="tankCleaning"
              type="checkbox"
              checked={form.tankCleaning}
              onChange={handleChange}
            />
            <span>{lang === "ar" ? "إضافة تنظيف خزانات" : "Add tank cleaning"}</span>
          </label>
        </div>

        <button className="gold-btn" onClick={checkPrice}>
          {lang === "ar" ? "عرض السعر" : "Check Price"}
        </button>

        {price !== null && (
          <div className="big-price-box">
            <p>{lang === "ar" ? "السعر المتوقع" : "Estimated Price"}</p>
            <h3>{price} BHD</h3>
            <Link to="/booking" className="main-btn">
              {lang === "ar" ? "احجز بهذا السعر" : "Book with this price"}
            </Link>
          </div>
        )}

        {message && <p className="error-text">{message}</p>}
      </div>
    </section>
  )
}

export default Pricing
