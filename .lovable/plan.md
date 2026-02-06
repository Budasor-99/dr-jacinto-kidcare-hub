

# Plan: Diagnosticos Nutricionales Automaticos basados en Percentiles OMS/MSP

## Objetivo
Agregar clasificacion nutricional automatica en las graficas de crecimiento, generando diagnosticos clinicos de:
- **Sobrepeso** (por encima de P85-P97)
- **Obesidad** (por encima de P97)
- **Normal** (entre P15 y P85)
- **Desnutricion Grado 1 / Leve** (entre P3 y P15)
- **Desnutricion Grado 2 / Moderada** (por debajo de P3, hasta -3DE)
- **Desnutricion Grado 3 / Severa** (por debajo de -3DE)

Estos diagnosticos se basan en la clasificacion de Gomez/Waterlow adaptada al estandar MSP Ecuador, usando las curvas OMS que ya tenemos implementadas.

## Donde se mostraran los diagnosticos

1. **En la Interpretacion Clinica** (seccion existente): Los badges actuales que dicen "Normal / Vigilar / Evaluar" se reemplazaran por diagnosticos clinicos reales (ej: "Peso: P12 - Desnutricion Leve").

2. **En la Tabla de Seguimiento** (GrowthTrackingTable): Se agregara una columna "Dx" (Diagnostico) que muestre el diagnostico nutricional por cada control.

3. **En el tooltip del drag-and-drop**: Al arrastrar un punto, ademas del percentil se mostrara el diagnostico correspondiente.

4. **Alerta visual en el encabezado**: Si el ultimo control tiene un diagnostico de riesgo, se mostrara una alerta destacada.

## Clasificacion nutricional propuesta

Basada en percentiles OMS y estandar MSP Ecuador:

```text
Zona Percentil         | Diagnostico Peso        | Color
-----------------------|-------------------------|--------
> P97                  | Obesidad                | Rojo
P85 - P97              | Sobrepeso               | Naranja
P15 - P85              | Normal                  | Verde
P3 - P15               | Desnutricion Grado 1    | Amarillo
< P3 (hasta -3DE)      | Desnutricion Grado 2    | Naranja
< -3DE (curva F)       | Desnutricion Grado 3    | Rojo

Para Talla:
> P97                  | Talla Alta              | Azul
P15 - P85              | Normal                  | Verde
P3 - P15               | Riesgo Talla Baja       | Amarillo
< P3                   | Talla Baja              | Rojo

Para P. Cefalico:
> P97                  | Macrocefalia             | Rojo
P3 - P97               | Normal                  | Verde
< P3                   | Microcefalia             | Rojo
```

## Detalles tecnicos

### 1. Nuevo sistema de diagnostico en `growth-utils.ts`

Se creara una funcion `getNutritionalDiagnosis()` que recibe el valor, datos de referencia, y el tipo de medicion (peso/talla/pc) para retornar el diagnostico clinico correcto:

```text
Funcion: getNutritionalDiagnosis(value, refData, type)
  - type: "weight" | "height" | "hc"
  - Retorna: { diagnosis: string, severity: "normal"|"mild"|"moderate"|"severe"|"overweight"|"obese", color, bgColor }
  - Para peso: usa -3DE (curva F estimada) para distinguir Grado 2 vs Grado 3
  - Para talla: diagnosticos especificos de estatura
  - Para PC: macrocefalia/microcefalia
```

### 2. Actualizacion de `ClinicalInterpretation.tsx`

- Reemplazar los badges genericos por diagnosticos nutricionales especificos
- Agregar una seccion de "Diagnostico Nutricional" con iconos y colores por severidad
- Incluir auto-generacion de texto sugerido para la evaluacion basado en los diagnosticos detectados

### 3. Actualizacion de `GrowthTrackingTable.tsx`

- Agregar columna "Diagnostico" con badge de diagnostico nutricional por cada control
- Color-coding segun severidad

### 4. Actualizacion del tooltip en `DraggablePoint.tsx`

- Mostrar el diagnostico junto al percentil mientras se arrastra el punto

### 5. Alerta en `GrowthCardHeader.tsx`

- Si el ultimo control tiene diagnostico de riesgo, mostrar alerta visual

## Archivos a modificar
- `src/lib/growth-data/growth-utils.ts` - Nueva funcion de diagnostico nutricional
- `src/components/admin/growth-charts/ClinicalInterpretation.tsx` - Badges con diagnosticos reales
- `src/components/admin/growth-charts/GrowthTrackingTable.tsx` - Columna de diagnostico
- `src/components/admin/growth-charts/DraggablePoint.tsx` - Tooltip con diagnostico
- `src/components/admin/growth-charts/GrowthCardHeader.tsx` - Alerta de riesgo

