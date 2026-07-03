# HL Content — Rediseño del sitio web

Rediseño de [halloleuteproject.com](https://halloleuteproject.com/) — agencia de marca personal de Emilio Pego.

## El proyecto

El sitio actual corre sobre Shopify con el tema Dawn v12 sin personalizar. El objetivo es
reemplazarlo por una experiencia de **scrollytelling** fluida (smooth scrolling tipo "mantequilla"),
donde el scroll narra el proceso de producir la marca personal del visitante.

### Concepto: "El Encuadre"

| Escena | Qué pasa al scrollear |
|--------|----------------------|
| 1. La idea en bruto | Hero con retrato desenfocado, como material sin editar |
| 2. El encuadre | Un visor de cámara se dibuja y la imagen se enfoca (sección pinned) |
| 3. El guion se escribe | Los servicios aparecen como líneas de guion que se escriben solas |
| 4. El montaje | Timeline de edición horizontal ensambla los casos de éxito |
| 5. La comunidad florece | Reacciones y seguidores brotan alrededor del retrato nítido; CTA final |

### Stack técnico (propuesto)

- **Lenis** — smooth scrolling con inercia
- **GSAP ScrollTrigger** — animaciones amarradas al scroll (pinning, scrubbing)
- Mobile-first obligatorio
- Integración con Shopify (tema custom o headless — por decidir)

## Estructura

_En construcción — prototipo de Escenas 1 y 2 primero._
