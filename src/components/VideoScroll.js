import { Hero } from './Hero'
import { Safety } from './Safety'
import { Hotspots } from './Hotspots'
import { WhyStngr } from './WhyStngr'
import { Process } from './Process'
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

        ${Hero()}
        ${DebugFrame()}
        ${Safety()}
        ${Hotspots()}
        ${WhyStngr()}
        ${Process()}
      </section>
    </main>
  `
}
