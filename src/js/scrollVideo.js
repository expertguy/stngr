import heroVideo from "../assets/hero.mp4"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/* ================= CONSTANTS ================= */

const FPS = 30

// HERO
const HERO_FRAME = 6
const HERO_TIME = HERO_FRAME / FPS

// SAFETY (FRAME 148)
const SAFETY_FRAME = 148
const SAFETY_TIME = SAFETY_FRAME / FPS

// HOTSPOTS (FRAME 274)
const HOTSPOT_FRAME = 274
const HOTSPOT_TIME = HOTSPOT_FRAME / FPS

// WHY STRNGR (FRAME 368)
const WHY_FRAME = 368
const WHY_TIME = WHY_FRAME / FPS

// HOW IT WORKS (FRAME 434)
const HOW_FRAME = 434
const HOW_TIME = HOW_FRAME / FPS

// FEATURES (FRAME 505)
const FEATURES_FRAME = 505
const FEATURES_TIME = FEATURES_FRAME / FPS

// PROTECTION (FRAME 647)
const PROTECTION_FRAME = 647
const PROTECTION_TIME = PROTECTION_FRAME / FPS

// SCROLL CALCULATION
const TOTAL_FRAMES = PROTECTION_FRAME - HERO_FRAME

// Fixed section heights (in viewport heights)
const SECTION_HEIGHTS = {
  HERO: 1.5,              // Hero intro section
  SAFETY_TRANSITION: 2,   // Transition to safety
  SAFETY_PAUSE: 1.5,      // Safety section pause
  HOTSPOT_TRANSITION: 2,  // Transition to hotspots
  HOTSPOT_PAUSE: 1.5,     // Hotspots section pause
  WHY_TRANSITION: 2,      // Transition to why strngr
  WHY_PAUSE: 1.5,         // Why strngr section pause
  HOW_TRANSITION: 2,      // Transition to how it works
  HOW_PAUSE: 1.5,         // How it works section pause
  FEATURES_TRANSITION: 2, // Transition to features
  FEATURES_PAUSE: 1.5,    // Features section pause
  PROTECTION_TRANSITION: 2, // Transition to protection
  PROTECTION_PAUSE: 1.5   // Protection section pause
}

// Calculate total scroll length from fixed heights
function calculateScrollLength() {
  const viewportHeight = window.innerHeight
  const totalVH = Object.values(SECTION_HEIGHTS).reduce((sum, vh) => sum + vh, 0)
  return viewportHeight * totalVH
}

// Calculate accumulated heights for each section boundary
function getSectionBoundaries() {
  const vh = window.innerHeight
  let accumulated = 0
  const boundaries = {}

  boundaries.heroEnd = accumulated += vh * SECTION_HEIGHTS.HERO
  boundaries.safetyStart = accumulated
  boundaries.safetyEnd = accumulated += vh * SECTION_HEIGHTS.SAFETY_TRANSITION
  boundaries.safetyPauseEnd = accumulated += vh * SECTION_HEIGHTS.SAFETY_PAUSE
  boundaries.hotspotStart = accumulated
  boundaries.hotspotEnd = accumulated += vh * SECTION_HEIGHTS.HOTSPOT_TRANSITION
  boundaries.hotspotPauseEnd = accumulated += vh * SECTION_HEIGHTS.HOTSPOT_PAUSE
  boundaries.whyStart = accumulated
  boundaries.whyEnd = accumulated += vh * SECTION_HEIGHTS.WHY_TRANSITION
  boundaries.whyPauseEnd = accumulated += vh * SECTION_HEIGHTS.WHY_PAUSE
  boundaries.howStart = accumulated
  boundaries.howEnd = accumulated += vh * SECTION_HEIGHTS.HOW_TRANSITION
  boundaries.howPauseEnd = accumulated += vh * SECTION_HEIGHTS.HOW_PAUSE
  boundaries.featuresStart = accumulated
  boundaries.featuresEnd = accumulated += vh * SECTION_HEIGHTS.FEATURES_TRANSITION
  boundaries.featuresPauseEnd = accumulated += vh * SECTION_HEIGHTS.FEATURES_PAUSE
  boundaries.protectionStart = accumulated
  boundaries.protectionEnd = accumulated += vh * SECTION_HEIGHTS.PROTECTION_TRANSITION
  boundaries.protectionPauseEnd = accumulated += vh * SECTION_HEIGHTS.PROTECTION_PAUSE

  boundaries.total = accumulated

  return boundaries
}

let TOTAL_SCROLL_LENGTH = calculateScrollLength()
let boundaries = getSectionBoundaries()

/* ================= INIT ================= */

export function initScrollVideo() {
  const video = document.getElementById("scrollVideo")
  const frameEl = document.getElementById("frameCount")

  const heroOverlay = document.getElementById("heroOverlay")
  const videoHeroOverlay = document.getElementById("videoHeroOverlay")
  const holdInfo = document.getElementById("holdInfo")
  const holdInfoRight = document.getElementById("holdInfoRight")
  const protectionFrameContainer = document.getElementById("protectionFrameContainer")

  const hotspotShell = document.getElementById("hotspotShell")
  const hotspotOuter = document.getElementById("hotspotOuter")
  const hotspotInner = document.getElementById("hotspotInner")

  const whyStngr = document.getElementById("whyStngr")
  const howItWorks = document.getElementById("howItWorks")
  const featuresOverlay = document.getElementById("featuresOverlay")

  if (!video) return

  video.src = heroVideo
  video.pause()

  video.addEventListener("loadedmetadata", () => {
    /* ================= HERO LOCK ================= */
    video.currentTime = HERO_TIME
    video.classList.add("is-blurred")

    const totalPlayable = video.duration - HERO_TIME

    /* ================= RESUME TIMES ================= */
    const SAFETY_RESUME_TIME = Math.min(video.duration, (SAFETY_FRAME + 1) / FPS)
    const HOTSPOT_RESUME_TIME = Math.min(video.duration, (HOTSPOT_FRAME + 1) / FPS)
    const WHY_RESUME_TIME = Math.min(video.duration, (WHY_FRAME + 1) / FPS)
    const HOW_RESUME_TIME = Math.min(video.duration, (HOW_FRAME + 1) / FPS)
    const FEATURES_RESUME_TIME = Math.min(video.duration, (FEATURES_FRAME + 1) / FPS)
    const PROTECTION_RESUME_TIME = Math.min(video.duration, (PROTECTION_FRAME + 1) / FPS)

    /* ================= HELPERS ================= */

    const clamp = (v, min = 0, max = 1) =>
      Math.min(max, Math.max(min, v))

    const lerp = (a, b, t) =>
      a + (b - a) * t

    const invLerp = (a, b, v) =>
      (v - a) / (b - a)

    const frameFromTime = (t) =>
      Math.round(t * FPS)

    /* ================= SCROLL ================= */

    ScrollTrigger.create({
      trigger: ".video-section",
      start: "top top",
      end: `+=${TOTAL_SCROLL_LENGTH}`,
      scrub: 0.5,
      pin: true,
      pinSpacing: false,

      onUpdate: (self) => {
        const p = clamp(self.progress)
        const scrollPos = p * boundaries.total
        let t

        /* ---------- HERO PHASE ---------- */
        if (scrollPos > boundaries.heroEnd) {
          heroOverlay?.classList.add("is-hidden")
          videoHeroOverlay?.classList.add("is-hidden")
          video.classList.remove("is-blurred")
        } else {
          heroOverlay?.classList.remove("is-hidden")
          videoHeroOverlay?.classList.remove("is-hidden")
          video.classList.add("is-blurred")
        }

        /* ---------- HERO TO SAFETY ---------- */
        if (scrollPos < boundaries.safetyStart) {
          const local = invLerp(0, boundaries.safetyStart, scrollPos)
          t = lerp(HERO_TIME, SAFETY_TIME, local)
          holdInfo?.classList.remove("visible")
        }

        /* ---------- SAFETY TRANSITION ---------- */
        else if (scrollPos >= boundaries.safetyStart && scrollPos < boundaries.safetyEnd) {
          const local = invLerp(boundaries.safetyStart, boundaries.safetyEnd, scrollPos)
          t = lerp(HERO_TIME, SAFETY_TIME, local)
          holdInfo?.classList.remove("visible")
        }

        /* ---------- SAFETY PAUSE ---------- */
        else if (scrollPos >= boundaries.safetyEnd && scrollPos < boundaries.safetyPauseEnd) {
          t = SAFETY_TIME
          holdInfo?.classList.add("visible")
        }

        /* ---------- SAFETY TO HOTSPOTS ---------- */
        else if (scrollPos >= boundaries.safetyPauseEnd && scrollPos < boundaries.hotspotEnd) {
          const local = invLerp(boundaries.safetyPauseEnd, boundaries.hotspotEnd, scrollPos)
          t = lerp(SAFETY_RESUME_TIME, HOTSPOT_TIME, local)
          holdInfo?.classList.remove("visible")
        }

        /* ---------- HOTSPOTS PAUSE ---------- */
        else if (scrollPos >= boundaries.hotspotEnd && scrollPos < boundaries.hotspotPauseEnd) {
          t = HOTSPOT_TIME
        }

        /* ---------- HOTSPOTS TO WHY STRNGR ---------- */
        else if (scrollPos >= boundaries.hotspotPauseEnd && scrollPos < boundaries.whyEnd) {
          const local = invLerp(boundaries.hotspotPauseEnd, boundaries.whyEnd, scrollPos)
          t = lerp(HOTSPOT_RESUME_TIME, WHY_TIME, local)
        }

        /* ---------- WHY STRNGR PAUSE ---------- */
        else if (scrollPos >= boundaries.whyEnd && scrollPos < boundaries.whyPauseEnd) {
          t = WHY_TIME
        }

        /* ---------- WHY STRNGR TO HOW IT WORKS ---------- */
        else if (scrollPos >= boundaries.whyPauseEnd && scrollPos < boundaries.howEnd) {
          const local = invLerp(boundaries.whyPauseEnd, boundaries.howEnd, scrollPos)
          t = lerp(WHY_RESUME_TIME, HOW_TIME, local)
        }

        /* ---------- HOW IT WORKS PAUSE ---------- */
        else if (scrollPos >= boundaries.howEnd && scrollPos < boundaries.howPauseEnd) {
          t = HOW_TIME
        }

        /* ---------- HOW IT WORKS TO FEATURES ---------- */
        else if (scrollPos >= boundaries.howPauseEnd && scrollPos < boundaries.featuresEnd) {
          const local = invLerp(boundaries.howPauseEnd, boundaries.featuresEnd, scrollPos)
          t = lerp(HOW_RESUME_TIME, FEATURES_TIME, local)
        }

        /* ---------- FEATURES PAUSE ---------- */
        else if (scrollPos >= boundaries.featuresEnd && scrollPos < boundaries.featuresPauseEnd) {
          t = FEATURES_TIME
        }

        /* ---------- FEATURES TO PROTECTION ---------- */
        else if (scrollPos >= boundaries.featuresPauseEnd && scrollPos < boundaries.protectionEnd) {
          const local = invLerp(boundaries.featuresPauseEnd, boundaries.protectionEnd, scrollPos)
          t = lerp(FEATURES_RESUME_TIME, PROTECTION_TIME, local)
        }

        /* ---------- PROTECTION PAUSE ---------- */
        else {
          t = PROTECTION_TIME
        }

        /* ---------- APPLY TIME ---------- */
        t = clamp(t, 0, video.duration)
        video.currentTime = t

        /* ---------- FRAME-LOCKED VISIBILITY ---------- */
        const frame = frameFromTime(t)

        // SAFETY (frame 148)
        if (frame === SAFETY_FRAME) {
          holdInfo?.classList.add("visible")
        } else {
          holdInfo?.classList.remove("visible")
        }

        // PROTECTION (frame 647)
        if (frame === PROTECTION_FRAME) {
          holdInfoRight?.classList.add("visible")
          protectionFrameContainer?.classList.add("visible")
          video.classList.add("is-blurred")
        } else {
          holdInfoRight?.classList.remove("visible")
          protectionFrameContainer?.classList.remove("visible")
        }

        // HOTSPOTS (frame 274 ONLY)
        if (frame === HOTSPOT_FRAME) {
          hotspotShell?.classList.add("visible")
          hotspotOuter?.classList.add("visible")
          hotspotInner?.classList.add("visible")
        } else {
          hotspotShell?.classList.remove("visible")
          hotspotOuter?.classList.remove("visible")
          hotspotInner?.classList.remove("visible")
        }

        // WHY STRNGR (frame 368)
        if (frame === WHY_FRAME) {
          video.classList.add("is-blurred")
          whyStngr?.classList.add("visible")
          howItWorks?.classList.remove("visible")
          featuresOverlay?.classList.remove("visible")
        }
        // HOW IT WORKS (frame 434)
        else if (frame === HOW_FRAME) {
          video.classList.add("is-blurred")
          whyStngr?.classList.remove("visible")
          howItWorks?.classList.add("visible")
          featuresOverlay?.classList.remove("visible")
        }
        // FEATURES (frame 505) - no blur
        else if (frame === FEATURES_FRAME) {
          video.classList.remove("is-blurred")
          whyStngr?.classList.remove("visible")
          howItWorks?.classList.remove("visible")
          featuresOverlay?.classList.add("visible")
        }
        // Not on any hold frame
        else {
          if (frame < WHY_FRAME || frame > FEATURES_FRAME) {
            video.classList.remove("is-blurred")
          }
          whyStngr?.classList.remove("visible")
          howItWorks?.classList.remove("visible")
          featuresOverlay?.classList.remove("visible")
        }
      }
    })

    /* ================= RESIZE HANDLER ================= */
    let resizeTimeout
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        // Recalculate scroll length and boundaries for new viewport size
        TOTAL_SCROLL_LENGTH = calculateScrollLength()
        boundaries = getSectionBoundaries()

        // Refresh ScrollTrigger to apply new scroll length
        ScrollTrigger.refresh()
      }, 250)
    })
  })

  /* ================= DEBUG ================= */

  video.addEventListener("timeupdate", () => {
    if (!frameEl) return
    frameEl.textContent =
      Math.round(video.currentTime * FPS)
  })
}
