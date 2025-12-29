export function Newsletter() {
  return `
    <section class="newsletter">
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
    </section>
  `
}
