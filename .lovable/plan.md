
# Plan: Agregar noindex a Landing Page SEM

## Objetivo
Evitar que la página `/lp` sea indexada por motores de búsqueda (Google, Bing) para mantenerla exclusiva para campañas de publicidad pagada.

---

## Implementación

### Archivo a Modificar
`src/pages/LandingSEM.tsx`

### Cambio
Agregar un `useEffect` que inserte dinámicamente la meta tag `robots` con valor `noindex, nofollow` cuando se carga la página:

```typescript
useEffect(() => {
  // Agregar meta noindex
  const meta = document.createElement('meta');
  meta.name = 'robots';
  meta.content = 'noindex, nofollow';
  document.head.appendChild(meta);

  // Limpiar al desmontar
  return () => {
    document.head.removeChild(meta);
  };
}, []);
```

---

## Resultado
- La página `/lp` no aparecerá en resultados de búsqueda de Google
- Solo será accesible mediante links directos de campañas publicitarias
- La página principal `/` seguirá siendo indexable normalmente
