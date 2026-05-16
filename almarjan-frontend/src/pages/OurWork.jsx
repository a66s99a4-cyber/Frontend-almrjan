import kitchenBefore from "../assets/kitchen-before.jpg"
import kitchenAfter from "../assets/kitchen-after.jpg"
import apartmentBefore from "../assets/apartment-before.jpg"
import apartmentAfter from "../assets/apartment-after.jpg"
import houseBefore from "../assets/house-before.jpg"
import houseAfter from "../assets/house-after.jpg"

const OurWork = ({ lang }) => {
  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"}>
      <section className="work-hero">
        <div className="overlay"></div>

        <div className="hero-text">
          <span>{lang === "ar" ? "أعمالنا" : "Our Work"}</span>

          <h1>
            {lang === "ar"
              ? "قبل وبعد بطريقة أوضح واحترافية"
              : "Professional Before & After Results"}
          </h1>

          <p>
            {lang === "ar"
              ? "صور حقيقية توضح الفرق في المطابخ والشقق والبيوت"
              : "Real results for kitchens, apartments, and houses"}
          </p>
        </div>
      </section>

      <section className="before-after-section">
        <h2>{lang === "ar" ? "قبل وبعد" : "Before & After"}</h2>

        <div className="before-after-grid">
          <div className="before-after-card">
            <div className="ba-row">
              <div className="ba-box">
                <span className="tag before">{lang === "ar" ? "قبل" : "Before"}</span>
                <img src={kitchenBefore} alt="Kitchen before cleaning" />
              </div>

              <div className="ba-box">
                <span className="tag after">{lang === "ar" ? "بعد" : "After"}</span>
                <img src={kitchenAfter} alt="Kitchen after cleaning" />
              </div>
            </div>

            <p className="ba-title">{lang === "ar" ? "تنظيف مطبخ" : "Kitchen Cleaning"}</p>
          </div>

          <div className="before-after-card">
            <div className="ba-row">
              <div className="ba-box">
                <span className="tag before">{lang === "ar" ? "قبل" : "Before"}</span>
                <img src={apartmentBefore} alt="Apartment before cleaning" />
              </div>

              <div className="ba-box">
                <span className="tag after">{lang === "ar" ? "بعد" : "After"}</span>
                <img src={apartmentAfter} alt="Apartment after cleaning" />
              </div>
            </div>

            <p className="ba-title">{lang === "ar" ? "تنظيف شقة" : "Apartment Cleaning"}</p>
          </div>

          <div className="before-after-card">
            <div className="ba-row">
              <div className="ba-box">
                <span className="tag before">{lang === "ar" ? "قبل" : "Before"}</span>
                <img src={houseBefore} alt="House before cleaning" />
              </div>

              <div className="ba-box">
                <span className="tag after">{lang === "ar" ? "بعد" : "After"}</span>
                <img src={houseAfter} alt="House after cleaning" />
              </div>
            </div>

            <p className="ba-title">{lang === "ar" ? "تنظيف منزل" : "House Cleaning"}</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default OurWork
