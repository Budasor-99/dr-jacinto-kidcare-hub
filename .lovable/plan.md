
# Plan: Implementar Google Analytics 4

## Measurement ID
`G-M16WB3CEP5`

---

## Archivos a Crear/Modificar

| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `index.html` | Modificar | Agregar script de gtag.js |
| `src/vite-env.d.ts` | Modificar | Agregar tipos para gtag |
| `src/lib/analytics.ts` | **Crear** | Funciones helper para eventos |
| `src/hooks/usePageTracking.ts` | **Crear** | Hook para tracking automático de rutas |
| `src/App.tsx` | Modificar | Integrar hook de tracking |

---

## Implementación

### 1. index.html
Agregar script de GA4 después del Meta Pixel existente:
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-M16WB3CEP5"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-M16WB3CEP5');
</script>
```

### 2. src/vite-env.d.ts
Extender la interfaz Window para incluir gtag:
```typescript
gtag: (
  command: 'config' | 'event' | 'js' | 'set',
  targetId: string | Date,
  params?: Record<string, any>
) => void;
dataLayer: any[];
```

### 3. src/lib/analytics.ts (nuevo)
Funciones helper para tracking:
- `trackPageView(path, title)` - Vistas de página
- `trackEvent(eventName, params)` - Eventos genéricos
- `trackAppointmentRequest()` - Solicitud de cita (generate_lead)
- `trackWhatsAppClick()` - Click en WhatsApp (contact)
- `trackPhoneClick()` - Click en teléfono (contact)

### 4. src/hooks/usePageTracking.ts (nuevo)
Hook que detecta cambios de ruta usando `useLocation` de react-router-dom y envía eventos `page_view` automáticamente.

### 5. src/App.tsx
Agregar componente `PageTracker` dentro de `BrowserRouter` para activar el tracking automático.

---

## Resultado
- Tracking automático de todas las páginas visitadas
- Funciones listas para agregar eventos de conversión en formularios y botones
- Compatible con el Meta Pixel existente
