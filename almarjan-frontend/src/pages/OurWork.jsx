import kitchen from "../assets/kitchen.jpg"
import apartment from "../assets/apartment.jpg"
import house from "../assets/house.jpg"

const OurWork = ({ lang }) => {
  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"}>
      <section className="work-hero">
        <div className="overlay"></div>

        <div className="hero-text">
          <span>{lang === "ar" ? "أعمالنا" : "Our Work"}</span>

          <h1>
            {lang === "ar"
              ? "نتائج تنظيف حقيقية وواضحة"
              : "Real Cleaning Results"}
          </h1>

          <p>
            {lang === "ar"
              ? "شوف نتائج أعمالنا في المطابخ والشقق والبيوت"
              : "See our cleaning results for kitchens, apartments, and houses"}
          </p>
        </div>
      </section>

      <section className="before-after-section">
        <h2>{lang === "ar" ? "أعمالنا" : "Our Work"}</h2>

        <div className="before-after-grid">
          <div className="before-after-card">
            <div className="ba-row single-work-image">
              <div className="ba-box">
                <span className="tag after">
                  {lang === "ar" ? "تنظيف مطبخ" : "Kitchen Cleaning"}
                </span>
                <img src={kitchen} alt="Kitchen cleaning" />
              </div>
            </div>

            <p className="ba-title">
              {lang === "ar" ? "تنظيف مطبخ" : "Kitchen Cleaning"}
            </p>
          </div>

          <div className="before-after-card">
            <div className="ba-row single-work-image">
              <div className="ba-box">
                <span className="tag after">
                  {lang === "ar" ? "تنظيف شقة" : "Apartment Cleaning"}
                </span>
                <img src={apartment} alt="Apartment cleaning" />
              </div>
            </div>

            <p className="ba-title">
              {lang === "ar" ? "تنظيف شقة" : "Apartment Cleaning"}
            </p>
          </div>

          <div className="before-after-card">
            <div className="ba-row single-work-image">
              <div className="ba-box">
                <span className="tag after">
                  {lang === "ar" ? "تنظيف منزل" : "House Cleaning"}
                </span>
                <img src={house} alt="House cleaning" />
              </div>
            </div>

            <p className="ba-title">
              {lang === "ar" ? "تنظيف منزل" : "House Cleaning"}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default OurWork
