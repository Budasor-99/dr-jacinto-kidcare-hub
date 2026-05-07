# Corregir validación Schema.org del Physician

El validador detectó dos problemas en el bloque `Physician / MedicalBusiness / LocalBusiness` (en `index.html` y replicado en `src/lib/seo/schemas.ts`):

## 1. Error: `medicalSpecialty` inválido

- **Actual:** `"Pediatrics"` (string libre, no aceptado).
- **Causa:** Schema.org exige un valor del enum `MedicalSpecialty`. El valor correcto es `"Pediatric"` (URL: `http://schema.org/Pediatric`).
- **Solución:** cambiar `medicalSpecialty` a `"Pediatric"` en:
  - `index.html` (bloque JSON-LD del Physician)
  - `src/lib/seo/businessData.ts` (`medicalSpecialty: "Pediatric"`)
  - El schema dinámico en `src/lib/seo/schemas.ts` se actualiza automáticamente al leer de `BUSINESS`.

## 2. Advertencia: `availableLanguage` no reconocida en `LocalBusiness`

- **Actual:** `"availableLanguage": ["Spanish"]` a nivel raíz.
- **Causa:** `availableLanguage` es válida en `Physician` pero el validador la evalúa contra el tipo combinado y al ser `LocalBusiness` la marca como no reconocida. Además el formato recomendado es un objeto `Language` con código BCP-47, no un string.
- **Solución:** reemplazar por:
  ```json
  "availableLanguage": [
    { "@type": "Language", "name": "Spanish", "alternateName": "es" }
  ]
  ```
  Aplicar el cambio en:
  - `index.html` (bloque Physician)
  - `src/lib/seo/businessData.ts` (estructura del array) y `src/lib/seo/schemas.ts` para mapear el objeto `Language` correctamente
  - También en `personSchema` (`knowsLanguage`) por consistencia: usar el mismo formato `{ "@type": "Language", "name": "Spanish", "alternateName": "es" }`

## Archivos a modificar

- `index.html` — bloques JSON-LD estáticos (Physician y Person).
- `src/lib/seo/businessData.ts` — actualizar `medicalSpecialty` y formato de `availableLanguage`.
- `src/lib/seo/schemas.ts` — ajustar mapeo si cambia la forma del dato fuente.

## Verificación

Tras aplicar los cambios, volver a validar la URL en `https://validator.schema.org/`. Los dos avisos deben desaparecer y el bloque Physician quedar 100% válido.

## Notas

- No se altera ninguna otra propiedad ni lógica de la app.
- Mantener sincronizadas las dos fuentes (HTML estático y `businessData.ts`) según la regla ya documentada en memoria.
