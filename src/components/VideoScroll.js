import { HeroOverlay } from './HeroOverlay'
import { HoldInfo } from './HoldInfo'
import { Hotspots } from './Hotspots'
import { DebugFrame } from './DebugFrame'

export function VideoScroll() {
  return `
    <main class="scroll-container">
      <section class="video-section">
        <video
          id="scrollVideo"
          muted
          playsinline
          preload="auto"
        ></video>

        ${HeroOverlay()}
        ${DebugFrame()}
        ${HoldInfo()}
        ${Hotspots()}
      </section>

      <section class="content">
        <h2>Built for Real Life</h2>
        <p>Designed to disappear until you need it.</p>
      </section>
    </main>
  `
}
