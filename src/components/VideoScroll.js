import { Hero } from './Hero'
import { Safety } from './Safety'
import { Hotspots } from './Hotspots'
import { WhyStngr } from './WhyStngr'
import { HowItWorks } from './HowItWorks'
import { Features } from './Features'
import { Protection } from './Protection'
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
        ${Safety()}
        ${Hotspots()}
        ${WhyStngr()}
        ${HowItWorks()}
        ${Features()}
        ${Protection()}
      </section>
    </main>
  `
}
