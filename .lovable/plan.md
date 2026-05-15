
# Análisis: categorización para LLMs según schema.org/Pediatric

## Contexto

Según [schema.org/Pediatric](https://schema.org/Pediatric), el término "Pediatric" tiene **doble naturaleza** en Schema.org:

1. **Como tipo (`@type`)**: es subtipo directo de `MedicalBusiness` → `LocalBusiness` → `Organization`. Se puede usar como tipo del negocio.
2. **Como valor de enumeración (`medicalSpecialty`)**: es miembro de `MedicalSpecialty`. Se puede usar como valor de la propiedad `medicalSpecialty`.

## Estado actual del sitio

Revisé `index.html`, `src/lib/seo/schemas.ts`, `src/lib/seo/businessData.ts` y `public/llms.txt`. Hoy publicamos:

```jsonc
"@type": ["Physician", "MedicalBusiness", "LocalBusiness"],
"medicalSpecialty": "Pediatric"
```

### Lo que está bien

- `medicalSpecialty: "Pediatric"` es un valor válido del enum `MedicalSpecialty` (corregido en una iteración previa, antes era "Pediatrics").
- Tipos múltiples `Physician + MedicalBusiness + LocalBusiness` son válidos y dan señales fuertes a Google y LLMs (médico individual + negocio local).
- `availableLanguage` y `knowsLanguage` ya usan el formato objeto `Language` con `alternateName: "es"`.
- `llms.txt` describe claramente especialidad, NAP, horarios y servicios en lenguaje natural.

### Lo que se puede mejorar para LLMs

1. **Falta `Pediatric` como `@type` del negocio**
   Schema.org permite que un MedicalBusiness sea explícitamente del subtipo `Pediatric`. Añadirlo al array de `@type` da una señal mucho más explícita a LLMs ("este negocio ES una práctica pediátrica"), no solo a través de la propiedad `medicalSpecialty`.

   Cambio propuesto:
   ```jsonc
   "@type": ["Physician", "Pediatric", "MedicalBusiness", "LocalBusiness"]
   ```

2. **`medicalSpecialty` como referencia tipada**
   Hoy es un string suelto. La forma más fuerte para LLMs es referenciar la URL canónica del enum, que es exactamente lo que pide el usuario:
   ```jsonc
   "medicalSpecialty": {
     "@type": "MedicalSpecialty",
     "name": "Pediatric",
     "url": "https://schema.org/Pediatric"
   }
   ```
   Esto enlaza el dato con la entidad oficial de Schema.org.

3. **`Person` (Dr. Salazar) puede declarar su especialidad**
   El bloque `Person` actual no expresa la especialidad como entidad. Podemos añadir:
   ```jsonc
   "hasOccupation": {
     "@type": "MedicalOccupation",
     "name": "Médico Pediatra",
     "occupationalCategory": "Pediatric"
   }
   ```
   Refuerza la asociación persona↔especialidad pediátrica para crawlers semánticos.

4. **`llms.txt`: declarar la categoría taxonómica**
   El archivo describe los servicios pero no menciona explícitamente la taxonomía Schema.org. Añadir una línea ayuda a LLMs que cruzan referencias:
   ```
   ## Categoría Schema.org
   - Tipo: Pediatric / MedicalBusiness / Physician
   - Especialidad: https://schema.org/Pediatric
   ```

5. **`knowsAbout` del Person**
   Ya incluye "Pediatría" — lo dejaría tal cual; sirve como sinónimo en español.

## Veredicto

La web **sí está correctamente categorizada** según el estándar mínimo (medicalSpecialty con valor válido del enum). Los cuatro ajustes anteriores la llevan de "válida" a **óptima para LLMs**: doble señal (tipo + propiedad), referencia URL al enum oficial, y declaración explícita en `llms.txt`.

## Archivos a tocar (cuando apruebes)

- `index.html` — bloques JSON-LD estáticos (Physician y Person).
- `src/lib/seo/businessData.ts` — cambiar `medicalSpecialty` a objeto y añadir tipo `Pediatric`.
- `src/lib/seo/schemas.ts` — propagar el nuevo formato al schema dinámico y añadir `hasOccupation` al Person.
- `public/llms.txt` — añadir sección "Categoría Schema.org".

## Verificación posterior

- Validar en `https://validator.schema.org/` (sin warnings).
- Probar en Google Rich Results Test.
- Re-scan SEO con `seo_chat--list_findings`.

¿Lo implemento?
