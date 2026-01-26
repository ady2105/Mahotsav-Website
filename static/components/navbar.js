class MahotsavNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.attachEvents();
  }

  attachEvents() {
    const toggle = this.shadowRoot.querySelector(".nav-toggle");
    const menu = this.shadowRoot.querySelector(".nav-menu");

    toggle?.addEventListener("click", () => {
      toggle.classList.toggle("active");
      menu.classList.toggle("active");
    });

    this.shadowRoot.querySelectorAll(".dropdown-toggle").forEach(toggle => {
      toggle.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          toggle.parentElement.classList.toggle("active");
        }
      });
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :host {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1000;
        }

        .navbar {
          width: 100%;
          padding: 1rem 2rem;
          background: rgba(13, 13, 13, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #6b0080;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          background: linear-gradient(45deg, #c70039, #8b0000);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: 'Creepster', sans-serif;
          text-decoration: none;
          text-shadow: 0 0 20px rgba(199, 0, 57, 0.5);
          transition: transform 0.3s ease;
        }

        .logo:hover {
          transform: scale(1.1);
        }

        .nav-menu {
          display: flex;
          list-style: none;
          align-items: center;
          gap: 2rem;
        }

        .nav-link,
        .dropdown-toggle {
          color: #e0e0e0;
          text-decoration: none;
          padding: 0.5rem 1rem;
          font-family: 'Fredoka', sans-serif;
          transition: color 0.3s ease, text-shadow 0.3s ease;
          cursor: pointer;
        }

        .nav-link:hover,
        .dropdown-toggle:hover {
          color: #c70039;
          text-shadow: 0 0 15px rgba(199, 0, 57, 0.6);
        }

        .register-btn {
          background: linear-gradient(45deg, #c70039, #6b0080);
          color: #fff;
          padding: 0.5rem 1.5rem;
          border-radius: 25px;
          font-family: 'Creepster', sans-serif;
          text-decoration: none;
          border: 1px solid #c70039;
          box-shadow: 0 0 10px rgba(199, 0, 57, 0.4);
          transition: transform 0.3s ease;
        }

        .register-btn:hover {
          transform: scale(1.05);
        }

        .dropdown {
          position: relative;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: rgba(13, 13, 13, 0.98);
          backdrop-filter: blur(10px);
          border-radius: 10px;
          padding: 1rem;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          border: 1px solid #6b0080;
          box-shadow: 0 0 20px rgba(107, 0, 128, 0.4);
        }

        .dropdown:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .menu-column {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .menu-column h3 {
          color: #c70039;
          font-family: 'Creepster', sans-serif;
          text-shadow: 0 0 10px rgba(199, 0, 57, 0.5);
          margin-bottom: 0.5rem;
        }

        .dropdown-menu a {
          color: #e0e0e0;
          text-decoration: none;
          padding: 0rem 1rem;
          border-radius: 5px;
          transition: all 0.3s ease;
        }

        .dropdown-menu a:hover {
          background: rgba(199, 0, 57, 0.3);
          transform: translateX(5px);
          color: #c70039;
        }

        .nav-toggle {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
          height: 20px;
          cursor: pointer;
        }

        .nav-toggle span {
          height: 2px;
          background: #c70039;
        }

        @media (max-width: 768px) {
          .nav-toggle {
            display: flex;
          }

          .nav-menu {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(13, 13, 13, 0.98);
            padding: 1rem;
            border-bottom: 1px solid #6b0080;
          }

          .nav-menu.active {
            display: flex;
          }

          .dropdown-menu {
            position: static;
            transform: none;
            opacity: 1;
            visibility: visible;
            display: none;
            margin-top: 0.5rem;
          }

          .dropdown.active .dropdown-menu {
            display: flex;
            flex-direction: column;
          }
        }
      </style>

      <nav class="navbar">
        <a href="/index.html" class="logo">Mahotsav</a>

        <div class="nav-toggle">
          <span></span><span></span><span></span>
        </div>

        <ul class="nav-menu">
          <li><a href="/pages/about.html" class="nav-link">About Us</a></li>

          <li class="dropdown">
            <a class="dropdown-toggle">Events ▾</a>
            <div class="dropdown-menu">
              <div class="menu-column">
                <h3>Main Events</h3>
                <a href="/pages/events/wall-painting.html">Wall Painting</a>
                <a href="/pages/events/road-painting.html">Road Painting</a>
                <a href="/pages/events/masquerade.html">Masquerade</a>
                <a href="/pages/events/paper-in-vogue.html">Paper In Vogue</a>
                <a href="/pages/events/spot-sketching.html">Spot Sketching</a>
                <a href="/pages/events/kirigami.html">Kirigami</a>
                <a href="/pages/events/face-painting.html">Face Painting</a>
                <a href="/pages/events/scandal.html">Scandal</a>
                <a href="/pages/events/comicstan.html">Comicstan</a>
                <a href="/pages/events/calligraphy.html">Calligraphy</a>
                <a href="/pages/events/brush-attack.html">Brush Attack</a>
                <a href="/pages/events/click-o-mania.html">Click-O-Mania</a>
              </div>
            </div>
          </li>

          <li class="dropdown">
            <a class="dropdown-toggle">Gallery ▾</a>
            <div class="dropdown-menu">
              <a href="#">Mahotsav 2026</a>
              <a href="#">Mahotsav 2025</a>
              <a href="#">Event Memories</a>
            </div>
          </li>

          <li class="dropdown">
            <a class="dropdown-toggle">Contact ▾</a>
            <div class="dropdown-menu">
              <a href="#">Instagram</a>
              <a href="#">WhatsApp</a>
              <a href="#">LinkedIn</a>
            </div>
          </li>

          <li><a href="#" class="nav-link">Sponsors</a></li>
          <li><a href="/pages/register.html" class="register-btn">Register</a></li>
        </ul>
      </nav>
    `;
  }
}

customElements.define("mahotsav-navbar", MahotsavNavbar);
