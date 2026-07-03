// HL Content — "El Encuadre" · scrollytelling completo
// Lenis (scroll mantequilla) + GSAP ScrollTrigger (animaciones amarradas al scroll)

gsap.registerPlugin(ScrollTrigger);

// --- Smooth scroll con Lenis; si el CDN falla, cae a scroll nativo ---
const bar = document.getElementById('progressBar');
let lenis = null;

if (typeof Lenis === 'function') {
  lenis = new Lenis({
    duration: 1.5,                 // glide más largo = movimiento más suave
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.8,          // cada giro de rueda avanza menos (menos "brincos")
    touchMultiplier: 1.4,
    syncTouch: true,               // mismo suavizado en móvil
  });
  lenis.on('scroll', ScrollTrigger.update);
  lenis.on('scroll', ({ progress }) => { bar.style.width = (progress * 100).toFixed(2) + '%'; });
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

/* ===== ESCENA 1 + 2 · El Encuadre ===== */
const tl = gsap.timeline({
  scrollTrigger: { trigger: '#top', start: 'top top', end: '+=260%', scrub: 1.2, pin: true, anticipatePin: 1 },
});
tl.to('#line1', { opacity: 0, y: -40, duration: 0.6 }, 0.0)
  .to('#scrollHint', { opacity: 0, duration: 0.3 }, 0.0)
  .to('#viewfinder', { opacity: 1, duration: 0.4 }, 0.15)
  .to('.vf-corner', { opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' }, 0.2)
  .to('.vf-grid span', { scaleX: 1, scaleY: 1, duration: 0.5, stagger: 0.05 }, 0.3)
  .to('.vf-hud', { opacity: 1, duration: 0.4, stagger: 0.08 }, 0.35)
  .to('#heroVisual', {
    filter: 'blur(0px) grayscale(0) brightness(1) contrast(1)', scale: 1,
    duration: 1.0, ease: 'power2.inOut',
  }, 0.4)
  .to('.vf-reticle', { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }, 0.8)
  .call(() => { document.getElementById('focusLabel').textContent = 'ENFOCADO'; }, null, 0.9)
  .to('.vf-reticle', { borderColor: 'rgba(94,202,165,1)', duration: 0.2 }, 0.9)
  .to('#line2', { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.9);

/* ===== ESCENA 3 · El guion se escribe ===== */
const tl3 = gsap.timeline({
  scrollTrigger: { trigger: '#proceso', start: 'top top', end: '+=200%', scrub: 1.2, pin: true, anticipatePin: 1 },
});
tl3.from('.script__slug', { opacity: 0, y: 10, duration: 0.3 }, 0.0)
   .from('.script__eyebrow', { opacity: 0, y: 10, duration: 0.3 }, 0.08)
   .from('.script__intro', { opacity: 0, y: 14, duration: 0.5 }, 0.14)
   .to('.step', { opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.6, stagger: 0.5, ease: 'power2.out' }, 0.4);

/* ===== ESCENA 4 · ¿Quiénes somos? (revelado palabra por palabra) ===== */
gsap.to('.about__text .w', {
  opacity: 1,
  stagger: 0.5,
  ease: 'none',
  scrollTrigger: {
    trigger: '#nosotros', start: 'top top', end: '+=140%',
    scrub: 1.2, pin: true, anticipatePin: 1,
  },
});

/* ===== ESCENA 5 · El montaje (scroll horizontal de clientes) ===== */
const track = document.getElementById('clientsTrack');
if (track) {
  const distance = () => track.scrollWidth - window.innerWidth + 90;
  gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: '#clientes', start: 'top top', end: () => '+=' + distance() * 1.3,
      scrub: 1.2, pin: '.clients__pin', anticipatePin: 1, invalidateOnRefresh: true,
    },
  });
}

/* ===== ESCENA 6 · Impacto (pineada: cuenta, se tacha y da paso al mensaje) ===== */
const counter = { v: 0 };
const numEl = document.getElementById('impactNum');

gsap.timeline({
  scrollTrigger: { trigger: '#impacto', start: 'top top', end: '+=200%', scrub: 1.2, pin: true, anticipatePin: 1 },
})
  // 1) El número de "seguidores" sube (métrica de vanidad)
  .to(counter, {
    v: 128400, ease: 'power1.out',
    onUpdate: () => { numEl.textContent = Math.round(counter.v).toLocaleString('es-MX'); },
  }, 0)
  // 2) Se tacha y se apaga el número
  .to('.impact__strike', { scaleX: 1, duration: 0.4, ease: 'power2.inOut' }, 0.55)
  .to('#impactNum', { color: 'rgba(138,134,128,0.45)', duration: 0.4 }, 0.55)
  // 3) Aparece el mensaje real
  .fromTo('#impactPunch', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, 0.7)
  .fromTo('.impact__text', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.95);

/* ===== ESCENA 7 · CTA (pineada: mismo ritmo que el resto) ===== */
gsap.timeline({
  scrollTrigger: { trigger: '#contacto', start: 'top top', end: '+=130%', scrub: 1.2, pin: true, anticipatePin: 1 },
})
  .from('.cta__inner > *', { opacity: 0, y: 44, stagger: 0.35, ease: 'power2.out' });

/* ===== ESCENA 8 · Lead magnet (pineada) ===== */
gsap.timeline({
  scrollTrigger: { trigger: '#recurso', start: 'top top', end: '+=130%', scrub: 1.2, pin: true, anticipatePin: 1 },
})
  .from('#leadCard', { opacity: 0, y: 60, scale: 0.96, ease: 'power2.out', duration: 0.8 }, 0)
  .from('.lead__num span', { scale: 0.4, opacity: 0, ease: 'back.out(1.7)', duration: 0.8 }, 0.25);

/* ===== ESCENA 9 · Newsletter + footer (revelado atado al scroll, sin pin) ===== */
gsap.from('#footerNews > *', {
  opacity: 0, y: 30, stagger: 0.4, ease: 'power2.out',
  scrollTrigger: { trigger: '#footer', start: 'top 85%', end: 'top 40%', scrub: 1.2 },
});

// Refresca medidas cuando todo cargó (fuentes)
window.addEventListener('load', () => ScrollTrigger.refresh());
