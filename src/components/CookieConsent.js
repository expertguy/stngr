export function CookieConsent() {
  return `
    <div id="cookieConsent" class="cookie-consent">
      <div class="cookie-content">
        <p class="cookie-text">
          We use cookies to enhance your browsing experience and analyze our traffic.
          By clicking "Accept", you consent to our use of cookies.
        </p>
        <div class="cookie-actions">
          <button id="acceptCookies" class="cookie-btn cookie-btn-accept">Accept</button>
          <button id="declineCookies" class="cookie-btn cookie-btn-decline">Decline</button>
        </div>
      </div>
    </div>
  `
}
