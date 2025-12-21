import logo from "../assets/logo.png"

export function Header() {
  return `
    <header class="site-header">
      <div class="logo">
        <img src="${logo}" alt="STNGR logo" />
      </div>

      <nav>
        <a href="#">Features</a>
        <a href="#">Why STNGR</a>
        <button class="btn-outline">Get Updates</button>
      </nav>
    </header>
  `
}
