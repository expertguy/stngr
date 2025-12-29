const FPS = 30
const PIXELS_PER_FRAME = 3
const PAUSE_PIXELS = 800

const HERO_FRAME = 6
const SAFETY_FRAME = 148
const HOTSPOT_FRAME = 274
const WHY_FRAME = 368
const HOW_FRAME = 434
const FEATURES_FRAME = 505
const PROTECTION_FRAME = 647

const SECTION_SCROLL_POSITIONS = {
  holdInfo: (SAFETY_FRAME - HERO_FRAME) * PIXELS_PER_FRAME,
  hotspotShell: ((HOTSPOT_FRAME - HERO_FRAME) * PIXELS_PER_FRAME) + PAUSE_PIXELS,
  whyStngr: ((WHY_FRAME - HERO_FRAME) * PIXELS_PER_FRAME) + (2 * PAUSE_PIXELS),
  howItWorks: ((HOW_FRAME - HERO_FRAME) * PIXELS_PER_FRAME) + (3 * PAUSE_PIXELS),
  featuresOverlay: ((FEATURES_FRAME - HERO_FRAME) * PIXELS_PER_FRAME) + (4 * PAUSE_PIXELS),
  protectionOverlay: ((PROTECTION_FRAME - HERO_FRAME) * PIXELS_PER_FRAME) + (5 * PAUSE_PIXELS)
}

export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href')
      if (href === '#' || !href) return

      const targetId = href.substring(1)

      if (targetId === 'newsletter') {
        e.preventDefault()
        const newsletterSection = document.getElementById('newsletter')
        if (newsletterSection) {
          newsletterSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
        return
      }

      if (SECTION_SCROLL_POSITIONS[targetId]) {
        e.preventDefault()
        const scrollPos = SECTION_SCROLL_POSITIONS[targetId]
        window.scrollTo({
          top: scrollPos,
          behavior: 'smooth'
        })
      }
    })
  })
}
