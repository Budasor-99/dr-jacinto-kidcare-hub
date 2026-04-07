

# Actualizar Logo en Todo el Sitio

## Resumen
Reemplazar el logo actual (`logo.png`) con el nuevo logo (`nuevo_logo.png`) en todos los archivos donde se utiliza, incluyendo el favicon.

## Cambios

### 1. Copiar el nuevo logo al proyecto
- Copiar `user-uploads://nuevo_logo.png` a `src/assets/logo.png` (reemplaza el actual)
- Copiar `user-uploads://nuevo_logo.png` a `public/favicon.png` (reemplaza el favicon)

### 2. No se necesitan cambios en codigo
Todos los archivos ya importan desde `@/assets/logo.png`, asi que al reemplazar el archivo, se actualiza automaticamente en:
- **Header** (`src/components/landing/Header.tsx`)
- **Footer** (`src/components/landing/Footer.tsx`)
- **SEMHero** (`src/components/sem/SEMHero.tsx`)
- **ThankYou** (`src/pages/ThankYou.tsx`)
- **PrivacyPolicy** (`src/pages/PrivacyPolicy.tsx`)
- **Favicon** (`index.html` → `public/favicon.png`)

