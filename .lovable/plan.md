## Objetivo

Hacer que los schemas JSON-LD aparezcan en el HTML inicial del sitio (no solo después de que React monta), para que sean detectados por:
- Validador oficial de Schema.org
- Bing, DuckDuckGo, Yandex
- Crawlers de redes sociales (Facebook, LinkedIn, X)
- LLMs y motores generativos (ChatGPT, Perplexity, Claude)
- Cualquier herramienta SEO sin JavaScript

## Diagnóstico actual

Los schemas viven en `src/lib/seo/schemas.ts` y se inyectan vía `<SEO />` con `react-helmet-async`. Esto funciona en el DOM en vivo pero **no en el HTML servido inicialmente**, porque Lovable sirve un SPA estático sin SSR.

El validador de Schema.org leyó `index.html` directo y no encontró nada.

## Cambios propuestos

### 1. Inyectar schemas globales en `index.html`

Añadir directamente en el `<head>` de `index.html` los schemas que aplican a todo el sitio:

- **Physician / MedicalBusiness / LocalBusiness** (NAP, horarios, geo)
- **Person** (Dr. Salazar, credenciales, E-E-A-T)
- **WebSite** (identidad del sitio)

Estos son los schemas que Google y los LLMs usan para Knowledge Graph local y autoridad médica. No cambian entre páginas, así que pueden ser estáticos.

Usar valores literales (los mismos de `src/lib/seo/businessData.ts`) para evitar dependencia de JS.

### 2. Mantener schemas dinámicos por ruta en `<SEO />`

Los schemas que **sí dependen de la ruta** seguirán inyectándose con react-helmet-async:

- **FAQPage** (solo en home)
- **BreadcrumbList** (varía por página)
- **WebPage** específicos por ruta

Esto está bien porque Googlebot ejecuta JS y captará estos. Para LLMs, los schemas críticos (Physician/Person) ya estarán estáticos.

### 3. Limpieza en index.html

- Quitar comentario `<!-- TODO: Update og:title -->` ya resuelto
- Reorganizar `<head>` en bloques comentados: SEO base / Open Graph / Schemas / Tracking
- Mantener tags geo y canonical actuales

### 4. Sincronización futura

Los datos del negocio (NAP, horarios) están en **dos lugares ahora**: `businessData.ts` y `index.html`. Documentar en la memory `seo-geo-architecture` que cualquier cambio de NAP debe actualizar **ambos** archivos.

## Archivos a modificar

```text
index.html                          → añadir 3 bloques <script type="application/ld+json">
src/lib/seo/businessData.ts         → sin cambios (sigue siendo fuente de verdad)
src/lib/seo/schemas.ts              → sin cambios (sigue alimentando <SEO />)
src/components/SEO.tsx              → sin cambios
src/pages/Index.tsx                 → opcional: quitar physicianSchema/personSchema/websiteSchema del array (ya estarán en index.html), dejar solo faqSchema y breadcrumbSchema para evitar duplicación
mem://features/seo/seo-geo-architecture → actualizar nota sobre dual-source NAP
```

## Verificación post-implementación

1. Publicar el sitio
2. Abrir https://validator.schema.org/ con la URL pública → debe detectar Physician, Person, WebSite
3. Abrir https://search.google.com/test/rich-results → debe detectar todos (incluyendo FAQ dinámico)
4. Verificar en "Ver código fuente" del navegador (Ctrl+U) que los JSON-LD están presentes antes de que React arranque

## Detalles técnicos

- Schemas estáticos con `@id` consistentes (`#physician`, `#person`, `#website`) para que los dinámicos puedan referenciarlos sin duplicar entidades
- Mantener `@context: "https://schema.org"` en cada bloque
- No usar `defer` ni `async` en los `<script type="application/ld+json">` (no aplica, son data)
