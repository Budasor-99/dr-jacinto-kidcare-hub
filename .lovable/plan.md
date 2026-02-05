

# Plan: Movimiento libre (2D) del punto en las graficas y edicion de edad

## Problema actual
1. El punto del paciente solo se mueve **verticalmente** (eje Y), pero el doctor necesita moverlo libremente en ambas direcciones (X e Y) para posicionar el registro en la edad y valor correctos.
2. El campo "Edad" en la tabla de mediciones no es editable directamente - solo se calcula automaticamente a partir de la fecha de control.

## Solucion propuesta

### 1. Drag-and-drop libre (horizontal + vertical) en DraggablePoint

Modificar `DraggablePoint.tsx` para soportar movimiento en ambos ejes:

- Agregar props: `chartLeft`, `chartWidth`, `xDomain` para convertir pixeles X a meses.
- Durante el drag, calcular tanto el nuevo valor (Y) como el nuevo mes (X).
- Actualizar visualmente la posicion en ambos ejes en tiempo real.
- Al soltar el punto, emitir un callback con el nuevo valor Y **y** el nuevo mes X.
- Cambiar el cursor de `ns-resize` a `move` para indicar movimiento libre.
- Mostrar en el tooltip tanto el valor como la edad mientras se arrastra.

### 2. Actualizar GrowthChartBase para pasar dimensiones X

Modificar `GrowthChartBase.tsx`:

- Capturar las dimensiones del area de ploteo (left, width) ademas de top/height.
- Pasar `chartLeft`, `chartWidth` y `xDomain` al componente `DraggablePoint`.
- Cambiar el callback `onUpdateValue` para incluir el mes: `(controlId, newValue, newMonth) => void`.

### 3. Actualizar GrowthChartsTab para guardar cambios de edad

Modificar `GrowthChartsTab.tsx`:

- Al recibir un cambio de mes desde el drag, recalcular la nueva `control_date` sumando los meses a la fecha de nacimiento del paciente.
- Guardar tanto el nuevo valor (peso/talla/PC) como la nueva fecha de control en la base de datos.

### 4. Hacer el campo "Edad" editable en la tabla de mediciones

Modificar `GrowthDataTable.tsx`:

- Agregar un campo editable para la edad (en meses) en la columna "Edad".
- Cuando el doctor cambie la edad, recalcular automaticamente la `control_date` a partir de la fecha de nacimiento + meses ingresados, y guardar ambos valores.

---

## Detalles tecnicos

### DraggablePoint.tsx - Nuevas props y logica X

```text
Props nuevas:
  - chartLeft: number (pixel izquierdo del area de ploteo)
  - chartWidth: number (ancho en pixeles del area de ploteo)  
  - xDomain: [number, number] (rango de meses, ej: [0, 60])
  - onValueChange: (controlId, newValue, newMonth) => void

Conversion pixel -> mes:
  xToMonth(xPixel) = xDomain[0] + ((xPixel - chartLeft) / chartWidth) * (xDomain[1] - xDomain[0])

Durante drag:
  - Mover currentX y currentY simultaneamente
  - Mostrar en tooltip: valor + edad
```

### GrowthChartBase.tsx - Captura de dimensiones X

Se obtendra `chartLeft` y `chartWidth` del SVG de Recharts de la misma forma que ya se obtiene `chartTop` y `chartHeight`, usando el bounding rect del area de ploteo.

### GrowthChartsTab.tsx - Recalculo de fecha

```text
Cuando el punto se mueve horizontalmente:
  1. Recibir newMonth (ej: 14.5 meses)
  2. Calcular nueva fecha: birthDate + round(newMonth) meses
  3. Actualizar control_date en la BD
  4. Recalcular ageInMonths en el estado local
```

### GrowthDataTable.tsx - Columna edad editable

Agregar un input numerico en la columna "Edad" que al cambiar:
1. Tome el valor en meses ingresado
2. Calcule `control_date = birthDate + N meses`
3. Llame a `onUpdate(controlId, "control_date", nuevaFecha)`

## Archivos a modificar
- `src/components/admin/growth-charts/DraggablePoint.tsx`
- `src/components/admin/growth-charts/GrowthChartBase.tsx`
- `src/components/admin/growth-charts/GrowthChartsTab.tsx`
- `src/components/admin/growth-charts/GrowthDataTable.tsx`
- `src/components/admin/growth-charts/WeightForAgeChart.tsx`
- `src/components/admin/growth-charts/HeightForAgeChart.tsx`
- `src/components/admin/growth-charts/HeadCircumferenceChart.tsx`

