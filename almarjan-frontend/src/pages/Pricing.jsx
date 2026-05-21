import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const API = "https://almarjan-backend-rt2o.onrender.com"

const Pricing = ({ lang }) => {
  const [form, setForm] = useState({
    area: "",
    propertyType: "",
    cleaningType: "Basic"
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
    } catch (error) {
      console.log(error)

      setOptions({
        areas: [],
        propertyTypes: []
      })
    }
  }

  useEffect(() => {
    getOptions()
  }, [])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

    setPrice(null)
    setMessage("")
  }

  const checkPrice = async () => {
    setPrice(null)
    setMessage("")

    if (!form.area || !form.propertyType) {
      setMessage(
        lang === "ar"
          ? "اختار المنطقة ونوع المكان"
          : "Choose area and place type"
      )

      return
    }

    try {
      const res = await axios.get(`${API}/prices`, {
        params: {
          area: form.area,
          propertyType: form.propertyType,
          cleaningType: "Basic"
        }
      })

      console.log("PRICE RESPONSE:", res.data)

      const final =
        res.data.finalPrice !== undefined &&
        res.data.finalPrice !== null
          ? res.data.finalPrice
          : res.data.price !== undefined &&
            res.data.price !== null
          ? res.data.price
          : 0

      setPrice(Number(final))
    } catch (error) {
      console.log(error)

      setMessage(
        lang === "ar"
          ? "لا يوجد سعر لهذه الاختيارات"
          : "No price found for this choice"
      )
    }
  }

  const displayPrice = () => {
    if (price === null) return ""

    return `${Number(price).toFixed(3)} BHD`
  }

  return (
    <section
      className="pricing-main-section"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="calculator-card">
        <div className="calculator-header">
          <span>
            {lang === "ar"
              ? "حاسبة السعر"
              : "Price Calculator"}
          </span>

          <h2>
            {lang === "ar"
              ? "التنظيف العادي"
              : "Basic Cleaning"}
          </h2>

          <p>
            {lang === "ar"
              ? "اختر المنطقة ونوع المكان وشوف السعر مباشرة"
              : "Choose area and place type to see the price instantly"}
          </p>
        </div>

        <div className="calculator-grid">
          <select
            name="area"
            value={form.area}
            onChange={handleChange}
          >
            <option value="">
              {lang === "ar"
                ? "اختر المنطقة"
                : "Choose Area"}
            </option>

            {options.areas.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            name="propertyType"
            value={form.propertyType}
            onChange={handleChange}
          >
            <option value="">
              {lang === "ar"
                ? "اختر نوع المكان"
                : "Choose Place"}
            </option>

            {options.propertyTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <button
          className="gold-btn calculator-btn"
          onClick={checkPrice}
        >
          {lang === "ar"
            ? "عرض السعر"
            : "Check Price"}
        </button>

        {price !== null && (
          <div className="big-price-box">
            <p>
              {lang === "ar"
                ? "السعر المتوقع"
                : "Estimated Price"}
            </p>

            <h3>{displayPrice()}</h3>

            <Link to="/booking" className="main-btn">
              {lang === "ar"
                ? "احجز التنظيف العادي"
                : "Book Basic Cleaning"}
            </Link>
          </div>
        )}

        {message && (
          <p className="error-text">
            {message}
          </p>
        )}
      </div>
    </section>
  )
}

export default Pricing
