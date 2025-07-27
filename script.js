// Carousel logic with autoplay, pause on hover, and keyboard navigation
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let current = 0;
let interval = null;

function showSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
    dots[i].classList.toggle('active', i === idx);
  });
  current = idx;
}

function nextSlide() {
  showSlide((current + 1) % slides.length);
}

function prevSlide() {
  showSlide((current - 1 + slides.length) % slides.length);
}

function startAutoplay() {
  interval = setInterval(nextSlide, 4000);
}

function stopAutoplay() {
  clearInterval(interval);
}

// Remove or guard any .onclick assignments for possibly missing elements
if (prevBtn) prevBtn.onclick = prevSlide;
if (nextBtn) nextBtn.onclick = nextSlide;
dots.forEach((dot, i) => {
  if (dot) dot.onclick = () => showSlide(i);
});

document.getElementById('carousel').addEventListener('mouseenter', stopAutoplay);
document.getElementById('carousel').addEventListener('mouseleave', startAutoplay);

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

startAutoplay();

// Scroll indicator fade out on scroll
const scrollIndicator = document.querySelector('.scroll-indicator');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    scrollIndicator.style.opacity = '0';
    scrollIndicator.style.pointerEvents = 'none';
  } else {
    scrollIndicator.style.opacity = '1';
    scrollIndicator.style.pointerEvents = 'auto';
  }
});

// Smooth scroll to next section on indicator click
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

console.log('Script loaded!'); 