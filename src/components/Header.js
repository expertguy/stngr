import logo from "../assets/logo.png"

export function Header() {
  return `
    <header class="site-header">
      <a href="#top" class="header-logo" style="text-decoration: none; display: flex; align-items: center;">
        <img src="${logo}" alt="STNGR logo" />
      </a>

      <nav class="header-nav">
        <a href="#featuresOverlay" class="nav-link">Features</a>
        <span class="nav-separator"></span>
        <a href="#howItWorks" class="nav-link">How It Works</a>
        <span class="nav-separator"></span>
        <a href="#whyStngr" class="nav-link">Why STNGR</a>
        <span class="nav-separator"></span>
        <a href="#holdInfo" class="nav-link">Safety</a>
      </nav>

      <div class="header-cta">
        <a href="#newsletter" class="btn-cta" style="text-decoration: none; display: inline-block;">Get Updates</a>
      </div>
    </header>
  `
}
