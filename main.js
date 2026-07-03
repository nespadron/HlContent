// HL Content — "El Encuadre" · prototipo escenas 1 y 2
// Lenis (scroll mantequilla) + GSAP ScrollTrigger (animación amarrada al scroll)

gsap.registerPlugin(ScrollTrigger);

// --- Smooth scroll con Lenis, sincronizado con el ticker de GSAP ---
// Si el CDN de Lenis fallara, el sitio sigue funcionando con scroll nativo.
const bar = document.getElementById('progressBar');
let lenis = null;

if (typeof Lenis === 'function') {
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  lenis.on('scroll', ({ progress }) => {
    bar.style.width = (progress * 100).toFixed(2) + '%';
  });
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  window.lenis = lenis;
} else {
  console.warn('Lenis no disponible: usando scroll nativo.');
  const updateBar = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0).toFixed(2) + '%';
  };
  window.addEventListener('scroll', updateBar, { passive: true });
}

// --- La transformación: en bruto -> enfocado ---
// La etapa se queda fija (pin) mientras el scroll "revela" (scrub) toda la secuencia.
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#stage',
    start: 'top top',
    end: '+=220%',      // duración del pin: 2.2 pantallas de scroll
    scrub: 1,           // amarra el avance al scroll (con un poco de inercia)
    pin: true,
    anticipatePin: 1,
  },
});

// 1) Se va el primer titular y aparece el visor
tl.to('#line1', { opacity: 0, y: -40, duration: 0.6 }, 0.0)
  .to('#scrollHint', { opacity: 0, duration: 0.3 }, 0.0)
  .to('#viewfinder', { opacity: 1, duration: 0.4 }, 0.15);

// 2) Los corner-brackets se dibujan desde las esquinas
tl.to('.vf-corner', {
  opacity: 1,
  duration: 0.5,
  stagger: 0.06,
  ease: 'power2.out',
}, 0.2);

// 3) La retícula de tercios se traza
tl.to('.vf-grid span', {
  scaleX: 1,
  scaleY: 1,
  duration: 0.5,
  stagger: 0.05,
}, 0.3);

// 4) Aparece el HUD (REC, etiquetas)
tl.to('.vf-hud', { opacity: 1, duration: 0.4, stagger: 0.08 }, 0.35);

// 5) EL MOMENTO: el retrato se enfoca y toma color
tl.to('#portrait', {
  filter: 'blur(0px) grayscale(0) brightness(1) contrast(1)',
  scale: 1,
  duration: 1.0,
  ease: 'power2.inOut',
}, 0.4);

// 6) La retícula central hace "lock" de enfoque
tl.to('.vf-reticle', {
  opacity: 1,
  scale: 1,
  duration: 0.5,
  ease: 'back.out(2)',
}, 0.8);

// 7) Cambia la etiqueta a ENFOCADO y entra el segundo titular
tl.call(() => { document.getElementById('focusLabel').textContent = 'ENFOCADO'; }, null, 0.9)
  .to('.vf-reticle', { borderColor: 'rgba(94,202,165,1)', duration: 0.2 }, 0.9)
  .to('#line2', { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.9);

// --- ESCENA 3 · El guion se escribe ---
// La página se fija y cada paso se "escribe" (wipe izq->der) al ritmo del scroll.
const tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: '#script',
    start: 'top top',
    end: '+=160%',
    scrub: 1,
    pin: '#scriptPage',
    anticipatePin: 1,
  },
});

// La intro y el encabezado entran suave
tl3.from('.script__slug', { opacity: 0, y: 10, duration: 0.3 }, 0.0)
   .from('.script__eyebrow', { opacity: 0, y: 10, duration: 0.3 }, 0.08)
   .from('.script__intro', { opacity: 0, y: 14, duration: 0.5 }, 0.14);

// Cada paso se escribe: aparece el recorte de izquierda a derecha
tl3.to('.step', {
  opacity: 1,
  y: 0,
  clipPath: 'inset(0 0% 0 0)',
  duration: 0.6,
  stagger: 0.5,
  ease: 'power2.out',
}, 0.4);

// Refresca medidas cuando todo cargó (fuentes, imagen)
window.addEventListener('load', () => ScrollTrigger.refresh());
