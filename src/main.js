import "./styles/base.css"
import "./styles/header.css"
import "./styles/video.css"
import "./styles/hero.css"
import "./styles/buttons.css"
import "./styles/hold-info.css"
import "./styles/hotspots.css"
import "./styles/blur-sections.css"
import "./styles/features.css"
import "./styles/newsletter-footer.css"
import "./styles/debug.css"

import { Header } from "./components/Header"
import { VideoScroll } from "./components/VideoScroll"
import { NewsletterFooter } from "./components/NewsletterFooter"

import { initScrollVideo } from "./js/scrollVideo"
import { initHeaderScroll } from "./js/headerScroll"
import { initNewsletterFooter } from "./js/initNewsletterFooter"

const app = document.getElementById("app")

app.innerHTML = `
  ${Header()}
  ${VideoScroll()}
  ${NewsletterFooter()}
`

initHeaderScroll()
initScrollVideo()
initNewsletterFooter()
