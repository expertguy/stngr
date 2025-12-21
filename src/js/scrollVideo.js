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
const HOTSPOT_FRAME = 280
const HOTSPOT_TIME = HOTSPOT_FRAME / FPS
const HOTSPOT_SCROLL_FRACTION = 0.06

/* ================= INIT ================= */

export function initScrollVideo() {
  const video = document.getElementById("scrollVideo")
  const frameEl = document.getElementById("frameCount")

  const heroOverlay = document.getElementById("heroOverlay")
  const videoHeroOverlay = document.getElementById("videoHeroOverlay")
  const holdInfo = document.getElementById("holdInfo")

  const hotspotShell = document.getElementById("hotspotShell")
  const hotspotOuter = document.getElementById("hotspotOuter")
  const hotspotInner = document.getElementById("hotspotInner")

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
      end: "+=5000",
      scrub: 0.4,
      pin: true,

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

        /* ---------- HOLD 2 (FRAME 280) ---------- */
        else if (p >= hotspotStart && p <= hotspotEnd) {
          t = HOTSPOT_TIME
        }

        /* ---------- AFTER HOLD 2 ---------- */
        else {
          const local = invLerp(hotspotEnd, 1, p)
          t = lerp(HOTSPOT_RESUME_TIME, video.duration, local)
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

        // HOTSPOTS (frame 280 ONLY)
        if (frame === HOTSPOT_FRAME) {
          hotspotShell?.classList.add("visible")
          hotspotOuter?.classList.add("visible")
          hotspotInner?.classList.add("visible")
        } else {
          hotspotShell?.classList.remove("visible")
          hotspotOuter?.classList.remove("visible")
          hotspotInner?.classList.remove("visible")
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
