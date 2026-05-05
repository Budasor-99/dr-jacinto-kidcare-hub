# Completar Rediseño "Underwater Pediatric"

En la iteración anterior solo se actualizaron Header, Hero, About, Services y Testimonials. Quedan pendientes varios componentes de la landing principal, toda la landing SEM y las páginas secundarias. Este plan cierra esos huecos sin tocar funcionalidad ni el panel `/admin`.

## 1. Landing principal (`/`) — secciones pendientes

Aplicar paleta teal oscura, glassmorphism, `font-display` en títulos, gradientes `bg-gradient-aqua` / `bg-gradient-deep-sea`, decoraciones `BlobBackground` + `MedicalCrosses`.

- **AppointmentForm.tsx** — fondo deep-sea, tarjeta del formulario en `glass-strong`, inputs con borde teal translúcido, botón con `bg-gradient-aqua`.
- **Gallery.tsx** — fondo oscuro, marcos de imagen con borde teal y `shadow-aqua`, hover con glow aqua.
- **FAQ.tsx** — items en `glass-card`, íconos `+/-` en accent teal, título `font-display` mayúsculas.
- **Contact.tsx** — fondo deep-sea, tarjetas de contacto en glass, íconos en accent.
- **Footer.tsx** — fondo `bg-background` (ya oscuro), reorganizar bordes y separadores con `border-primary/20`, links hover en accent teal.

## 2. Landing SEM (`/lp`) — pendiente completa

Actualmente usa el gradiente azul medical antiguo. Migrar a la nueva estética manteniendo la conversión alta y los CTAs de WhatsApp/Calendly intactos.

- **SEMHero.tsx** — reemplazar `bg-gradient-to-br from-primary via-primary/90 to-accent/80` por `bg-gradient-deep-sea` con `hero-sem.jpg` como background image al 60% opacity. Conservar avatar del doctor, badges de "+30 años" y "Verificado", título grande con `font-display`, CTAs WhatsApp verde + Llamar + Calendly tal cual.
- **TrustBadges.tsx** — fondo oscuro, badges en `glass-card` con íconos en accent teal.
- **SEMTestimonials.tsx** — tarjetas glass, estrellas en accent dorado/teal.
- **SEMContact.tsx** — fondo deep-sea, tarjetas glass.
- **FloatingCTA.tsx** — botón flotante con `bg-gradient-aqua` y `shadow-aqua` (mantener verde WhatsApp para reconocimiento).

## 3. Páginas secundarias

- **Auth.tsx** (`/auth`) — fondo `bg-gradient-deep-sea` con `BlobBackground`, card central en `glass-strong`, título `font-display`, inputs y botones tematizados.
- **PrivacyPolicy.tsx** — fondo deep-sea, contenido en contenedor `glass-card`, títulos en `font-display`, links en accent.
- **ThankYou.tsx** — fondo deep-sea con burbujas/partículas, ícono check con `bg-gradient-aqua`, tarjeta de confirmación en `glass-strong`, CTAs tematizados.
- **NotFound.tsx** — fondo deep-sea, "404" enorme en `font-display` con `text-gradient`, botón volver con gradient aqua.

## 4. Fuera de alcance (no se tocan)

- `/admin` y todos sus componentes (`src/components/admin/**`) — quedan intactos para no romper la operación clínica.
- Lógica, formularios, validaciones, integraciones (Calendly, Pixel, GA4, Supabase) — solo cambios visuales.
- Copys, rutas, navegación.

## 5. Detalles técnicos

- Solo se editarán clases Tailwind y wrappers visuales. Cero cambios en estado, hooks o handlers.
- Reutilizar tokens ya definidos en `index.css` y `tailwind.config.ts` (`bg-gradient-deep-sea`, `bg-gradient-aqua`, `glass-card`, `glass-strong`, `shadow-aqua`, `text-gradient`, `font-display`).
- Reutilizar componentes decorativos existentes: `BlobBackground` (variants `hero` / `section`) y `MedicalCrosses` (variants `scattered` / `minimal`).
- Mantener contraste WCAG AA: texto principal `text-foreground`, secundario `text-foreground/80`, terciario `text-muted-foreground`.
- No se generarán nuevas imágenes; se reutilizan las 4 ya creadas (`hero-underwater`, `hero-sem`, `about-illustration` que ya es la del Dr. Salazar, `cta-background`).

## 6. QA

Tras los cambios revisar en preview cada ruta: `/`, `/lp`, `/auth`, `/privacidad`, `/gracias`, `/404`. Verificar mobile (390px) y desktop, y confirmar que los CTAs de WhatsApp/Calendly siguen funcionando.

¿Apruebas para que lo implemente?
