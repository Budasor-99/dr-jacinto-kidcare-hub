

# Optimizar Panel Admin con Calendly

## Contexto
Con la integracion de Calendly, las pestanas "Calendario" y "Lista" del panel admin ya no reciben datos nuevos. Solo la pestana "Pacientes" sigue siendo funcional al 100%.

## Cambios Propuestos

### 1. Reemplazar pestana "Calendario" con widget de Calendly
- Eliminar el componente `AppointmentsCalendar` de la pestana
- Insertar un iframe/widget inline de Calendly que muestre tu agenda directamente
- Esto te permite ver, gestionar y modificar citas de Calendly sin salir del panel admin

### 2. Eliminar pestana "Lista" de citas
- Esta vista ya no aporta valor porque las citas nuevas no llegan a la tabla `appointments`
- Se elimina la pestana y todo el codigo asociado (filtros, tabla, stats cards de citas)

### 3. Simplificar las Stats Cards
- Eliminar las 4 tarjetas de estadisticas de citas (Total, Pendientes, Confirmadas, Completadas) que ya no reflejan datos reales
- Opcionalmente reemplazar con stats relevantes como "Total Pacientes" y "Controles este mes"

### 4. Limpiar rutas obsoletas
- Eliminar la ruta `/mis-citas` y el componente `MisCitas.tsx`
- Eliminar la ruta `/paciente/auth` y el componente `PatientAuth.tsx`
- Limpiar las importaciones en `App.tsx`

### 5. Limpiar navegacion
- Eliminar el enlace "Mis Citas" del header de la landing page si existe

## Resultado Final
El panel admin tendra dos pestanas:
1. **Calendario** - Widget de Calendly embebido para gestionar citas
2. **Pacientes** - Sistema de historias clinicas MSP (sin cambios)

---

## Detalles Tecnicos

### Archivo: `src/pages/Admin.tsx`
- Eliminar la importacion de `AppointmentsCalendar`
- Eliminar el state de `appointments`, `filterStatus`, `fetchAppointments`, `updateStatus`
- Eliminar las stats cards de citas
- Reemplazar `TabsContent value="calendar"` con un iframe de Calendly apuntando a `https://calendly.com/andresalazarcevallos99/30min`
- Eliminar `TabsContent value="list"` completamente
- Mantener `TabsContent value="patients"` intacto

### Archivo: `src/App.tsx`
- Eliminar importaciones de `MisCitas` y `PatientAuth`
- Eliminar las rutas `/mis-citas` y `/paciente/auth`

### Archivos a eliminar (o dejar sin uso)
- `src/pages/MisCitas.tsx`
- `src/pages/PatientAuth.tsx`
- `src/components/patient/RescheduleDialog.tsx`
- `src/components/admin/AppointmentsCalendar.tsx` (ya no se usa)

### Archivo: `src/components/landing/Header.tsx`
- Verificar y eliminar cualquier enlace a "Mis Citas" o "Portal Paciente"

