

# Plan: Mejora Visual y Funcional de las Curvas de Crecimiento

## Objetivo
Redisenar las graficas de crecimiento para que se asemejen al formato MSP Ecuador (la imagen de referencia), mejorando tanto la presentacion visual como la funcionalidad de interaccion con arrastre de puntos.

---

## Cambios Visuales Principales

### 1. Eje X mejorado: Agrupacion por anos
La imagen de referencia agrupa los meses en secciones anuales (1er Ano, 2do Ano, etc.). Actualmente el eje muestra "0m, 6m, 12m..." de forma plana.

**Cambio:** Agregar etiquetas secundarias que agrupen visualmente por ano, con lineas divisorias mas prominentes cada 12 meses, y tick marks mensuales finos.

### 2. Curvas de percentiles como lineas individuales etiquetadas
En la imagen de referencia, los percentiles son lineas curvas etiquetadas (A, B, C, D, E, F). Actualmente se muestran como areas rellenas.

**Cambio:** Reemplazar las areas rellenas por lineas individuales para P3, P15, P50, P85, P97 con etiquetas visibles al final de cada curva. Mantener un sombreado suave entre P15-P85 como zona "normal".

### 3. Grilla mas densa y profesional
La imagen tiene una grilla densa con subdivisiones finas, similar a papel milimetrado medico.

**Cambio:** Aumentar la densidad de la grilla con lineas principales cada unidad y lineas secundarias cada subdivision. Usar colores mas suaves para las lineas secundarias.

### 4. Tamano del grafico mas alto
Aumentar la altura del area de grafico de 350px a 500px para mayor legibilidad clinica.

### 5. Etiquetas de percentiles en las curvas
Agregar etiquetas directas sobre las lineas de percentiles (P3, P15, P50, P85, P97) al final derecho de cada curva, eliminando la necesidad de leyenda separada.

---

## Mejoras Funcionales

### 6. Mejora del DraggablePoint
- Punto mas visible con borde mas grueso
- Tooltip mejorado: mostrar edad, valor actual y percentil en tiempo real mientras se arrastra
- Feedback haptico visual: cambio de color del fondo segun la zona de percentil al arrastrar (verde=normal, amarillo=vigilar, rojo=evaluar)

### 7. Mejor sincronizacion punto-tabla
- Al arrastrar un punto y soltar, destacar visualmente la fila correspondiente en la tabla de mediciones (flash de color)

### 8. Zoom automatico al rango de datos
- Si el paciente solo tiene datos hasta los 18 meses, mostrar el grafico optimizado de 0-24 meses en vez de 0-60 para mayor detalle
- Agregar botones para cambiar entre vista completa (0-60m) y vista enfocada

---

## Archivos a Modificar

| Archivo | Cambio |
|---------|--------|
| `WeightForAgeChart.tsx` | Rediseno visual completo: lineas de percentiles, grilla densa, etiquetas, zoom |
| `HeightForAgeChart.tsx` | Mismos cambios visuales que peso |
| `HeadCircumferenceChart.tsx` | Mismos cambios visuales que peso |
| `DraggablePoint.tsx` | Tooltip mejorado con percentil en tiempo real, feedback de color por zona |
| `GrowthChartsTab.tsx` | Agregar controles de zoom/vista |
| `growth-utils.ts` | Agregar funcion para calcular percentil interpolado en tiempo real |

---

## Detalles Tecnicos

### Estructura del eje X agrupado
Se usara `XAxis` con ticks custom que muestren el numero de mes dentro de cada ano, y `ReferenceLine` verticales para separar los anos. Debajo se colocara un segundo label con "1er Ano", "2do Ano", etc.

### Lineas de percentiles etiquetadas
Se reemplazaran los componentes `Area` por `Line` con `strokeDasharray` diferenciado:
- P3 y P97: linea punteada fina
- P15 y P85: linea con guiones
- P50: linea solida gruesa (mediana)

Cada linea tendra un `Label` posicionado al final derecho.

### Grilla densa
Se utilizara `CartesianGrid` con intervalos personalizados y `ReferenceLine` adicionales para subdivisiones, simulando el patron de grilla del papel MSP.

### Zoom inteligente
Se calculara el rango optimo basado en la edad maxima del paciente, redondeado al siguiente periodo de 12 meses. Se agregaran botones "Vista completa" / "Vista enfocada".

### DraggablePoint con feedback de percentil
Al arrastrar, el tooltip mostrara en tiempo real:
- Valor numerico (ej: "8.5 kg")
- Percentil calculado (ej: "P62")
- Color del fondo del tooltip cambia segun zona (verde/amarillo/rojo)

Se usara la funcion `getPercentileStatus` existente con interpolacion para el mes actual.

