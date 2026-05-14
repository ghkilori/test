const track = document.querySelector('.participants__cards');
const slides = Array.from(document.querySelectorAll('.member-card'));
const prevButton = document.querySelector('.participants__controls button[aria-label="Назад"]');
const nextButton = document.querySelector('.participants__controls button[aria-label="Вперёд"]');
let currentIndex = 0;

function getVisibleCount() {
  if (!track || slides.length === 0) return 1;
  const card = slides[0];
  const cardWidth = card.offsetWidth + parseInt(getComputedStyle(track).columnGap || 0, 10);
  return Math.max(1, Math.floor(track.clientWidth / cardWidth));
}

function getMaxIndex() {
  return Math.max(0, slides.length - getVisibleCount());
}

const counter = document.querySelector('.participants__counter');

function updateButtons() {
  if (!prevButton || !nextButton) return;
  prevButton.disabled = currentIndex <= 0;
  nextButton.disabled = currentIndex >= getMaxIndex();
}

function updateCounter() {
  if (!counter) return;
  const visibleCount = getVisibleCount();
  const endIndex = Math.min(slides.length, currentIndex + visibleCount);
  counter.textContent = `${endIndex} / ${slides.length}`;
}

function scrollToIndex(index) {
  if (!track || slides.length === 0) return;
  const maxIndex = getMaxIndex();
  currentIndex = Math.max(0, Math.min(index, maxIndex));
  const slide = slides[currentIndex];
  if (!slide) return;
  track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
  updateButtons();
  updateCounter();
}

function initSlider() {
  if (!track || slides.length === 0 || !prevButton || !nextButton) return;
  track.style.scrollBehavior = 'smooth';
  prevButton.addEventListener('click', () => scrollToIndex(currentIndex - 1));
  nextButton.addEventListener('click', () => scrollToIndex(currentIndex + 1));
  window.addEventListener('resize', () => scrollToIndex(currentIndex));
  updateButtons();
  updateCounter();
}

document.addEventListener('DOMContentLoaded', initSlider);
