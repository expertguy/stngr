import heroBg from "../assets/hero.mp4"

export function Hero() {
  return `
    <section class="hero hero-video">

      <!-- Background video -->
      <video
        class="hero-bg-video"
        src="${heroBg}"
        autoplay
        muted
        loop
        playsinline
      ></video>

      <!-- Overlay -->
      <div class="hero-overlay"></div>

      <!-- Content -->
      <div class="hero-content">
        <span class="badge">LIMITED FIRST RUN COMING SPRING 2026</span>

        <h1>
          <span class="hero-word" style="--delay: 0">Protection</span><br />
          <span class="hero-word" style="--delay: 1">Without</span><br />
          <span class="hero-word" style="--delay: 2">Attention</span>
        </h1>

        <p class="subtitle">
          Discreet personal protection engineered for the moments that matter
        </p>

        <div class="cta">
          <button class="btn-primary">Learn More</button>
          <button class="btn-outline">Join Waitlist</button>
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

    </section>
  `
}
