export function VideoScroll() {
  return `
    <main class="scroll-container">

      <section class="video-section">

        <!-- VIDEO -->
        <video
          id="scrollVideo"
          muted
          playsinline
          preload="auto"
        ></video>

        <!-- HERO BLUR / DARK OVERLAY -->
        <div
          class="video-hero-overlay"
          id="videoHeroOverlay"
        ></div>

        <!-- HERO OVERLAY (STATIC AT FRAME 6) -->
        <div
          class="hero-overlay-content"
          id="heroOverlay"
        >
          <div class="badge">
            <span class="badge-text badge-text-muted">LIMITED FIRST RUN</span>
            <span class="badge-dot"></span>
            <span class="badge-text badge-text-primary">SPRING 2026</span>
          </div>

          <h1>Protection Without Attention</h1>

          <p class="subtitle">
            Discreet personal protection engineered for the moments that matter.
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

        <!-- FRAME DEBUG -->
        <div class="frame-debug">
          Frame: <span id="frameCount">0</span>
        </div>

        <!-- HOLD CHAPTER (FRAME 148) -->
        <div class="hold-info" id="holdInfo">
          <h3>Safety Shouldn’t Be Obvious.</h3>
          <p>
            STNGR is engineered for the moments that matter — daily commutes,
            city exploration, travel adventures, and beyond.
          </p>
        </div>

        <!-- HOTSPOTS (FRAME 280) -->

        <!-- REINFORCED IMPACT SHELL -->
        <div class="hotspot hotspot-shell" id="hotspotShell">
          <span class="hotspot-dot"></span>
          <span class="hotspot-line"></span>
          <div class="hotspot-label">
            REINFORCED<br />IMPACT SHELL
          </div>
        </div>

        <!-- SHOCK ABSORBING OUTER LAYER -->
        <div class="hotspot hotspot-outer" id="hotspotOuter">
          <span class="hotspot-dot"></span>
          <span class="hotspot-line"></span>
          <div class="hotspot-label">
            SHOCK-ABSORBING<br />OUTER LAYER
          </div>
        </div>

        <!-- CUSHIONED INNER LAYER -->
        <div class="hotspot hotspot-inner" id="hotspotInner">
          <span class="hotspot-dot"></span>
          <span class="hotspot-line"></span>
          <div class="hotspot-label">
            CUSHIONED<br />INNER LAYER
          </div>
        </div>

      </section>

      <section class="content">
        <h2>Built for Real Life</h2>
        <p>Designed to disappear until you need it.</p>
      </section>

    </main>
  `
}
