import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faTiktok, faWhatsapp } from "@fortawesome/free-brands-svg-icons"

const Footer = ({ lang }) => {
  return (
    <footer className="footer">
      <h3>{lang === "ar" ? "المرجان للتنظيف" : "Al Marjan Cleaning"}</h3>

      <p>
        {lang === "ar"
          ? "خدمات تنظيف احترافية في البحرين"
          : "Professional cleaning services in Bahrain"}
      </p>

      <div className="footer-icons">
        <a href="https://www.instagram.com/almarjan_cleaning2?igsh=cmNjODI0cGR6djVj&utm_source=qr" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>

        <a href="https://www.tiktok.com/@almarjan_cleaning?_r=1&_t=ZS-9609LibwKfM" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faTiktok} />
        </a>

        <a href="https://wa.me/97366937709" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
      </div>
    </footer>
  )
}

export default Footer
