class MahotsavFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: Arial, sans-serif;
        }

        footer {
          background: #0f0f0f;
          color: #ddd;
          padding: 3rem 1.5rem 1.5rem;
        }

        .container {
          max-width: 1200px;
          margin: auto;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2rem;
        }

        h3, h4 {
          color: #fff;
          margin-bottom: 0.6rem;
        }

        p {
          font-size: 0.9rem;
          color: #aaa;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        ul li {
          margin-bottom: 0.4rem;
          font-size: 0.9rem;
        }

        a {
          color: #ccc;
          text-decoration: none;
        }

        a:hover {
          color: #fff;
        }

        .footer-logo h3 {
          font-size: 1.4rem;
          margin-bottom: 0.3rem;
        }

        .social-icons {
          display: flex;
          gap: 0.8rem;
          margin-top: 0.5rem;
        }

        .social-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #222;
          color: #fff;
          font-size: 1rem;
          transition: background 0.2s ease;
        }

        .social-icon:hover {
          background: #ff5a5f;
        }

        .footer-contact li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          line-height: 1.4;
        }

        .footer-bottom {
          border-top: 1px solid #222;
          margin-top: 2rem;
          padding-top: 1rem;
          text-align: center;
          font-size: 0.85rem;
          color: #888;
        }

        @media (max-width: 600px) {
          footer {
            text-align: center;
          }

          .footer-contact li {
            justify-content: center;
          }

          .social-icons {
            justify-content: center;
          }
        }
      </style>
      <link href="https://fonts.googleapis.com/css2?family=Creepster&family=Griffy&family=Fredoka:wght@300;400;700&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <footer>
        <div class="container">
          <div class="footer-content">

            <div class="footer-logo">
              <h3>Mahotsav</h3>
              <p>Photography & Fine Arts</p>
            </div>

            <div class="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/#home">Home</a></li>
                <li><a href="/#about">About Us</a></li>
                <li><a href="/#events">Events</a></li>
                <li><a href="/#sponsors">Sponsors</a></li>
              </ul>
            </div>

            <div class="footer-social">
              <h4>Connect With Us</h4>
              <div class="social-icons">
                <a href="#" class="social-icon" aria-label="Instagram">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="social-icon" aria-label="Facebook">
                  <i class="fab fa-facebook"></i>
                </a>
                <a href="#" class="social-icon" aria-label="Twitter">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="social-icon" aria-label="LinkedIn">
                  <i class="fab fa-linkedin"></i>
                </a>
              </div>
            </div>

            <div class="footer-contact">
              <h4>Contact Info</h4>
              <ul>
                <li>
                  <i class="fas fa-envelope"></i>
                  mahotsav.pfa@gmail.com
                </li>
                <li>
                  <i class="fas fa-phone"></i>
                  +91 98765 43210
                </li>
                <li>
                  <i class="fas fa-map-marker-alt"></i>
                  Bundelkhand Institute Of Engineering & Technology, Jhansi
                </li>
              </ul>
            </div>

          </div>

          <div class="footer-bottom">
            <p>&copy; 2025 Mahotsav. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("mahotsav-footer", MahotsavFooter);
