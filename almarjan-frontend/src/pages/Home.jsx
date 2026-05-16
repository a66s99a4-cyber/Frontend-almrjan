import { Link } from "react-router-dom"

const Home = ({ lang }) => {
  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"}>
      <section className="dream-hero">
        <div className="hero-glow"></div>

        <div className="dream-hero-content">
          <span className="hero-badge">
            {lang === "ar" ? "شركة تنظيف في البحرين" : "Cleaning Company in Bahrain"}
          </span>

          <h1>
            {lang === "ar"
              ? "احسب سعر تنظيف بيتك واحجز بدون تسجيل"
              : "Calculate your cleaning price and book without login"}
          </h1>

          <p>
            {lang === "ar"
              ? "حاسبة سعر واضحة، حجز سريع، وتأكيد مباشر عبر الواتساب."
              : "Clear price calculator, fast booking, and direct WhatsApp confirmation."}
          </p>

          <div className="hero-buttons">
            <Link to="/pricing">
              {lang === "ar" ? "احسب السعر الآن" : "Calculate Price"}
            </Link>

            <Link to="/booking">
              {lang === "ar" ? "احجز الآن" : "Book Now"}
            </Link>
          </div>
        </div>

        <div className="hero-floating-card">
          <h3>{lang === "ar" ? "بدون تسجيل دخول" : "No Login Needed"}</h3>
          <p>{lang === "ar" ? "اسمك رقمك التاريخ وتم" : "Name, phone, date, done"}</p>
        </div>
      </section>

      <section className="home-services">
        <div className="section-heading">
          <span>{lang === "ar" ? "خدماتنا" : "Our Services"}</span>
          <h2>{lang === "ar" ? "اختر الخدمة المناسبة لك" : "Choose the Right Service"}</h2>
        </div>

        <div className="premium-cards">
          <div className="premium-card">
            <div className="premium-img basic-img"></div>
            <div className="premium-content">
              <h3>{lang === "ar" ? "تنظيف عادي" : "Basic Cleaning"}</h3>
              <p>
                {lang === "ar"
                  ? "أسعار واضحة حسب المنطقة ونوع المكان وعدد الغرف وتنظيف الخزانات."
                  : "Clear pricing by area, place type, rooms, and tank cleaning."}
              </p>
              <Link to="/pricing">{lang === "ar" ? "احسب السعر" : "Calculate Price"}</Link>
            </div>
          </div>

          <div className="premium-card">
            <div className="premium-img professional-img"></div>
            <div className="premium-content">
              <h3>{lang === "ar" ? "تنظيف احترافي" : "Professional Cleaning"}</h3>
              <p>
                {lang === "ar"
                  ? "تنظيف عميق يحتاج معاينة قبل تحديد السعر النهائي."
                  : "Deep cleaning that requires inspection before final pricing."}
              </p>
              <Link to="/professional-cleaning">{lang === "ar" ? "احجز معاينة" : "Book Inspection"}</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
