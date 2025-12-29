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
        <div class="video-container">
          <video
            id="videoHero"
            data-section="hero"
            muted
            playsinline
            preload="auto"
          ></video>
          <video
            id="videoSafety"
            data-section="safety"
            muted
            playsinline
            preload="auto"
            class="is-hidden"
          ></video>
          <video
            id="videoHotspots"
            data-section="hotspots"
            muted
            playsinline
            preload="auto"
            class="is-hidden"
          ></video>
          <video
            id="videoWhy"
            data-section="why"
            muted
            playsinline
            preload="auto"
            class="is-hidden"
          ></video>
          <video
            id="videoHow"
            data-section="how"
            muted
            playsinline
            preload="auto"
            class="is-hidden"
          ></video>
          <video
            id="videoFeatures"
            data-section="features"
            muted
            playsinline
            preload="auto"
            class="is-hidden"
          ></video>
          <video
            id="videoProtection"
            data-section="protection"
            muted
            playsinline
            preload="auto"
            class="is-hidden"
          ></video>
        </div>

        ${Hero()}
        ${DebugFrame()}
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
