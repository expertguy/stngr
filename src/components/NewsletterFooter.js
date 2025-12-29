import logo from "../assets/logo.png"
import heroVideo from "../assets/hero.mp4"

export function NewsletterFooter() {
  return `
    <section class="newsletter-footer-section" id="newsletterFooterSection">
      <video
        id="backgroundVideo"
        class="newsletter-footer-video"
        muted
        playsinline
        preload="auto"
        src="${heroVideo}"
      ></video>
      <div class="newsletter-footer-container">
        <!-- Newsletter -->
        <div class="newsletter-content-wrapper">
          <div class="newsletter-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6.67" y="11.67" width="66.67" height="56.67" stroke="white" stroke-width="2"/>
              <rect x="6.67" y="23.33" width="66.67" height="16.67" stroke="white" stroke-width="2"/>
            </svg>
          </div>
          <div class="newsletter-content">
            <h2 class="newsletter-title">Be First to Know</h2>
            <p class="newsletter-subtitle">Join the waitlist for early access, updates, and launch details.</p>
          </div>
          <form class="newsletter-form">
            <input type="email" class="newsletter-input" placeholder="Enter your email" required />
            <button type="submit" class="newsletter-button">GET UPDATES</button>
          </form>
          <div class="newsletter-disclaimer">
            <p>No spam. Ever.</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer-wrapper">
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
        </div>
      </div>
    </section>
  `
}
