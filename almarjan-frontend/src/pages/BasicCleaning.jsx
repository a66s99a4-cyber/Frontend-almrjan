import { Link } from "react-router-dom"
import Pricing from "./Pricing"

const BasicCleaning = ({ lang }) => {
  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"}>
      <section className="service-hero basic-service-hero">
        <div className="service-hero-content">
          <span>{lang === "ar" ? "تنظيف عادي" : "Basic Cleaning"}</span>

          <h1>
            {lang === "ar"
              ? "احسب السعر واحجز بدون تسجيل دخول"
              : "Calculate the price and book without login"}
          </h1>

          <p>
            {lang === "ar"
              ? "اختار المنطقة ونوع المكان وعدد الغرف وشوف السعر مباشرة."
              : "Choose area, place type, rooms, and see the price instantly."}
          </p>

          <div className="hero-buttons">
            <Link to="/pricing">
              {lang === "ar" ? "احسب السعر" : "Calculate Price"}
            </Link>

            <Link to="/booking">
              {lang === "ar" ? "احجز الآن" : "Book Now"}
            </Link>
          </div>
        </div>
      </section>

      <section className="service-details">
        <div className="section-heading">
          <span>{lang === "ar" ? "حاسبة الأسعار" : "Price Calculator"}</span>
          <h2>
            {lang === "ar"
              ? "أهم خيار في الموقع صار واضح للزبون"
              : "The main website option is now clear"}
          </h2>
        </div>

        <Pricing lang={lang} />
      </section>
    </main>
  )
}

export default BasicCleaning
