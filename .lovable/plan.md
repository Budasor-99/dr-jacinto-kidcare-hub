
# Integrar Calendly para Agendamiento de Citas

## Resumen
Reemplazar el formulario de citas actual en la landing page con un widget de Calendly embebido, usando tu link: `https://calendly.com/andresalazarcevallos99/30min`. Esto simplifica el proceso de agendamiento ya que Calendly maneja disponibilidad, confirmaciones y recordatorios automáticamente.

## Cambios Principales

### 1. Reemplazar el formulario de citas en la Landing Page
- Eliminar todo el formulario actual (autenticación con Google, campos manuales, lógica de inserción en base de datos)
- Insertar el widget inline de Calendly directamente en la sección `#citas`
- Mantener el diseño visual de la sección (gradiente, título, subtítulo, decoraciones)
- El widget se cargará con el script oficial de Calendly (`assets.calendly.com/assets/external/widget.js`)

### 2. Agregar Calendly también en la página SEM (/lp)
- Agregar un botón "Agendar Cita" en la página SEM que abre Calendly en modo popup
- Esto complementa los botones de WhatsApp y llamada existentes

### 3. Sistema existente de citas
- El panel de administración y la sección "Mis Citas" se mantienen intactos para historial interno y gestión clínica
- Solo cambia la forma en que los pacientes agendan desde la landing page

---

## Detalles Técnicos

### Archivo: `src/components/landing/AppointmentForm.tsx`
- Reescribir el componente para renderizar el widget inline de Calendly
- Usar `useEffect` para cargar el script de Calendly dinámicamente
- El widget se mostrará dentro de un contenedor con altura fija (~700px)
- Se eliminarán las dependencias de autenticación, formulario y lógica de base de datos para este componente
- Se mantienen los elementos decorativos (MedicalCrosses, DotPattern, gradiente)

### Archivo: `index.html`
- Agregar el CSS de Calendly en el `<head>`: `https://assets.calendly.com/assets/external/widget.css`

### Archivo: `src/vite-env.d.ts`
- Agregar declaración de tipo para `window.Calendly` para evitar errores de TypeScript

### Archivo: `src/components/sem/SEMHero.tsx`
- Agregar un botón secundario "Agendar Cita Online" que abre Calendly en popup usando `Calendly.initPopupWidget()`

