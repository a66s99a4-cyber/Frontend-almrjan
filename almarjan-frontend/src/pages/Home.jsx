import { Link } from "react-router-dom"


const Home = ({ user, lang }) => {
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
              ? "نخلي بيتك يلمع بلمسة احترافية"
              : "We Make Your Space Shine Professionally"}
          </h1>

          <p>
            {lang === "ar"
              ? "اختر تنظيف عادي مع أسعار واضحة، أو احجز معاينة لتنظيف احترافي بمواد متخصصة."
              : "Choose basic cleaning with clear prices, or book an inspection for professional deep cleaning."}
          </p>

          <div className="hero-buttons">
            <Link to="/basic-cleaning">
              {lang === "ar" ? "التنظيف العادي" : "Basic Cleaning"}
            </Link>

            <Link to="/professional-cleaning">
              {lang === "ar" ? "التنظيف الاحترافي" : "Professional Cleaning"}
            </Link>
          </div>
        </div>

        <div className="hero-floating-card">
          <h3>{lang === "ar" ? "حجز سريع" : "Quick Booking"}</h3>
          <p>{lang === "ar" ? "مواعيد مرنة وأسعار واضحة" : "Flexible appointments and clear prices"}</p>
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
                  ? "أسعار واضحة حسب المنطقة ونوع المكان، مناسب للشقق والبيوت والمطابخ."
                  : "Clear pricing based on area and place type, suitable for apartments, houses, and kitchens."}
              </p>
              <Link to="/basic-cleaning">{lang === "ar" ? "عرض التفاصيل" : "View Details"}</Link>
            </div>
          </div>

          <div className="premium-card">
            <div className="premium-img professional-img"></div>
            <div className="premium-content">
              <h3>{lang === "ar" ? "تنظيف احترافي" : "Professional Cleaning"}</h3>
              <p>
                {lang === "ar"
                  ? "تنظيف عميق بمواد متخصصة، يحتاج حجز معاينة قبل تحديد السعر."
                  : "Deep cleaning with specialized materials, requires an inspection before pricing."}
              </p>
              <Link to="/professional-cleaning">{lang === "ar" ? "احجز معاينة" : "Book Inspection"}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="about-preview">
        <div className="about-preview-text">
          <span>{lang === "ar" ? "من نحن" : "About Us"}</span>
          <h2>{lang === "ar" ? "فريق يهتم بالتفاصيل" : "A Team That Cares About Details"}</h2>
          <p>
            {lang === "ar"
              ? "في المرجان للتنظيف نركز على الجودة، الالتزام بالمواعيد، واستخدام طرق تنظيف مناسبة لكل مكان."
              : "At Al Marjan Cleaning, we focus on quality, timing, and the right cleaning methods for every place."}
          </p>
          <Link to="/about" className="dark-btn">
            {lang === "ar" ? "تفاصيل أكثر" : "More Details"}
          </Link>
        </div>

        <div className="about-preview-image"></div>
      </section>

      <section className="stats-section">
        <div>
          <h3>+250</h3>
          <p>{lang === "ar" ? "حجز مكتمل" : "Completed Bookings"}</p>
        </div>

        <div>
          <h3>24/7</h3>
          <p>{lang === "ar" ? "تواصل سريع" : "Fast Support"}</p>
        </div>

        <div>
          <h3>100%</h3>
          <p>{lang === "ar" ? "اهتمام بالجودة" : "Quality Focus"}</p>
        </div>
      </section>
    </main>
  )
}

export default Home
