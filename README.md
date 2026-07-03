# HL Content — Rediseño del sitio web

Rediseño de [halloleuteproject.com](https://halloleuteproject.com/) — agencia de marca
personal de Emilio Pego. Sitio de una sola página con **scrollytelling**: cada sección se
anima al deslizar (smooth scroll tipo "mantequilla").

## Cómo verlo en local

```bash
npx -y serve -l 4321 .
```
Abre `http://localhost:4321` y desliza despacio.

## Stack

- **Lenis** — smooth scroll con inercia
- **GSAP + ScrollTrigger** — animaciones amarradas al scroll (pin + scrub)
- HTML/CSS/JS puro, sin build. Librerías por CDN.
- Mobile-first · respeta `prefers-reduced-motion`

## Las 9 escenas (concepto "El Encuadre")

| # | Sección | Animación |
|---|---------|-----------|
| 1-2 | El Encuadre (hero) | un "reel" en bruto se enfoca dentro de un visor de cámara |
| 3 | ¿Qué hacemos? | los 6 pasos del proceso se escriben como un guion |
| 4 | ¿Quiénes somos? | el texto se revela palabra por palabra |
| 5 | ¿Clientes? | las profesiones cruzan como clips en un montaje horizontal |
| 6 | ¿Seguidores? | un contador de vanidad sube, se tacha y da paso al "impacto" |
| 7 | Costo / CTA | agenda una videollamada sin compromiso |
| 8 | Recurso gratis | "Mis 5 mejores consejos para crear un video viral" |
| 9 | Newsletter + footer | suscripción y redes sociales reales |

## Contenido

Todo el texto proviene del sitio real, verificado con 2 evaluaciones (ver
[CONTENIDO.md](CONTENIDO.md)). La foto de persona del sitio original se reemplazó por una
visual abstracta generada con CSS (sin fotos de terceros).

## ⚠️ Pendientes de integración (para conectar antes de publicar)

Los enlaces marcados con `data-todo` en el HTML necesitan datos reales del cliente:
- **Botón "Agendar ahora"** → URL de agenda (Calendly / WhatsApp / etc.)
- **Botón "Lo quiero gratis"** → producto de Shopify del lead magnet
- **Formulario de newsletter** → conectar a Shopify / Mailchimp
- **Titular del hero** ("Tu marca personal ya existe. Falta enfocarla.") → creación propia,
  pendiente de aprobación de Nestor.
- Decidir despliegue final: tema custom de Shopify vs. sitio headless enlazado al checkout.
