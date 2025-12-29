import logo from "../assets/logo.png"

export function Footer() {
  return `
    <footer class="footer">
      <div class="footer-logo">
        <img src="${logo}" alt="STNGR" />
      </div>
      <nav class="footer-nav">
        <a href="#featuresOverlay" class="footer-link">Features</a>
        <span class="footer-separator"></span>
        <a href="#howItWorks" class="footer-link">How It Works</a>
        <span class="footer-separator"></span>
        <a href="#whyStngr" class="footer-link">Why STNGR</a>
        <span class="footer-separator"></span>
        <a href="#holdInfo" class="footer-link">Safety</a>
        <span class="footer-separator"></span>
        <a href="#" class="footer-link">Terms & Conditions</a>
        <span class="footer-separator"></span>
        <a href="#" class="footer-link">Privacy Policy</a>
      </nav>
      <p class="footer-copyright">© 2026 STNGR. All rights reserved.</p>
    </footer>
  `
}
