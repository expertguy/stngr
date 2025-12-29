import "./styles/base.css"
import "./styles/header.css"
import "./styles/video.css"
import "./styles/hero.css"
import "./styles/buttons.css"
import "./styles/hold-info.css"
import "./styles/hotspots.css"
import "./styles/debug.css"

import { Header } from "./components/Header"
import { VideoScroll } from "./components/VideoScroll"
import { WhyStngr } from "./components/WhyStngr"
import { Process } from "./components/Process"
import { Features } from "./components/Features"
import { ThoughtfulProtection } from "./components/ThoughtfulProtection"
import { Newsletter } from "./components/Newsletter"
import { Footer } from "./components/Footer"

import { initScrollVideo } from "./js/scrollVideo"
import { initHeaderScroll } from "./js/headerScroll"

const app = document.getElementById("app")

app.innerHTML = `
  ${Header()}
  ${VideoScroll()}
  ${WhyStngr()}
  ${Process()}
  ${Features()}
  ${ThoughtfulProtection()}
  ${Newsletter()}
  ${Footer()}
`

initHeaderScroll()
initScrollVideo()
