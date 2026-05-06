# Plan de optimización SEO y GEO

## 1. Diagnóstico actual

Lo que **ya tenemos**:
- `index.html` con `<title>`, `meta description`, Open Graph, Twitter Card, favicon.
- `robots.txt` permitiendo a buscadores principales.
- Google Analytics 4 + Meta Pixel + tracking de `page_view` por ruta.
- `/lp` correctamente marcado como `noindex, nofollow` (campaña SEM).
- HTML semántico parcial (`<h1>`, `<h2>`, `<section id="...">`).

Lo que **falta** (gaps críticos):
- **`<html lang="en">`** — debe ser `es-EC`.
- **Cero datos estructurados (Schema.org / JSON-LD)**. Sin esto Google no entiende que es un consultorio médico, ni horarios, ni reseñas, ni FAQs. Es lo de mayor impacto.
- Sin **canonical tags** ni meta dinámicos por ruta (`/`, `/privacidad`, `/gracias` comparten todos el mismo título).
- Sin **sitemap.xml**.
- Algunas imágenes con `alt=""` vacío que sí aportan contexto.
- Sin contenido orientado a **GEO** (consultas conversacionales que ChatGPT/Gemini/Perplexity citan).
- Sin optimización de **Core Web Vitals** verificada (imágenes `.png` pesadas, sin `loading="lazy"` en galería).
- Sin **breadcrumbs** ni señales locales fuertes (NAP estructurado para Google Business Profile).

## 2. Objetivos

1. Posicionar **"pediatra Carcelén Quito"**, **"pediatra Quito norte"**, **"vacunación pediátrica Quito"** y similares en top 3 de Google local.
2. Aparecer en el **Local Pack** (mapa de Google) y en **Knowledge Panel**.
3. Ser **citado por motores generativos** (ChatGPT, Gemini, Perplexity, Google AI Overviews) cuando padres pregunten "¿qué pediatra recomiendan en Carcelén?".

## 3. Plan de acción — SEO técnico

### 3.1 Fundamentos HTML (rápido, alto impacto)
- `index.html`: `<html lang="es-EC">`.
- Añadir `<link rel="canonical">` dinámico por ruta.
- Añadir `theme-color`, `geo.region` (EC-P), `geo.placename` (Quito), `geo.position`.
- Corregir `alt` descriptivos en todas las imágenes informativas.

### 3.2 Meta tags dinámicos por ruta
Instalar **react-helmet-async** y crear un `<SEO>` reutilizable con título, descripción, canonical y OG por página:
- `/` → "Pediatra en Carcelén, Quito | Dr. Jacinto Salazar"
- `/privacidad` → noindex
- `/gracias` → noindex (ya lo está)
- `/lp` → noindex (ya lo está)

### 3.3 Datos estructurados (JSON-LD) — el mayor diferenciador
Añadir en `<head>` de `/`:

1. **`Physician` + `MedicalBusiness`** combinado:
   - Nombre, teléfono, email, dirección postal completa, geo coordinates, horarios (`openingHoursSpecification`), especialidades médicas (`medicalSpecialty: "Pediatrics"`), idioma de atención, área servida (Quito).
2. **`Person`** para el Dr. Salazar (alma mater Universidad Central, años de experiencia, `jobTitle`).
3. **`FAQPage`** generado desde el componente `FAQ.tsx` actual (gana rich snippets).
4. **`BreadcrumbList`** mínimo.
5. **`AggregateRating`** si tenemos reseñas reales (Google Reviews); si no, omitirlo (políticas de Google).
6. **`WebSite`** con `SearchAction` (sitelinks search box).

### 3.4 Sitemap + robots
- Generar `public/sitemap.xml` estático con `/` y `/privacidad` (excluir `/lp`, `/gracias`, `/admin`, `/auth`).
- Actualizar `public/robots.txt` añadiendo `Sitemap: https://www.drjacintosalazarvargas.com/sitemap.xml` y `Disallow: /admin`, `/auth`, `/lp`, `/gracias`.

### 3.5 Performance (Core Web Vitals)
- Convertir `.png` grandes (`hero-underwater`, `about-illustration`) a `.webp` y añadir dimensiones `width`/`height` para evitar CLS.
- `loading="lazy"` y `decoding="async"` en imágenes de Galería/Testimonios.
- `<link rel="preconnect">` para Calendly, Facebook, Google Tag Manager.

## 4. Plan de acción — GEO (Generative Engine Optimization)

Los LLMs citan contenido **claro, factual, estructurado y citable**. Acciones:

### 4.1 Contenido tipo "respuesta directa"
Añadir secciones cortas en formato pregunta-respuesta dentro de `About` y `FAQ` que respondan literalmente a queries conversacionales:
- "¿Quién es el mejor pediatra en Carcelén Quito?"
- "¿Dónde queda el consultorio del Dr. Jacinto Salazar?"
- "¿Cuánto cuesta una consulta pediátrica en Quito norte?"
- "¿Qué vacunas aplica un pediatra en Ecuador?"

### 4.2 Página/sección "About" enriquecida
Datos verificables con citas:
- Año de graduación, institución, cédula profesional, registro MSP.
- Membresías a sociedades médicas (Sociedad Ecuatoriana de Pediatría).
- Esto da a los LLM "anchors" factuales que pueden citar con confianza.

### 4.3 Consistencia NAP (Name, Address, Phone)
El NAP debe ser **idéntico** en: web, Google Business Profile, Facebook, Instagram, directorios médicos (DoctorAnytime, Doctoralia Ecuador). Crear un documento de referencia.

### 4.4 Señales E-E-A-T (Experience, Expertise, Authoritativeness, Trust)
- Bio del doctor con credenciales visibles y schema `Person`.
- Política de privacidad ya existe ✓.
- Añadir página `/aviso-medico` con disclaimer (señal de profesionalismo médico que LLMs valoran).

### 4.5 llms.txt (opcional, emergente)
Crear `public/llms.txt` resumiendo el sitio para crawlers de IA (estándar propuesto por Anthropic/otros, ya adoptado por algunos).

## 5. Plan de acción — Off-site (lo manejas tú, no requiere código)

1. **Google Business Profile** completo y verificado: fotos, horarios, servicios, posts semanales, responder reseñas.
2. Pedir reseñas a pacientes (objetivo: 30+ reseñas con 4.8★).
3. Alta en directorios: Doctoralia EC, DoctorAnytime, Páginas Amarillas EC, guía MSP.
4. Backlinks: Sociedad Ecuatoriana de Pediatría, hospitales donde haya trabajado, blog de salud infantil local.

## 6. Orden de ejecución sugerido (fases)

**Fase 1 — Foundation (1 PR, alto impacto, bajo riesgo):**
- Fix `lang="es-EC"`, canonical, geo meta, alt text.
- Añadir react-helmet-async + componente `<SEO>`.
- JSON-LD `Physician` + `FAQPage` + `BreadcrumbList` + `WebSite`.
- `sitemap.xml` + `robots.txt` actualizado.

**Fase 2 — Performance:**
- Conversión imágenes a webp, lazy loading, preconnect.

**Fase 3 — GEO content:**
- Reescribir copy de About + FAQ con formato citable.
- Añadir bloque de credenciales verificables.
- Crear `/aviso-medico` y `llms.txt`.

**Fase 4 — Off-site (sin código):**
- GBP, reseñas, directorios.

## 7. Detalles técnicos clave

- **react-helmet-async** vs alternativa: lo prefiero a inyectar `useEffect` manualmente porque maneja SSR/hidration correctamente y es estándar.
- JSON-LD se inyecta como `<script type="application/ld+json">` dentro del `<Helmet>`.
- Coordenadas Carcelén aprox: `-0.103, -78.479` (a verificar con dirección exacta Rodrigo Muñoz N81-46).
- Sitemap estático en `public/` es suficiente; no necesitamos generación dinámica con tan pocas rutas.
- No tocar `/lp`, `/gracias`, `/admin`, `/auth` — su `noindex` es correcto.

## 8. Métricas de éxito (4-12 semanas)

- Google Search Console: impresiones por "pediatra Carcelén" subiendo.
- Aparición en Local Pack para queries geo-localizadas.
- Rich results (FAQ, business info) visibles en SERP.
- Citas en respuestas de Perplexity/ChatGPT al preguntar por pediatras en Quito norte.

---

¿Avanzamos con la **Fase 1** completa en la primera implementación, o prefieres que empiece sólo por JSON-LD y canonical y veamos resultados antes de seguir?
