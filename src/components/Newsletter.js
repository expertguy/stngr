import logo from "../assets/logo.png"

export function Newsletter() {
  return `
    <section class="newsletter" id="newsletter">
      <div class="newsletter-icon">
        <img src="${logo}" alt="STNGR logo" class="newsletter-logo" />
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
    </section>
  `
}
