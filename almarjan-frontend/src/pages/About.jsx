const About = ({ lang }) => {
  return (
    <main className="about-page" dir={lang === "ar" ? "rtl" : "ltr"}>
      <section className="about-hero">
        <div>
          <span>{lang === "ar" ? "عن المرجان" : "About Al Marjan"}</span>
          <h1>{lang === "ar" ? "إدارة وفريق بخبرة واهتمام" : "Management and Team with Care"}</h1>
          <p>
            {lang === "ar"
              ? "نقدم خدمات تنظيف منظمة واحترافية مع متابعة للإدارة وجودة العمل."
              : "We provide organized and professional cleaning services with management follow-up and quality care."}
          </p>
        </div>
      </section>

      <section className="management-section">
        <div className="manager-image"></div>

        <div className="manager-text">
          <span>{lang === "ar" ? "الإدارة" : "Management"}</span>
          <h2>{lang === "ar" ? "المدير التنفيذي" : "Executive Manager"}</h2>
          <p>
            {lang === "ar"
              ? "قيادة تركز على راحة العميل، سرعة التواصل، وتنظيم مواعيد التنظيف بجودة عالية."
              : "Leadership focused on customer comfort, fast communication, and organized cleaning appointments with high quality."}
          </p>
        </div>
      </section>

      <section className="team-section">
        <div className="section-heading">
          <span>{lang === "ar" ? "فريق العمل" : "Our Team"}</span>
          <h2>{lang === "ar" ? "موظفون جاهزون لخدمتك" : "A Team Ready to Serve You"}</h2>
        </div>

        <div className="team-grid">
          <div className="team-card team-one">
            <h3>{lang === "ar" ? "مدير العمليات" : "Operations Manager"}</h3>
          </div>

          <div className="team-card team-two">
            <h3>{lang === "ar" ? "فريق التنظيف الاحترافي" : "Professional Cleaning Team"}</h3>
          </div>

          <div className="team-card team-three">
            <h3>{lang === "ar" ? "فريق حجز المواعيد" : "Appointment Booking Team"}</h3>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About
