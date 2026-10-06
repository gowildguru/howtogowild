/* Temporary browser-only beta gate. This is a presentation gate, not server authentication. */
(() => {
  'use strict';
  const ACCESS_CODE = '2439318';
  const SESSION_KEY = 'howtogowild-beta-access-v1';
  const root = document.documentElement;
  function accepted() { try { return sessionStorage.getItem(SESSION_KEY) === ACCESS_CODE; } catch { return false; } }
  if (accepted()) { root.classList.remove('beta-locked'); return; }
  root.classList.add('beta-locked');
  const style = document.createElement('style');
  style.textContent = `
    html.beta-locked,html.beta-locked body{overflow:hidden!important;min-height:100%;background:#263e31}
    html.beta-locked body > :not(#betaGate){display:none!important}
    #betaGate{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;box-sizing:border-box;padding:24px;overflow:auto;background:radial-gradient(ellipse at 20% 15%,rgba(159,191,162,.40),transparent 55%),radial-gradient(ellipse at 85% 90%,rgba(135,163,142,.28),transparent 50%),linear-gradient(135deg,#304c3b,#1c3025);font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#fff}
    .beta-card{box-sizing:border-box;width:min(100%,420px);padding:36px 30px;border:1px solid rgba(255,255,255,.25);border-radius:24px;background:rgba(255,255,255,.10);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);box-shadow:0 24px 70px rgba(0,0,0,.18),inset 0 1px rgba(255,255,255,.12)}
    .beta-brand{margin:0 0 30px;font-size:12px;font-weight:800;letter-spacing:1.5px;color:rgba(255,255,255,.86)}
    .beta-kicker{display:inline-block;margin:0 0 14px;padding:6px 10px;border:1px solid rgba(255,255,255,.22);border-radius:999px;font-size:11px;letter-spacing:.7px}
    .beta-card h1{margin:0 0 12px;font-size:32px;line-height:1.15;letter-spacing:-.6px;color:#fff}
    .beta-description{margin:0 0 26px;font-size:14px;line-height:1.7;color:rgba(255,255,255,.84)}
    .beta-card label{display:block;margin-bottom:9px;font-size:13px;font-weight:600}
    .beta-card input{display:block;box-sizing:border-box;width:100%;min-height:48px;margin:0;padding:12px 14px;border:1px solid rgba(255,255,255,.32);border-radius:12px;background:rgba(15,30,20,.25);color:#fff;font:inherit;font-size:16px;letter-spacing:2px}
    .beta-card input:focus-visible,.beta-card button:focus-visible{outline:3px solid #cce3cd;outline-offset:3px}
    .beta-card button{display:block;width:100%;min-height:48px;margin:16px 0 0;border:0;border-radius:12px;background:#e4eddf;color:#294332;font:inherit;font-size:14px;font-weight:750;cursor:pointer}
    .beta-card button:hover{background:#f4f8f0}
    .beta-error{margin:10px 0 0;font-size:13px;line-height:1.5;color:#ffe0c0}
    .beta-error[hidden]{display:none}
    .beta-note{margin:22px 0 0;font-size:11px;line-height:1.6;color:rgba(255,255,255,.70)}
    @media(max-width:420px){#betaGate{padding:18px}.beta-card{padding:28px 22px}.beta-card h1{font-size:28px}}
  `;
  document.head.append(style);
  function showGate() {
    if (document.getElementById('betaGate')) return;
    const gate = document.createElement('section');
    gate.id = 'betaGate'; gate.setAttribute('aria-label','Private beta access');
    gate.innerHTML = `<div class="beta-card"><p class="beta-brand">HOWTOGOWILD!</p><p class="beta-kicker">PRIVATE BETA</p><h1>You’re on the list?</h1><p class="beta-description">We’re putting the finishing touches on the guide. Enter your tester access code to take a look around.</p><form id="betaAccessForm"><label for="betaAccessCode">Access code</label><input id="betaAccessCode" type="password" inputmode="numeric" autocomplete="off" required aria-describedby="betaAccessError"><p id="betaAccessError" class="beta-error" role="alert" hidden></p><button type="submit">Enter the beta</button></form><p class="beta-note">Access stays unlocked in this tab while you explore.</p></div>`;
    document.body.prepend(gate);
    const form = document.getElementById('betaAccessForm');
    const field = document.getElementById('betaAccessCode');
    const error = document.getElementById('betaAccessError');
    form.addEventListener('submit',event => {
      event.preventDefault();
      if (field.value.trim() !== ACCESS_CODE) {
        error.textContent = 'That code doesn’t match. Please try again.';
        error.hidden = false; field.setAttribute('aria-invalid','true'); field.focus(); return;
      }
      try { sessionStorage.setItem(SESSION_KEY,ACCESS_CODE); } catch { /* Current page still unlocks when storage is unavailable. */ }
      root.classList.remove('beta-locked'); gate.remove(); style.remove();
      document.dispatchEvent(new Event('beta-access-granted'));
    });
    field.addEventListener('input',() => { error.hidden = true; field.removeAttribute('aria-invalid'); });
    field.focus();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',showGate,{once:true});
  else showGate();
})();
