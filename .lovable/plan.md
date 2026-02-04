

# Plan: Curvas de Crecimiento OMS Vinculadas a Historia Clínica

## Objetivo
Implementar gráficos de crecimiento pediátrico basados en estándares OMS, 100% vinculados a la historia clínica de cada paciente, con capacidad completa de edición y guardado automático de datos.

---

## Datos Existentes (Ya Disponibles)

Los datos necesarios ya están en tu base de datos y serán utilizados directamente:

| Tabla | Campo | Uso |
|-------|-------|-----|
| `patients` | `birth_date` | Calcular edad en meses |
| `patients` | `sex` | Seleccionar curvas niño/niña |
| `medical_controls` | `weight` | Plotear en curva de peso |
| `medical_controls` | `height` | Plotear en curva de talla |
| `medical_controls` | `head_circumference` | Plotear en curva de PC |
| `medical_controls` | `control_date` | Calcular edad en cada control |

---

## Arquitectura de la Solución

### Nuevos Archivos a Crear

```text
src/
├── components/admin/growth-charts/
│   ├── GrowthChartsTab.tsx           # Pestaña principal con selector
│   ├── WeightForAgeChart.tsx         # Gráfico peso/edad
│   ├── HeightForAgeChart.tsx         # Gráfico talla/edad
│   ├── HeadCircumferenceChart.tsx    # Gráfico PC/edad
│   └── GrowthDataTable.tsx           # Tabla editable de medidas
├── lib/growth-data/
│   ├── who-weight-boys.ts            # Percentiles peso niños (0-60 meses)
│   ├── who-weight-girls.ts           # Percentiles peso niñas
│   ├── who-height-boys.ts            # Percentiles talla niños
│   ├── who-height-girls.ts           # Percentiles talla niñas
│   ├── who-hc-boys.ts                # Percentiles PC niños (0-36 meses)
│   ├── who-hc-girls.ts               # Percentiles PC niñas
│   └── growth-utils.ts               # Utilidades de cálculo
```

### Archivo a Modificar

- `src/components/admin/MedicalRecordDialog.tsx`: Agregar pestaña "Crecimiento"

---

## Flujo de Datos Completo

```text
+------------------+     +-------------------+     +--------------------+
|    patients      |     |  medical_records  |     |  medical_controls  |
|  (birth_date,    |---->|   (patient_id)    |---->|  (weight, height,  |
|   sex)           |     |                   |     |   head_circ, date) |
+------------------+     +-------------------+     +--------------------+
        |                                                    |
        v                                                    v
+---------------------------------------------------------------+
|                   GrowthChartsTab.tsx                         |
|  - Recibe: patientId, birthDate, sex                          |
|  - Carga: todos los controles con medidas                     |
|  - Calcula: edad en meses para cada control                   |
|  - Renderiza: gráficos + tabla editable                       |
+---------------------------------------------------------------+
```

---

## Funcionalidades Clave

### 1. Vinculación 100% con Historia Clínica

- Los gráficos se cargan automáticamente al abrir la historia del paciente
- Los datos vienen directamente de `medical_controls` (ya existentes)
- El sexo del paciente (`M`/`F`) determina qué curvas mostrar
- La edad se calcula automáticamente: `(control_date - birth_date)` en meses

### 2. Edición Fácil de Datos

**Tabla Editable Integrada:**
- Debajo del gráfico, una tabla mostrará todos los controles
- Columnas: Fecha, Edad, Peso, Talla, PC, Acciones
- Cada celda es editable directamente
- Botón "Guardar" por fila o "Guardar Todo"
- Los cambios se reflejan inmediatamente en el gráfico

**Agregar Nuevo Control desde la pestaña:**
- Botón "Agregar Medición" que crea un nuevo control
- Campos requeridos: fecha, peso, talla (PC opcional)
- Al guardar, el punto aparece automáticamente en el gráfico

### 3. Visualización de Gráficos

**Características:**
- Curvas de percentiles OMS (P3, P15, P50, P85, P97) como áreas sombreadas
- Puntos del paciente conectados por línea
- Colores diferenciados: Azul para niños, Rosa para niñas
- Tooltip interactivo al pasar sobre cada punto
- Indicador visual de estado nutricional

**Selector de Gráfico:**
- Peso para la Edad (0-5 años)
- Talla para la Edad (0-5 años)
- Perímetro Cefálico para la Edad (0-3 años)
- IMC para la Edad (0-5 años) - calculado automáticamente

### 4. Guardado Automático

- Cada modificación se guarda en `medical_controls`
- Feedback visual: toast de confirmación
- Sincronización con la pestaña "Controles"
- Los cambios persisten entre sesiones

---

## Interfaz de Usuario

### Nueva Pestaña en MedicalRecordDialog

```text
+------------------------------------------------------------------------+
| Paciente | Anamnesis | Controles | Evolución | [CRECIMIENTO] | Vacunas |
+------------------------------------------------------------------------+
|                                                                        |
|  [Peso ▼] [Talla] [P. Cefálico] [IMC]           + Agregar Medición    |
|                                                                        |
|  +------------------------------------------------------------------+  |
|  |                    GRÁFICO DE PESO                               |  |
|  |     P97 ──────────────────────────────                           |  |
|  |     P85 ──────────────────────────────                           |  |
|  |     P50 ────────────●────●────●───────  ← Puntos del paciente    |  |
|  |     P15 ──────────────────────────────                           |  |
|  |     P3  ──────────────────────────────                           |  |
|  |     0m   6m   12m   18m   24m   36m   48m   60m                   |  |
|  +------------------------------------------------------------------+  |
|                                                                        |
|  Estado: ● Percentil 45 (Normal)                                       |
|                                                                        |
|  +------------------------------------------------------------------+  |
|  |  TABLA DE MEDICIONES (Editable)                                  |  |
|  |  Fecha       | Edad      | Peso   | Talla | P.Cef | Acciones     |  |
|  |  09/01/2026  | 2m 11d    | [50]   | [157] | [--]  | 💾 🗑️        |  |
|  |  15/12/2025  | 1m 16d    | [48]   | [155] | [38]  | 💾 🗑️        |  |
|  +------------------------------------------------------------------+  |
|                                                                        |
+------------------------------------------------------------------------+
```

---

## Detalles Técnicos

### Cálculo de Edad en Meses

```typescript
const calculateAgeInMonths = (birthDate: Date, controlDate: Date): number => {
  const diffTime = controlDate.getTime() - birthDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays / 30.44; // Promedio de días por mes
};
```

### Estructura de Datos OMS

```typescript
// Ejemplo: src/lib/growth-data/who-weight-boys.ts
export const weightForAgeBoys = [
  { month: 0, p3: 2.5, p15: 2.9, p50: 3.3, p85: 3.9, p97: 4.3 },
  { month: 1, p3: 3.4, p15: 3.9, p50: 4.5, p85: 5.1, p97: 5.7 },
  { month: 2, p3: 4.3, p15: 4.9, p50: 5.6, p85: 6.3, p97: 7.0 },
  // ... hasta 60 meses
];
```

### Integración con Recharts (ya instalado)

```typescript
<ComposedChart data={chartData}>
  <Area dataKey="p97" fill="#e3f2fd" stroke="none" />
  <Area dataKey="p85" fill="#bbdefb" stroke="none" />
  <Line dataKey="p50" stroke="#1976d2" strokeDasharray="5 5" />
  <Line dataKey="patientData" stroke="#1976d2" dot={true} />
</ComposedChart>
```

---

## Alertas Visuales de Estado

| Rango | Color | Significado |
|-------|-------|-------------|
| P15-P85 | Verde | Normal |
| P3-P15 o P85-P97 | Amarillo | Vigilar |
| < P3 o > P97 | Rojo | Evaluar |

---

## Integración con PDF Existente

Los gráficos de crecimiento podrán incluirse en el PDF de la historia clínica:
- Tabla resumida de medidas por control
- Estado nutricional actual
- (Opcional futuro) Captura del gráfico como imagen

---

## Resumen de Cambios

| Componente | Acción |
|------------|--------|
| 6 archivos de datos OMS | Crear |
| 1 archivo de utilidades | Crear |
| 4 componentes de gráficos | Crear |
| 1 componente de tabla editable | Crear |
| MedicalRecordDialog.tsx | Modificar (agregar pestaña) |

---

## Resultado Esperado

Al abrir la historia clínica de cualquier paciente:

1. Nueva pestaña "Crecimiento" visible junto a las demás
2. Gráficos que muestran automáticamente los datos del paciente
3. Curvas OMS según el sexo (niño/niña)
4. Tabla editable con todas las mediciones
5. Guardado instantáneo de cambios
6. Sincronización con la pestaña "Controles"
7. Indicador visual del percentil actual

