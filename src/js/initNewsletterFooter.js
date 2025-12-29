const FPS = 30
const PROTECTION_FRAME = 647
const PROTECTION_TIME = PROTECTION_FRAME / FPS

export function initNewsletterFooter() {
  const backgroundVideo = document.getElementById("backgroundVideo")

  if (!backgroundVideo) return

  backgroundVideo.addEventListener("loadedmetadata", () => {
    backgroundVideo.currentTime = PROTECTION_TIME
    backgroundVideo.pause()
  })
}
