export function Hero() {
  return `
    <div class="video-hero-overlay" id="videoHeroOverlay"></div>

    <div class="hero-overlay-content" id="heroOverlay">
      <div class="badge">
        <span class="badge-text badge-text-muted">LIMITED FIRST RUN</span>
        <span class="badge-dot"></span>
        <span class="badge-text badge-text-primary">SPRING 2026</span>
      </div>

      <h1>
        <span>Protection</span><br />
        <span>Without</span><br />
        <span>Attention</span>
      </h1>

      <p class="subtitle">
        Discreet personal protection engineered for the moments that matter.
      </p>

      <div class="cta">
        <a href="#holdInfo" class="btn-primary" style="text-decoration: none;">Learn More</a>
        <a href="#newsletter" class="btn-outline" style="text-decoration: none;">Join Waitlist</a>
      </div>

      <div class="scroll-indicator">
        <span class="scroll-text">SCROLL</span>
        <div class="scroll-arrow">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6L11 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  `
}
