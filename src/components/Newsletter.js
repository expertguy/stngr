export function Newsletter() {
  return `
    <section class="newsletter" id="newsletter">
      <div class="newsletter-icon">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 30L40 50L60 30" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="15" y="20" width="50" height="40" rx="2" stroke="white" stroke-width="2"/>
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
