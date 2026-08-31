# ToDo — Portfolio

## Agrupar en un solo item: "Trabajos personales abandonados"

Cuando se retoque el portfolio, estos tres proyectos NO deben tener card propia.
Agruparlos en un único item (ej. "Trabajos personales abandonados" o
"Experimentos personales sin terminar"):

- **Comida Callejera** (`comidaCallejera`) — App RN + Firebase para descubrir
  puestos de comida callejera en un mapa. Abandonado.
- **Burger House** (`BurgerHouse`) — Web full-stack de comida rápida
  (Node + Express + SQLite + Vanilla JS). Abandonado.
- **AppCC** (`AppCC_Android`) — App Flutter privada para parejas. Abandonado.

Estos tres quedan excluidos de la ronda de capturas de pantalla.

---

## AppSheet Silos — captura manual

Es una app de **AppSheet** (no-code). No hay nada corrible localmente.
Hay que entrar manualmente desde el navegador a la consola de AppSheet y
sacar las capturas a mano:
- Vista principal con datos de stock reales
- Formulario de ingreso de lote
- Búsqueda bidireccional (resultado encontrado)
- Alert bot / reporte

En el repo `C:\Remoto\AppSheet` hay `portada.png` y `galeria1.png` que se
pueden usar como fallback provisorio.

## PlugToSell — vista GTM manual

Falta la captura de la consola de **Google Tag Manager** con los tags/triggers
de los 6 widgets (contenedor `GTM-WGWZXGKZ`). Requiere login a la cuenta de GTM.
El resto de PlugToSell tiene capturas (tienda demo compuesta + previews de widgets).

---

## Proyectos con backend CAÍDO — quitar botón "Ver proyecto"

Estos proyectos tienen su infra hosteada (Supabase / deploy) muerta o borrada.
Sus capturas se hicieron con **mock data local** (bypass de login, datos
inventados pero realistas). En el portfolio hay que **eliminar / ocultar el
botón "Ver proyecto en vivo"** para estos:

<!-- se completa a medida que se detectan -->
- **Aberturas Miño** — Supabase `osqsiquufpoeahbwerhi.supabase.co` no resuelve (borrado). Capturas con mock.
- **CAJIX** — Supabase `irqwesjnazqnrpbpjear.supabase.co` no resuelve (borrado). `cajix.site` carga el login pero NO autentica. Capturas con mock local. Revisar si conviene bajar cajix.site o el botón "Ver en vivo".

---

## Proyectos con frontend/estado incompleto (no bloquea capturas, pero revisar)

- **GolLog** — el frontend Vue tiene varias vistas sin terminar (stubs: "Todos los Partidos", "Mi Perfil", detalle de equipo, home). Además faltaba `axios.defaults.baseURL` en `main.js` y los modelos no estaban registrados en el admin de Django. Las capturas fuertes salieron del **admin de Django** (poblado con datos ficticios). Si se muestra en el portfolio, aclarar que es "backend + admin" o terminar el front.

- **CVdeador** — la integración con Gemini falla: los nombres de modelo del repo (`gemini-2.0-flash`, `gemini-1.5-flash`) ya no existen en la API. Hay que actualizar la lista de modelos en `src/components/SettingsModal.tsx` y probablemente el endpoint en `src-tauri/src/commands.rs`. Las capturas del CV generado se hicieron con mock.

---

## Capturas de pantalla

Carpeta de trabajo: `/capturas/` (ignorada por git).
Estructura: `capturas/<slug>/00-cover.png`, `01-...`, `02-...`

Estado por proyecto: ver `capturas/_ESTADO.md`.
