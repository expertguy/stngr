export function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  const input = document.querySelector('.newsletter-input');
  const button = document.querySelector('.newsletter-button');

  if (!form || !input || !button) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = input.value.trim();

    if (!email || !email.includes('@')) {
      showMessage('Please enter a valid email address', 'error');
      return;
    }

    const originalButtonText = button.textContent;
    button.textContent = 'SUBSCRIBING...';
    button.disabled = true;

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/newsletter-signup`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage('Successfully subscribed! Check your email.', 'success');
        input.value = '';
      } else {
        if (response.status === 409) {
          showMessage('This email is already subscribed', 'error');
        } else {
          showMessage(data.error || 'Failed to subscribe. Please try again.', 'error');
        }
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      showMessage('Network error. Please try again.', 'error');
    } finally {
      button.textContent = originalButtonText;
      button.disabled = false;
    }
  });
}

function showMessage(message, type) {
  const existingMessage = document.querySelector('.newsletter-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  const messageDiv = document.createElement('div');
  messageDiv.className = `newsletter-message newsletter-message-${type}`;
  messageDiv.textContent = message;

  const form = document.querySelector('.newsletter-form');
  form.parentNode.insertBefore(messageDiv, form.nextSibling);

  setTimeout(() => {
    messageDiv.remove();
  }, 5000);
}
