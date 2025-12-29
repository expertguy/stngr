import logo from "../assets/logo.png"

export function Header() {
  return `
    <header class="site-header">
      <div class="header-logo">
        <img src="${logo}" alt="STNGR logo" />
      </div>

      <nav class="header-nav">
        <a href="#features" class="nav-link">Features</a>
        <span class="nav-separator"></span>
        <a href="#how-it-works" class="nav-link">How It Works</a>
        <span class="nav-separator"></span>
        <a href="#why-stngr" class="nav-link">Why STNGR</a>
        <span class="nav-separator"></span>
        <a href="#safety" class="nav-link">Safety</a>
      </nav>

      <div class="header-cta">
        <button class="btn-cta">Get Updates</button>
      </div>
    </header>
  `
}
