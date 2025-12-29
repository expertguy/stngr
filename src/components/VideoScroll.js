import { Hero } from './Hero'
import { Safety } from './Safety'
import { SafetyRight } from './SafetyRight'
import { Hotspots } from './Hotspots'
import { WhyStngr } from './WhyStngr'
import { Process } from './Process'
import { Features } from './Features'
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
        ${SafetyRight()}
        ${Hotspots()}
        ${WhyStngr()}
        ${Process()}
        ${Features()}
      </section>
    </main>
  `
}
