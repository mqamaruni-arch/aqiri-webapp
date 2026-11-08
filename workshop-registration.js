(() => {
  const form = document.querySelector('#workshop-registration-form');
  if (!form) return;
  const button = form.querySelector('[type="submit"]');
  const status = document.querySelector('#registration-status');
  const phone = form.elements.phone;
  const showMessage = (message, state) => {
    status.hidden = false;
    status.dataset.state = state;
    status.setAttribute('role', state === 'error' ? 'alert' : 'status');
    status.textContent = message;
  };
  form.addEventListener('input', (event) => {
    if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
    event.target.removeAttribute('aria-invalid');
  });
  form.addEventListener('change', (event) => {
    if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
    event.target.removeAttribute('aria-invalid');
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (button.disabled) return;
    const normalizedPhone = phone.value.trim().replace(/[\s().-]/g, '');
    phone.setCustomValidity(/^\+[1-9]\d{6,14}$/.test(normalizedPhone) ? '' : 'Please include your country code, for example +92, followed by a phone number with 7–15 digits in total.');
    if (!form.reportValidity()) return;
    if (!form.elements.submission_id.value) {
      form.elements.submission_id.value = Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) => byte.toString(16).padStart(2, '0')).join('');
    }
    button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    showMessage('Saving your registration…', 'pending');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form), signal: controller.signal });
      let result;
      try { result = await response.json(); } catch (parseError) {
        if (parseError.name === 'AbortError') throw parseError;
        throw new Error('The registration service returned an unexpected response. We couldn’t confirm whether your details were saved. Please try again or contact events@aqiri.org.');
      }
      if (!response.ok || result.ok !== true) {
        for (const [name, message] of Object.entries(result.errors || {})) {
          const field = form.elements.namedItem(name);
          if (field && typeof field.setCustomValidity === 'function') {
            field.setCustomValidity(message);
            field.setAttribute('aria-invalid', 'true');
          }
        }
        throw new Error(result.message || 'The server couldn’t save your registration. Please try again or contact events@aqiri.org.');
      }
      if (typeof result.message !== 'string' || !result.message.trim()) throw new Error('We couldn’t confirm the server’s response. Please contact events@aqiri.org before registering again.');
      form.reset();
      showMessage(result.message, 'success');
      status.focus({ preventScroll: true });
      status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (error) {
      const message = error.name === 'AbortError' || error instanceof TypeError
        ? 'We couldn’t confirm whether your registration was saved because the connection was interrupted. Your details are still in the form. Please try again; the same registration won’t be saved twice.'
        : error.message;
      showMessage(message, 'error');
      status.focus({ preventScroll: true });
    } finally {
      clearTimeout(timeout);
      button.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });
})();
