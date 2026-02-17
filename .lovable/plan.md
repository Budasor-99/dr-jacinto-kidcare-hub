

# Correccion: Zonas A-F del estandar MSP Ecuador

## Problema

Actualmente las letras A, B, C, D, E, F estan puestas SOBRE las lineas de las curvas (P97, P85, P50, P15, P3, -3SD). Esto es incorrecto segun el Dr. Salazar.

Las letras deben representar las **zonas** (espacios entre curvas), asi:

```text
        (espacio superior)
           Zona A  =  Sobrepeso
  ───── P97 ─────────────────────────
           Zona B  =  Normal Alto
  ═════ P50 ═════════════════════════  (linea gruesa, mediana)
           Zona C  =  Normal Bajo
  - - - P3 - - - - - - - - - - - - -
           Zona D  =  Desnutricion Grado 1
  - - - -2DE - - - - - - - - - - - -
           Zona E  =  Desnutricion Grado 2
  ..... -3DE .......................
           Zona F  =  Desnutricion Grado 3
        (espacio inferior)
```

Las curvas que se dibujan son 5 lineas: **P97, P50, P3, -2DE, -3DE**. Se eliminan P85 y P15 como curvas separadas.

## Clasificacion corregida

| Zona | Ubicacion | Diagnostico |
|------|-----------|-------------|
| A | Por encima de P97 | Sobrepeso |
| B | Entre P97 y P50 | Normal Alto |
| C | Entre P50 y P3 | Normal Bajo |
| D | Entre P3 y -2DE | Desnutricion Grado 1 |
| E | Entre -2DE y -3DE | Desnutricion Grado 2 |
| F | Por debajo de -3DE | Desnutricion Grado 3 |

## Cambios por archivo

### 1. `WeightForAgeChart.tsx`

Reemplazar las 6 curvas actuales (P97, P85, P50, P15, P3, F) por 5 curvas SIN letras en las lineas:

```text
Curvas nuevas:
- p97: linea solida, sin letra
- p50: linea bold (mediana), sin letra
- p3: linea discontinua, sin letra
- minus2sd: linea discontinua (calculada), sin letra
- minus3sd: linea punteada (calculada), sin letra
```

Actualizar `computeExtraFields` para calcular `-2DE` y `-3DE`:
- 1 SD aprox = (P50 - P3) / 1.88
- -2DE = P50 - 2*SD
- -3DE = P50 - 3*SD

### 2. `HeightForAgeChart.tsx`

Mismos cambios que peso: 5 curvas sin letras, calculo de -2DE/-3DE.

### 3. `GrowthChartBase.tsx`

Cambios principales:

- **Agregar soporte para "zone labels"**: Nueva propiedad `zoneLabels` que define las 6 zonas A-F con las dos curvas que las delimitan (superior e inferior).
- **Renderizar las letras como SVG** en el centro vertical de cada zona, a la posicion horizontal de `labelMonth`. Cada letra tendra un pequeno fondo blanco para legibilidad.
- **Eliminar los dots de letras** de las curvas (los `makeOnCurveDot` ya no pondran letras).
- **Actualizar la leyenda** inferior para mostrar las zonas con sus diagnosticos en lugar de las curvas con letras.
- **Actualizar el tooltip** para mostrar solo las curvas relevantes (P97, P50, P3, -2DE, -3DE) sin letras A-F.

### 4. `growth-utils.ts`

Actualizar `getNutritionalDiagnosis()` para la clasificacion del Dr. Salazar:

**Peso:**
- Valor > P97 --> Zona A: "Sobrepeso"
- P50 < Valor <= P97 --> Zona B: "Normal Alto"
- P3 < Valor <= P50 --> Zona C: "Normal Bajo"
- -2DE < Valor <= P3 --> Zona D: "Desnutricion Grado 1"
- -3DE < Valor <= -2DE --> Zona E: "Desnutricion Grado 2"
- Valor <= -3DE --> Zona F: "Desnutricion Grado 3"

Agregar nuevas severidades: `"normal_high"` y `"normal_low"`.

Se necesita calcular -2DE y -3DE dentro de esta funcion tambien (usando los datos de referencia P50 y P3).

**Talla:** Aplicar misma logica de zonas.

**PC:** Mantener sistema actual (Macrocefalia/Normal/Microcefalia) ya que usa otro esquema de percentiles.

### 5. `ClinicalInterpretation.tsx`

Actualizar los badges para mostrar la zona (A-F) junto al diagnostico. Ej: "Peso: P45 - Zona B (Normal Alto)".

### 6. `GrowthTrackingTable.tsx`

Actualizar los badges de diagnostico para reflejar la nueva clasificacion con zonas.

## Archivos a modificar

1. `src/components/admin/growth-charts/WeightForAgeChart.tsx` - 5 curvas, calculo -2DE/-3DE
2. `src/components/admin/growth-charts/HeightForAgeChart.tsx` - 5 curvas, calculo -2DE/-3DE
3. `src/components/admin/growth-charts/GrowthChartBase.tsx` - Zonas A-F como texto entre curvas, leyenda, tooltip
4. `src/lib/growth-data/growth-utils.ts` - Clasificacion corregida del Dr. Salazar
5. `src/components/admin/growth-charts/ClinicalInterpretation.tsx` - Badges con zonas
6. `src/components/admin/growth-charts/GrowthTrackingTable.tsx` - Badges con zonas

