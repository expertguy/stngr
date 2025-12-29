export function Newsletter() {
  return `
    <section class="newsletter">
      <div class="newsletter-icon">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.66675 11.6665H73.3334V68.3332H6.66675V11.6665Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
          <path d="M6.66675 23.3335L40.0001 40.0002L73.3334 23.3335" stroke="white" stroke-width="2"/>
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
