/* ══════════════════════════════════════════════
   ONBOARDING — first-run welcome carousel, shown once before the
   sign-up wall so people know why to make an account before we ask.
══════════════════════════════════════════════ */

const ONBOARDING_SEEN_KEY = 'skinlog-onboarding-seen';
const ONBOARDING_SLIDE_COUNT = 3;
let _onboardingIndex = 0;

function shouldShowOnboarding() {
  return localStorage.getItem(ONBOARDING_SEEN_KEY) !== '1';
}

function showOnboardingScreen() {
  const screen = document.getElementById('onboarding-screen');
  if (!screen) { showAuthScreen(); return; }
  _onboardingIndex = 0;
  const slides = document.getElementById('onboarding-slides');
  if (slides) slides.style.transform = 'translateX(0)';
  updateOnboardingDots();
  updateOnboardingButton();
  screen.style.display = 'flex';
  screen.style.animation = 'lbFadeIn 0.3s ease both';
}

function updateOnboardingDots() {
  document.querySelectorAll('.onboarding-dot').forEach((dot) => {
    const isActive = Number(dot.dataset.dot) === _onboardingIndex;
    dot.style.background = isActive ? '#b5706a' : '#e0d4d0';
    dot.style.width = isActive ? '20px' : '8px';
    dot.style.borderRadius = '99px';
  });
}

function updateOnboardingButton() {
  const btn = document.getElementById('onboarding-next-btn');
  if (btn) btn.textContent = _onboardingIndex === ONBOARDING_SLIDE_COUNT - 1 ? 'Get Started ✦' : 'Next';
}

function advanceOnboarding() {
  if (_onboardingIndex >= ONBOARDING_SLIDE_COUNT - 1) {
    finishOnboarding();
    return;
  }
  _onboardingIndex++;
  const slides = document.getElementById('onboarding-slides');
  if (slides) slides.style.transform = `translateX(-${_onboardingIndex * 100}vw)`;
  updateOnboardingDots();
  updateOnboardingButton();
}

function finishOnboarding() {
  localStorage.setItem(ONBOARDING_SEEN_KEY, '1');
  const screen = document.getElementById('onboarding-screen');
  if (screen) screen.style.display = 'none';
  showAuthScreen();
}
