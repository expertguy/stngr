const FPS = 30
const PROTECTION_FRAME = 647
const PROTECTION_TIME = PROTECTION_FRAME / FPS

function updateNewsletterBlurShapes() {
  const section = document.querySelector('.newsletter-footer-section')
  const blurTop = document.querySelector('.newsletter-blur-top')
  const blurBottom = document.querySelector('.newsletter-blur-bottom')

  if (!section || !blurTop || !blurBottom) return

  const viewportWidth = window.innerWidth
  const sectionHeight = section.offsetHeight

  // Calculate video height based on 16:9 aspect ratio (with scale(2) applied)
  const videoHeight = ((viewportWidth * 9) / 16) * 2

  // Calculate remaining space
  const remainingSpace = sectionHeight - videoHeight

  if (remainingSpace > 0) {
    // Split the remaining space between top and bottom
    const topHeight = remainingSpace / 2
    const bottomHeight = remainingSpace / 2

    blurTop.style.height = `${topHeight}px`
    blurBottom.style.height = `${bottomHeight}px`
  } else {
    // If video is taller than section, hide blur shapes
    blurTop.style.height = '0px'
    blurBottom.style.height = '0px'
  }
}

export function initNewsletterFooter() {
  const backgroundVideo = document.getElementById("backgroundVideo")

  if (!backgroundVideo) return

  backgroundVideo.addEventListener("loadedmetadata", () => {
    backgroundVideo.currentTime = PROTECTION_TIME
    backgroundVideo.pause()
    updateNewsletterBlurShapes()
  })

  // Update blur shapes on resize
  window.addEventListener('resize', updateNewsletterBlurShapes)

  // Initial update
  updateNewsletterBlurShapes()
}
