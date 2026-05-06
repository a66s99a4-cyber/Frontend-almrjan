import { Link } from "react-router-dom"
import Pricing from "./Pricing"

const BasicCleaning = ({ user, lang }) => {
  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"}>
      <section className="service-hero basic-service-hero">
        <div className="service-hero-content">
          <span>{lang === "ar" ? "تنظيف عادي" : "Basic Cleaning"}</span>

          <h1>
            {lang === "ar"
              ? "أسعار واضحة قبل الحجز"
              : "Clear Prices Before Booking"}
          </h1>

          <p>
            {lang === "ar"
              ? "اختر المنطقة ونوع المكان، وشاهد السعر مباشرة قبل ما تحجز."
              : "Choose your area and place type, then see the price before booking."}
          </p>

          <Link to={user ? "/booking" : "/login"} className="main-btn">
            {lang === "ar" ? "احجز تنظيف عادي" : "Book Basic Cleaning"}
          </Link>
        </div>
      </section>

      <section className="service-details">
        <div className="section-heading">
          <span>{lang === "ar" ? "حاسبة الأسعار" : "Price Calculator"}</span>
          <h2>{lang === "ar" ? "احسب سعر التنظيف العادي" : "Calculate Basic Cleaning Price"}</h2>
        </div>

        <Pricing lang={lang} />
      </section>
    </main>
  )
}

export default BasicCleaning
