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
const PIXELS_PER_FRAME = 3
const PAUSE_PIXELS = 800
const TOTAL_SCROLL_LENGTH = (TOTAL_FRAMES * PIXELS_PER_FRAME) + (6 * PAUSE_PIXELS)

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
    const PAUSE_FRACTION = PAUSE_PIXELS / TOTAL_SCROLL_LENGTH

    /* ================= FRAME POSITIONS IN SCROLL ================= */
    const framesBeforeSafety = SAFETY_FRAME - HERO_FRAME
    const framesBeforeHotspot = HOTSPOT_FRAME - HERO_FRAME
    const framesBeforeWhy = WHY_FRAME - HERO_FRAME
    const framesBeforeHow = HOW_FRAME - HERO_FRAME
    const framesBeforeFeatures = FEATURES_FRAME - HERO_FRAME
    const framesBeforeProtection = PROTECTION_FRAME - HERO_FRAME

    /* ================= SAFETY (FRAME 148) ================= */
    const safetyScrollPos = (framesBeforeSafety * PIXELS_PER_FRAME) / TOTAL_SCROLL_LENGTH
    const safetyStart = safetyScrollPos
    const safetyEnd = safetyStart + PAUSE_FRACTION
    const SAFETY_RESUME_TIME = Math.min(video.duration, (SAFETY_FRAME + 1) / FPS)

    /* ================= HOTSPOTS (FRAME 274) ================= */
    const hotspotScrollPos = ((framesBeforeHotspot * PIXELS_PER_FRAME) + PAUSE_PIXELS) / TOTAL_SCROLL_LENGTH
    const hotspotStart = hotspotScrollPos
    const hotspotEnd = hotspotStart + PAUSE_FRACTION
    const HOTSPOT_RESUME_TIME = Math.min(video.duration, (HOTSPOT_FRAME + 1) / FPS)

    /* ================= WHY STRNGR (FRAME 368) ================= */
    const whyScrollPos = ((framesBeforeWhy * PIXELS_PER_FRAME) + (2 * PAUSE_PIXELS)) / TOTAL_SCROLL_LENGTH
    const whyStart = whyScrollPos
    const whyEnd = whyStart + PAUSE_FRACTION
    const WHY_RESUME_TIME = Math.min(video.duration, (WHY_FRAME + 1) / FPS)

    /* ================= HOW IT WORKS (FRAME 434) ================= */
    const howScrollPos = ((framesBeforeHow * PIXELS_PER_FRAME) + (3 * PAUSE_PIXELS)) / TOTAL_SCROLL_LENGTH
    const howStart = howScrollPos
    const howEnd = howStart + PAUSE_FRACTION
    const HOW_RESUME_TIME = Math.min(video.duration, (HOW_FRAME + 1) / FPS)

    /* ================= FEATURES (FRAME 505) ================= */
    const featuresScrollPos = ((framesBeforeFeatures * PIXELS_PER_FRAME) + (4 * PAUSE_PIXELS)) / TOTAL_SCROLL_LENGTH
    const featuresStart = featuresScrollPos
    const featuresEnd = featuresStart + PAUSE_FRACTION
    const FEATURES_RESUME_TIME = Math.min(video.duration, (FEATURES_FRAME + 1) / FPS)

    /* ================= PROTECTION (FRAME 647) ================= */
    const protectionScrollPos = ((framesBeforeProtection * PIXELS_PER_FRAME) + (5 * PAUSE_PIXELS)) / TOTAL_SCROLL_LENGTH
    const protectionStart = protectionScrollPos
    const protectionEnd = protectionStart + PAUSE_FRACTION
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
        let t

        /* ---------- HERO PHASE ---------- */
        if (p > 0.02) {
          heroOverlay?.classList.add("is-hidden")
          videoHeroOverlay?.classList.add("is-hidden")
          video.classList.remove("is-blurred")
        } else {
          heroOverlay?.classList.remove("is-hidden")
          videoHeroOverlay?.classList.remove("is-hidden")
          video.classList.add("is-blurred")
        }

        /* ---------- BEFORE SAFETY ---------- */
        if (p < safetyStart) {
          const local = invLerp(0, safetyStart, p)
          t = lerp(HERO_TIME, SAFETY_TIME, local)
          holdInfo?.classList.remove("visible")
        }

        /* ---------- SAFETY (FRAME 148) ---------- */
        else if (p >= safetyStart && p <= safetyEnd) {
          t = SAFETY_TIME
          holdInfo?.classList.add("visible")
        }

        /* ---------- SAFETY TO HOTSPOTS ---------- */
        else if (p > safetyEnd && p < hotspotStart) {
          const local = invLerp(safetyEnd, hotspotStart, p)
          t = lerp(SAFETY_RESUME_TIME, HOTSPOT_TIME, local)
          holdInfo?.classList.remove("visible")
        }

        /* ---------- HOTSPOTS (FRAME 274) ---------- */
        else if (p >= hotspotStart && p <= hotspotEnd) {
          t = HOTSPOT_TIME
        }

        /* ---------- HOTSPOTS TO WHY STRNGR ---------- */
        else if (p > hotspotEnd && p < whyStart) {
          const local = invLerp(hotspotEnd, whyStart, p)
          t = lerp(HOTSPOT_RESUME_TIME, WHY_TIME, local)
        }

        /* ---------- WHY STRNGR (FRAME 368) ---------- */
        else if (p >= whyStart && p <= whyEnd) {
          t = WHY_TIME
        }

        /* ---------- WHY STRNGR TO HOW IT WORKS ---------- */
        else if (p > whyEnd && p < howStart) {
          const local = invLerp(whyEnd, howStart, p)
          t = lerp(WHY_RESUME_TIME, HOW_TIME, local)
        }

        /* ---------- HOW IT WORKS (FRAME 434) ---------- */
        else if (p >= howStart && p <= howEnd) {
          t = HOW_TIME
        }

        /* ---------- HOW IT WORKS TO FEATURES ---------- */
        else if (p > howEnd && p < featuresStart) {
          const local = invLerp(howEnd, featuresStart, p)
          t = lerp(HOW_RESUME_TIME, FEATURES_TIME, local)
        }

        /* ---------- FEATURES (FRAME 505) ---------- */
        else if (p >= featuresStart && p <= featuresEnd) {
          t = FEATURES_TIME
        }

        /* ---------- FEATURES TO PROTECTION ---------- */
        else if (p > featuresEnd && p < protectionStart) {
          const local = invLerp(featuresEnd, protectionStart, p)
          t = lerp(FEATURES_RESUME_TIME, PROTECTION_TIME, local)
        }

        /* ---------- PROTECTION (FRAME 647) ---------- */
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
  })

  /* ================= DEBUG ================= */

  video.addEventListener("timeupdate", () => {
    if (!frameEl) return
    frameEl.textContent =
      Math.round(video.currentTime * FPS)
  })
}
