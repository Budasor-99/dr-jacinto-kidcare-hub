

# Agregar meta noindex a la Thank You Page

## Resumen
Agregar la etiqueta `noindex, nofollow` a la pagina `/gracias`, igual que en la landing SEM (`/lp`). Esto evita que Google indexe la pagina de confirmacion, lo cual es correcto porque:
- Es una pagina post-conversion, no debe aparecer en resultados de busqueda
- Permite medir correctamente las conversiones sin trafico organico contaminando los datos

## Cambio

### Archivo: `src/pages/ThankYou.tsx`
- Agregar la misma logica de `noindex` que usa `LandingSEM.tsx` dentro del `useEffect` existente
- Se creara dinamicamente una etiqueta `<meta name="robots" content="noindex, nofollow">` al montar el componente
- Se eliminara al desmontar para no afectar otras paginas

El patron es identico al de `/lp`:
```typescript
useEffect(() => {
  trackEvent("appointment_booked", { page: "thank_you" });

  const meta = document.createElement('meta');
  meta.name = 'robots';
  meta.content = 'noindex, nofollow';
  document.head.appendChild(meta);

  return () => {
    document.head.removeChild(meta);
  };
}, []);
```
