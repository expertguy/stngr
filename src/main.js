import "./styles/base.css"
import "./styles/header.css"
import "./styles/video.css"
import "./styles/hero.css"
import "./styles/buttons.css"
import "./styles/hold-info.css"
import "./styles/hotspots.css"
import "./styles/blur-sections.css"
import "./styles/features.css"
import "./styles/newsletter.css"
import "./styles/footer.css"
import "./styles/cookie-consent.css"
import "./styles/debug.css"

import { Header } from "./components/Header"
import { VideoScroll } from "./components/VideoScroll"
import { Newsletter } from "./components/Newsletter"
import { Footer } from "./components/Footer"
import { CookieConsent } from "./components/CookieConsent"

import { initScrollVideo } from "./js/scrollVideo"
import { initHeaderScroll } from "./js/headerScroll"
import { initSmoothScroll } from "./js/smoothScroll"
import { initCookieConsent } from "./js/cookieConsent"
import { initNewsletter } from "./js/newsletter"
import { initMobileMenu } from "./js/mobileMenu"

const app = document.getElementById("app")

app.innerHTML = `
  ${Header()}
  ${VideoScroll()}
  ${Newsletter()}
  ${Footer()}
  ${CookieConsent()}
`

initHeaderScroll()
initScrollVideo()
initSmoothScroll()
initCookieConsent()
initNewsletter()
initMobileMenu()
