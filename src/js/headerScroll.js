export function initHeaderScroll() {
  const header = document.querySelector(".site-header")
  if (!header) return

  let lastScrollY = window.scrollY
  let ticking = false

  function onScroll() {
    const currentScrollY = window.scrollY

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      // scrolling DOWN
      header.classList.add("is-hidden")
    } else {
      // scrolling UP
      header.classList.remove("is-hidden")
    }

    lastScrollY = currentScrollY
    ticking = false
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll)
      ticking = true
    }
  })
}
