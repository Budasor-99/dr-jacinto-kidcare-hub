

# Plan: Gráficos de Crecimiento Interactivos con Puntos Arrastrables

## Objetivo
Permitir al Dr. Salazar arrastrar los puntos de datos directamente en los gráficos de crecimiento para modificar las mediciones de peso, talla y perímetro cefálico de manera visual e intuitiva. Los cambios se sincronizarán automáticamente con la tabla de mediciones y la base de datos.

---

## Cómo Funcionará

### Interacción del Usuario

```text
1. El doctor ve el gráfico con los puntos del paciente
2. Hace clic en un punto y lo mantiene presionado
3. Arrastra el punto verticalmente (el eje Y = la medida)
4. Al soltar, el valor se guarda automáticamente
5. La tabla de mediciones se actualiza en tiempo real
```

### Restricciones de Arrastre
- **Solo movimiento vertical**: El punto solo se puede mover en el eje Y (peso, talla, o PC)
- **Fecha fija**: La posición X (edad/fecha) permanece constante - para cambiar la fecha, usar la tabla
- **Límites de rango**: El punto no puede salir de los límites razonables del gráfico

---

## Arquitectura de la Solución

### Nuevo Componente

```text
src/components/admin/growth-charts/
├── DraggablePoint.tsx              # Componente de punto arrastrable (NUEVO)
├── WeightForAgeChart.tsx           # Modificar para usar DraggablePoint
├── HeightForAgeChart.tsx           # Modificar para usar DraggablePoint
├── HeadCircumferenceChart.tsx      # Modificar para usar DraggablePoint
└── GrowthChartsTab.tsx             # Sin cambios
```

### Flujo de Datos

```text
Usuario arrastra punto
        ↓
DraggablePoint captura posición Y
        ↓
Convierte coordenada a valor (kg, cm)
        ↓
Llama onValueChange(controlId, newValue)
        ↓
GrowthChartsTab.handleUpdateControl()
        ↓
Actualiza Supabase + Estado local
        ↓
Re-renderiza gráfico + tabla
```

---

## Implementación Técnica

### 1. Componente DraggablePoint

Crear un componente personalizado que reemplace los puntos estándar de Recharts:

```typescript
interface DraggablePointProps {
  cx: number;           // Coordenada X en píxeles
  cy: number;           // Coordenada Y en píxeles
  payload: {
    controlId: string;
    value: number;
    month: number;
  };
  yAxisScale: any;      // Función de escala del eje Y
  onValueChange: (controlId: string, newValue: number) => void;
  color: string;
  minValue: number;     // Límite inferior (ej: 0 kg)
  maxValue: number;     // Límite superior (ej: 30 kg)
}

const DraggablePoint: React.FC<DraggablePointProps> = (props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentY, setCurrentY] = useState(props.cy);
  
  // Manejadores de eventos para mouse y touch
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseMove = (e) => { /* Calcular nueva posición */ };
  const handleMouseUp = () => { /* Guardar valor y terminar arrastre */ };
  
  return (
    <circle
      cx={props.cx}
      cy={currentY}
      r={isDragging ? 10 : 6}  // Más grande al arrastrar
      fill={props.color}
      stroke="#fff"
      strokeWidth={2}
      cursor="ns-resize"
      onMouseDown={handleMouseDown}
      style={{ transition: isDragging ? 'none' : 'all 0.2s' }}
    />
  );
};
```

### 2. Integración con Gráficos

Modificar cada componente de gráfico para pasar el callback de actualización:

```typescript
// En WeightForAgeChart.tsx
<Line
  dataKey="patientWeight"
  dot={(props) => (
    <DraggablePoint
      {...props}
      yAxisScale={yScale}
      onValueChange={handleDragEnd}
      color={colors.line}
      minValue={0}
      maxValue={30}
    />
  )}
/>
```

### 3. Indicadores Visuales

Mientras el usuario arrastra:
- Punto se agranda (r: 6 → 10)
- Línea guía horizontal muestra el valor actual
- Tooltip muestra el valor numérico en tiempo real
- Cursor cambia a `ns-resize` (↕)

---

## Cambios por Archivo

### Archivos Nuevos

| Archivo | Descripción |
|---------|-------------|
| `DraggablePoint.tsx` | Componente de punto arrastrable con lógica de mouse/touch |

### Archivos a Modificar

| Archivo | Cambios |
|---------|---------|
| `WeightForAgeChart.tsx` | Agregar prop `onUpdate`, usar `DraggablePoint` como dot personalizado |
| `HeightForAgeChart.tsx` | Agregar prop `onUpdate`, usar `DraggablePoint` como dot personalizado |
| `HeadCircumferenceChart.tsx` | Agregar prop `onUpdate`, usar `DraggablePoint` como dot personalizado |
| `GrowthChartsTab.tsx` | Pasar `handleUpdateControl` a los componentes de gráficos |

---

## Experiencia de Usuario Mejorada

### Feedback Visual Durante Arrastre

```text
+------------------------------------------------------------------+
|                    GRÁFICO DE PESO                               |
|     P97 ──────────────────────────────                           |
|     P85 ──────────────────────────────                           |
|                   ┌─────────┐                                    |
|     P50 ─────────●│ 5.2 kg  │─────────  ← Tooltip en tiempo real |
|               ↕   └─────────┘                                    |
|     P15 ─────────────────────────────  ← Línea guía horizontal   |
|     P3  ──────────────────────────────                           |
+------------------------------------------------------------------+
```

### Indicadores de Estado

- **Normal**: Punto azul/rosa según sexo
- **Arrastrando**: Punto más grande + sombra
- **Guardando**: Animación de pulso
- **Guardado**: Flash verde de confirmación

---

## Compatibilidad Táctil (Tabletas)

El componente soportará eventos touch para uso en tabletas:
- `onTouchStart` → Inicia arrastre
- `onTouchMove` → Actualiza posición
- `onTouchEnd` → Guarda valor

Esto es importante para uso en consultorios donde el doctor puede usar una tablet.

---

## Consideraciones Técnicas

### Cálculo de Valor desde Coordenada Y

```typescript
const convertYToValue = (yPixel: number, yScale: any): number => {
  // Recharts proporciona la función inversa de la escala
  return yScale.invert(yPixel);
};

const clampValue = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

const roundToDecimal = (value: number, decimals: number = 2): number => {
  return Math.round(value * 10 ** decimals) / 10 ** decimals;
};
```

### Debounce para Actualizaciones

Para evitar guardar cada milisegundo durante el arrastre:
- Actualizar estado visual inmediatamente (responsive)
- Guardar en base de datos solo al soltar (onMouseUp/onTouchEnd)

---

## Resumen de la Implementación

1. **Crear** `DraggablePoint.tsx` - Componente de punto con drag & drop
2. **Modificar** `WeightForAgeChart.tsx` - Integrar punto arrastrable
3. **Modificar** `HeightForAgeChart.tsx` - Integrar punto arrastrable
4. **Modificar** `HeadCircumferenceChart.tsx` - Integrar punto arrastrable
5. **Modificar** `GrowthChartsTab.tsx` - Pasar callback de actualización a gráficos

---

## Resultado Esperado

El Dr. Salazar podrá:
1. Ver los gráficos de crecimiento del paciente
2. Hacer clic y arrastrar cualquier punto de datos verticalmente
3. Ver el valor actualizado en tiempo real mientras arrastra
4. Soltar para guardar automáticamente
5. Ver la tabla de mediciones actualizada instantáneamente
6. Usar la misma funcionalidad en tablet con gestos táctiles

