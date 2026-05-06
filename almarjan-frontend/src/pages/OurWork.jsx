import kitchen from "../assets/kitchen.jpg"
import apartment from "../assets/apartment.jpg"
import house from "../assets/house.jpg"

const OurWork = ({ lang }) => {
  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"}>

      {/* HERO */}
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
              ? "شوف الفرق قبل وبعد في المطابخ والشقق والبيوت"
              : "See the difference before and after cleaning"}
          </p>
        </div>
      </section>

      {/* BEFORE AFTER */}
      <section className="before-after-section">

        <h2>{lang === "ar" ? "قبل وبعد" : "Before & After"}</h2>

        {/* KITCHEN */}
        <div className="ba-row">
          <div className="ba-box">
            <span className="tag before">قبل</span>
            <img src={kitchen} />
          </div>

          <div className="ba-box">
            <span className="tag after">بعد</span>
            <img src={kitchen} />
          </div>
        </div>

        <p className="ba-title">{lang === "ar" ? "تنظيف مطبخ" : "Kitchen Cleaning"}</p>

        {/* APARTMENT */}
        <div className="ba-row">
          <div className="ba-box">
            <span className="tag before">قبل</span>
            <img src={apartment} />
          </div>

          <div className="ba-box">
            <span className="tag after">بعد</span>
            <img src={apartment} />
          </div>
        </div>

        <p className="ba-title">{lang === "ar" ? "تنظيف شقة" : "Apartment Cleaning"}</p>

        {/* HOUSE */}
        <div className="ba-row">
          <div className="ba-box">
            <span className="tag before">قبل</span>
            <img src={house} />
          </div>

          <div className="ba-box">
            <span className="tag after">بعد</span>
            <img src={house} />
          </div>
        </div>

        <p className="ba-title">{lang === "ar" ? "تنظيف منزل" : "House Cleaning"}</p>

      </section>

    </main>
  )
}

export default OurWork
