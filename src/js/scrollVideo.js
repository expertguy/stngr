import heroVideo from "../assets/hero.mp4"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const FPS = 30

const SECTION_CONFIG = [
  {
    id: 'hero',
    videoId: 'videoHero',
    videoSrc: heroVideo,
    startFrame: 6,
    endFrame: 148,
    pauseAtEnd: false,
    elements: {
      overlay: 'heroOverlay',
      videoOverlay: 'videoHeroOverlay'
    }
  },
  {
    id: 'safety',
    videoId: 'videoSafety',
    videoSrc: heroVideo,
    startFrame: 148,
    endFrame: 274,
    pauseAtEnd: true,
    pauseDuration: 800,
    elements: {
      holdInfo: 'holdInfo'
    }
  },
  {
    id: 'hotspots',
    videoId: 'videoHotspots',
    videoSrc: heroVideo,
    startFrame: 274,
    endFrame: 368,
    pauseAtEnd: true,
    pauseDuration: 800,
    elements: {
      hotspotShell: 'hotspotShell',
      hotspotOuter: 'hotspotOuter',
      hotspotInner: 'hotspotInner'
    }
  },
  {
    id: 'why',
    videoId: 'videoWhy',
    videoSrc: heroVideo,
    startFrame: 368,
    endFrame: 434,
    pauseAtEnd: true,
    pauseDuration: 800,
    blurVideo: true,
    elements: {
      overlay: 'whyStngr'
    }
  },
  {
    id: 'how',
    videoId: 'videoHow',
    videoSrc: heroVideo,
    startFrame: 434,
    endFrame: 505,
    pauseAtEnd: true,
    pauseDuration: 800,
    blurVideo: true,
    elements: {
      overlay: 'howItWorks'
    }
  },
  {
    id: 'features',
    videoId: 'videoFeatures',
    videoSrc: heroVideo,
    startFrame: 505,
    endFrame: 647,
    pauseAtEnd: true,
    pauseDuration: 800,
    elements: {
      overlay: 'featuresOverlay'
    }
  },
  {
    id: 'protection',
    videoId: 'videoProtection',
    videoSrc: heroVideo,
    startFrame: 647,
    endFrame: 647,
    pauseAtEnd: true,
    pauseDuration: 800,
    blurVideo: true,
    elements: {
      holdInfoRight: 'holdInfoRight',
      protectionFrame: 'protectionFrameContainer'
    }
  }
]

const PIXELS_PER_FRAME = 3
const DEFAULT_PAUSE_PIXELS = 800

export function initScrollVideo() {
  const frameEl = document.getElementById("frameCount")
  const videoElements = {}
  const sectionData = []

  let totalScrollLength = 0
  let currentSectionIndex = 0

  SECTION_CONFIG.forEach((config, index) => {
    const video = document.getElementById(config.videoId)
    if (!video) return

    videoElements[config.id] = {
      element: video,
      loaded: false
    }

    video.src = config.videoSrc
    video.pause()

    const frameCount = config.endFrame - config.startFrame
    const scrollDistance = frameCount * PIXELS_PER_FRAME
    const pauseDistance = config.pauseAtEnd ? (config.pauseDuration || DEFAULT_PAUSE_PIXELS) : 0

    const section = {
      ...config,
      index,
      video,
      frameCount,
      scrollStart: totalScrollLength,
      scrollEnd: totalScrollLength + scrollDistance + pauseDistance,
      playScrollStart: totalScrollLength,
      playScrollEnd: totalScrollLength + scrollDistance,
      pauseScrollStart: totalScrollLength + scrollDistance,
      pauseScrollEnd: totalScrollLength + scrollDistance + pauseDistance,
      startTime: config.startFrame / FPS,
      endTime: config.endFrame / FPS,
      elements: {}
    }

    if (config.elements) {
      Object.entries(config.elements).forEach(([key, id]) => {
        section.elements[key] = document.getElementById(id)
      })
    }

    sectionData.push(section)
    totalScrollLength = section.scrollEnd
  })

  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))
  const lerp = (a, b, t) => a + (b - a) * t
  const invLerp = (a, b, v) => (v - a) / (b - a)
  const frameFromTime = (t) => Math.round(t * FPS)

  function switchToSection(index) {
    if (currentSectionIndex === index) return

    sectionData.forEach((section, i) => {
      if (i === index) {
        section.video.classList.remove('is-hidden')
      } else {
        section.video.classList.add('is-hidden')
      }
    })

    currentSectionIndex = index
  }

  function initializeSection(section) {
    if (videoElements[section.id].loaded) return

    section.video.currentTime = section.startTime
    videoElements[section.id].loaded = true
  }

  sectionData.forEach(section => {
    section.video.addEventListener('loadedmetadata', () => {
      if (section.id === 'hero') {
        initializeSection(section)
        section.video.currentTime = section.startTime
        section.video.classList.add('is-blurred')
      }
    })
  })

  ScrollTrigger.create({
    trigger: ".video-section",
    start: "top top",
    end: `+=${totalScrollLength}`,
    scrub: 0.5,
    pin: true,
    pinSpacing: false,

    onUpdate: (self) => {
      const scrollPos = self.progress * totalScrollLength

      const activeSection = sectionData.find(section =>
        scrollPos >= section.scrollStart && scrollPos <= section.scrollEnd
      )

      if (!activeSection) return

      switchToSection(activeSection.index)
      initializeSection(activeSection)

      const video = activeSection.video
      let targetTime = activeSection.startTime

      if (scrollPos >= activeSection.playScrollStart && scrollPos <= activeSection.playScrollEnd) {
        const playProgress = invLerp(activeSection.playScrollStart, activeSection.playScrollEnd, scrollPos)
        targetTime = lerp(activeSection.startTime, activeSection.endTime, playProgress)
      } else if (scrollPos > activeSection.playScrollEnd) {
        targetTime = activeSection.endTime
      }

      targetTime = clamp(targetTime, 0, video.duration)
      video.currentTime = targetTime

      const currentFrame = frameFromTime(targetTime)

      if (activeSection.id === 'hero') {
        const heroProgress = scrollPos / (activeSection.scrollEnd - activeSection.scrollStart)
        if (heroProgress > 0.02) {
          activeSection.elements.overlay?.classList.add('is-hidden')
          activeSection.elements.videoOverlay?.classList.add('is-hidden')
          video.classList.remove('is-blurred')
        } else {
          activeSection.elements.overlay?.classList.remove('is-hidden')
          activeSection.elements.videoOverlay?.classList.remove('is-hidden')
          video.classList.add('is-blurred')
        }
      }

      sectionData.forEach(section => {
        const isActive = section.id === activeSection.id
        const isPaused = scrollPos >= section.pauseScrollStart && scrollPos <= section.pauseScrollEnd
        const isAtEndFrame = currentFrame === section.endFrame

        if (section.blurVideo) {
          if (isActive && (isPaused || isAtEndFrame)) {
            video.classList.add('is-blurred')
          } else if (isActive) {
            video.classList.remove('is-blurred')
          }
        }

        Object.values(section.elements).forEach(el => {
          if (!el) return

          if (isActive && (isPaused || isAtEndFrame)) {
            el.classList.add('visible')
          } else {
            el.classList.remove('visible')
          }
        })

        if (section.id === 'hotspots') {
          if (isActive && currentFrame === section.endFrame) {
            section.elements.hotspotShell?.classList.add('visible')
            section.elements.hotspotOuter?.classList.add('visible')
            section.elements.hotspotInner?.classList.add('visible')
          } else {
            section.elements.hotspotShell?.classList.remove('visible')
            section.elements.hotspotOuter?.classList.remove('visible')
            section.elements.hotspotInner?.classList.remove('visible')
          }
        }

        if (section.id === 'protection') {
          if (isActive && isAtEndFrame) {
            section.elements.holdInfoRight?.classList.add('visible')
            section.elements.protectionFrame?.classList.add('visible')
          } else {
            section.elements.holdInfoRight?.classList.remove('visible')
            section.elements.protectionFrame?.classList.remove('visible')
          }
        }
      })

      if (frameEl) {
        frameEl.textContent = currentFrame
      }
    }
  })

  sectionData.forEach(section => {
    section.video.addEventListener("timeupdate", () => {
      if (section.index === currentSectionIndex && frameEl) {
        frameEl.textContent = Math.round(section.video.currentTime * FPS)
      }
    })
  })
}
