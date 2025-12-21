import "./style.css"

import { Header } from "./components/Header"
import { VideoScroll } from "./components/VideoScroll"

import { initScrollVideo } from "./js/scrollVideo"
import { initHeaderScroll } from "./js/headerScroll"

const app = document.getElementById("app")

app.innerHTML = `
  ${Header()}
  ${VideoScroll()}
`

initHeaderScroll()
initScrollVideo()
