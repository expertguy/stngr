export function initCookieConsent() {
  const COOKIE_CONSENT_KEY = 'cookie_consent'
  const cookieConsent = document.getElementById('cookieConsent')
  const acceptBtn = document.getElementById('acceptCookies')
  const declineBtn = document.getElementById('declineCookies')

  const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY)

  if (hasConsent) {
    cookieConsent.classList.add('hidden')
  }

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
    cookieConsent.classList.add('hidden')
  })

  declineBtn.addEventListener('click', () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined')
    cookieConsent.classList.add('hidden')
  })
}
