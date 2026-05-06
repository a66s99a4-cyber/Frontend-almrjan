import { useEffect, useState } from "react"
import axios from "axios"

const API = "https://almarjan-backend-rt2o.onrender.com"

const Pricing = ({ lang }) => {
  const [area, setArea] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [cleaningType, setCleaningType] = useState("Basic")
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

  const checkPrice = async () => {
    setPrice(null)
    setMessage("")

    if (!area || !propertyType) {
      setMessage(lang === "ar" ? "اختار المنطقة ونوع المكان" : "Choose area and place type")
      return
    }

    if (cleaningType === "Professional") {
      setMessage(
        lang === "ar"
          ? "التنظيف الاحترافي يحتاج حجز موعد معاينة"
          : "Professional cleaning requires inspection booking"
      )
      return
    }

    try {
      const res = await axios.get(`${API}/prices`, {
        params: { area, propertyType, cleaningType }
      })

      setPrice(res.data.price)
    } catch {
      setMessage(lang === "ar" ? "لا يوجد سعر لهذه الاختيارات" : "No price found for this choice")
    }
  }

  return (
    <section className="section" dir={lang === "ar" ? "rtl" : "ltr"}>
      <h2>{lang === "ar" ? "حاسبة الأسعار" : "Price Calculator"}</h2>

      <div className="form-box">
        <select value={area} onChange={(e) => setArea(e.target.value)}>
          <option value="">{lang === "ar" ? "اختر المنطقة" : "Choose Area"}</option>

          {options.areas.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
          <option value="">{lang === "ar" ? "اختر نوع المكان" : "Choose Place"}</option>

          {options.propertyTypes.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <select value={cleaningType} onChange={(e) => setCleaningType(e.target.value)}>
          <option value="Basic">{lang === "ar" ? "تنظيف عادي" : "Basic Cleaning"}</option>
          <option value="Professional">{lang === "ar" ? "تنظيف احترافي" : "Professional Cleaning"}</option>
        </select>

        <button onClick={checkPrice}>
          {lang === "ar" ? "عرض السعر" : "Check Price"}
        </button>

        {price !== null && (
          <h3>
            {lang === "ar" ? "السعر:" : "Price:"} {price} BHD
          </h3>
        )}

        {message && <p>{message}</p>}
      </div>
    </section>
  )
}

export default Pricing
