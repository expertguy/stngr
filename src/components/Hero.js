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
          Protection<br />
          Without<br />
          Attention
        </h1>

        <p class="subtitle">
          Discreet personal protection engineered for the moments that matter
        </p>

        <div class="cta">
          <button class="btn-primary">Learn More</button>
          <button class="btn-outline">Join Waitlist</button>
        </div>

        <div class="scroll-indicator">
          SCROLL
          <span></span>
        </div>
      </div>

    </section>
  `
}
