import heroVideo from "../assets/hero.mp4"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/* ================= CONSTANTS ================= */

const FPS = 30

// HERO
const HERO_FRAME = 6
const HERO_TIME = HERO_FRAME / FPS

// HOLD 1 (TEXT)
const HOLD_FRAME = 148
const HOLD_TIME = HOLD_FRAME / FPS
const HOLD_SCROLL_FRACTION = 0.06

// HOLD 2 (HOTSPOTS)
const HOTSPOT_FRAME = 274
const HOTSPOT_TIME = HOTSPOT_FRAME / FPS
const HOTSPOT_SCROLL_FRACTION = 0.06

// HOLD 3 (WHY STRNGR - FRAME 368)
const WHY_FRAME = 368
const WHY_TIME = WHY_FRAME / FPS
const WHY_SCROLL_FRACTION = 0.06

// HOLD 4 (HOW IT WORKS - FRAME 434)
const HOW_FRAME = 434
const HOW_TIME = HOW_FRAME / FPS
const HOW_SCROLL_FRACTION = 0.06

// HOLD 5 (FEATURES - FRAME 505)
const FEATURES_FRAME = 505
const FEATURES_TIME = FEATURES_FRAME / FPS
const FEATURES_SCROLL_FRACTION = 0.06

// HOLD 6 (SAFETY RIGHT - FRAME 647)
const SAFETY_RIGHT_FRAME = 647
const SAFETY_RIGHT_TIME = SAFETY_RIGHT_FRAME / FPS
const SAFETY_RIGHT_SCROLL_FRACTION = 0.08

/* ================= INIT ================= */

export function initScrollVideo() {
  const video = document.getElementById("scrollVideo")
  const frameEl = document.getElementById("frameCount")

  const heroOverlay = document.getElementById("heroOverlay")
  const videoHeroOverlay = document.getElementById("videoHeroOverlay")
  const holdInfo = document.getElementById("holdInfo")
  const holdInfoRight = document.getElementById("holdInfoRight")

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

    /* ================= HOLD 1 ================= */
    const holdStart =
      (HOLD_TIME - HERO_TIME) / totalPlayable
    const holdEnd =
      holdStart + HOLD_SCROLL_FRACTION

    const HOLD_RESUME_TIME =
      Math.min(video.duration, HOLD_TIME + 1 / FPS)

    /* ================= HOLD 2 ================= */
    const hotspotStart =
      (HOTSPOT_TIME - HERO_TIME) / totalPlayable
    const hotspotEnd =
      hotspotStart + HOTSPOT_SCROLL_FRACTION

    const HOTSPOT_RESUME_TIME =
      Math.min(video.duration, HOTSPOT_TIME + 1 / FPS)

    /* ================= HOLD 3 (WHY STRNGR) ================= */
    const whyStart =
      (WHY_TIME - HERO_TIME) / totalPlayable
    const whyEnd =
      whyStart + WHY_SCROLL_FRACTION

    const WHY_RESUME_TIME =
      Math.min(video.duration, WHY_TIME + 1 / FPS)

    /* ================= HOLD 4 (HOW IT WORKS) ================= */
    const howStart =
      (HOW_TIME - HERO_TIME) / totalPlayable
    const howEnd =
      howStart + HOW_SCROLL_FRACTION

    const HOW_RESUME_TIME =
      Math.min(video.duration, HOW_TIME + 1 / FPS)

    /* ================= HOLD 5 (FEATURES) ================= */
    const featuresStart =
      (FEATURES_TIME - HERO_TIME) / totalPlayable
    const featuresEnd =
      featuresStart + FEATURES_SCROLL_FRACTION

    const FEATURES_RESUME_TIME =
      Math.min(video.duration, FEATURES_TIME + 1 / FPS)

    /* ================= HOLD 6 (SAFETY RIGHT) ================= */
    const safetyRightStart =
      (SAFETY_RIGHT_TIME - HERO_TIME) / totalPlayable
    const safetyRightEnd =
      safetyRightStart + SAFETY_RIGHT_SCROLL_FRACTION

    const SAFETY_RIGHT_RESUME_TIME =
      Math.min(video.duration, SAFETY_RIGHT_TIME + 1 / FPS)

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
      end: "+=4000",
      scrub: 0.4,
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

        /* ---------- BEFORE HOLD 1 ---------- */
        if (p < holdStart) {
          const local = invLerp(0, holdStart, p)
          t = lerp(HERO_TIME, HOLD_TIME, local)
          holdInfo?.classList.remove("visible")
        }

        /* ---------- HOLD 1 (FRAME 148) ---------- */
        else if (p >= holdStart && p <= holdEnd) {
          t = HOLD_TIME
          holdInfo?.classList.add("visible")
        }

        /* ---------- BETWEEN HOLDS ---------- */
        else if (p > holdEnd && p < hotspotStart) {
          const local = invLerp(holdEnd, hotspotStart, p)
          t = lerp(HOLD_RESUME_TIME, HOTSPOT_TIME, local)
          holdInfo?.classList.remove("visible")
        }

        /* ---------- HOLD 2 (FRAME 274) ---------- */
        else if (p >= hotspotStart && p <= hotspotEnd) {
          t = HOTSPOT_TIME
        }

        /* ---------- BETWEEN HOLDS 2 & 3 ---------- */
        else if (p > hotspotEnd && p < whyStart) {
          const local = invLerp(hotspotEnd, whyStart, p)
          t = lerp(HOTSPOT_RESUME_TIME, WHY_TIME, local)
        }

        /* ---------- HOLD 3 (WHY STRNGR - FRAME 368) ---------- */
        else if (p >= whyStart && p <= whyEnd) {
          t = WHY_TIME
        }

        /* ---------- BETWEEN HOLDS 3 & 4 ---------- */
        else if (p > whyEnd && p < howStart) {
          const local = invLerp(whyEnd, howStart, p)
          t = lerp(WHY_RESUME_TIME, HOW_TIME, local)
        }

        /* ---------- HOLD 4 (HOW IT WORKS - FRAME 434) ---------- */
        else if (p >= howStart && p <= howEnd) {
          t = HOW_TIME
        }

        /* ---------- BETWEEN HOLDS 4 & 5 ---------- */
        else if (p > howEnd && p < featuresStart) {
          const local = invLerp(howEnd, featuresStart, p)
          t = lerp(HOW_RESUME_TIME, FEATURES_TIME, local)
        }

        /* ---------- HOLD 5 (FEATURES - FRAME 505) ---------- */
        else if (p >= featuresStart && p <= featuresEnd) {
          t = FEATURES_TIME
        }

        /* ---------- BETWEEN HOLDS 5 & 6 ---------- */
        else if (p > featuresEnd && p < safetyRightStart) {
          const local = invLerp(featuresEnd, safetyRightStart, p)
          t = lerp(FEATURES_RESUME_TIME, SAFETY_RIGHT_TIME, local)
        }

        /* ---------- HOLD 6 (SAFETY RIGHT - FRAME 647) ---------- */
        else {
          t = SAFETY_RIGHT_TIME
        }

        /* ---------- APPLY TIME ---------- */
        t = clamp(t, 0, video.duration)
        video.currentTime = t

        /* ---------- FRAME-LOCKED VISIBILITY ---------- */
        const frame = frameFromTime(t)

        // HOLD TEXT (frame 148)
        if (frame === HOLD_FRAME) {
          holdInfo?.classList.add("visible")
        } else {
          holdInfo?.classList.remove("visible")
        }

        // SAFETY RIGHT (frame 647)
        if (frame === SAFETY_RIGHT_FRAME) {
          holdInfoRight?.classList.add("visible")
        } else {
          holdInfoRight?.classList.remove("visible")
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
