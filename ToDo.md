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

## Proyectos con backend CAÍDO — quitar botón "Ver proyecto"

Su infra hosteada (Supabase) está borrada. Las capturas se hicieron con **mock
data local**. En el portfolio hay que **ocultar el botón "Ver proyecto en vivo"**:

- **Aberturas Miño** — Supabase `osqsiquufpoeahbwerhi.supabase.co` no resuelve.
- **CAJIX** — Supabase `irqwesjnazqnrpbpjear.supabase.co` no resuelve. `cajix.site`
  carga el login pero NO autentica. Conviene bajar el deploy o el botón "Ver en vivo".

---

## Capturas pendientes (manuales)

- **AppSheet Silos** — es no-code. Entrar a la consola de AppSheet y sacar:
  vista principal con stock, formulario de ingreso de lote, búsqueda
  bidireccional, alert bot. Fallback provisorio en `capturas/appsheet-silos/`
  (`portada.png` / `galeria1.png` del repo `C:\Remoto\AppSheet`).
- **PlugToSell** — falta la consola de **Google Tag Manager** con los tags/triggers
  de los 6 widgets (contenedor `GTM-WGWZXGKZ`). Requiere login a GTM.
- **AirwiLens** — necesita teléfono físico + cámara + cámara virtual. Ver
  `capturas/airwilens/_PENDIENTE.md`.

---

## Fixes ya aplicados y pusheados a los repos (esta ronda)

- **GolLog** (`a25f2d3`) — frontend Vue completado (home, todos los partidos con
  formulario de calificación, ficha de equipo, perfil) + auth por Token en la API
  + serializer de calificaciones + migraciones faltantes de la app `partidos`.
  Ya se puede mostrar como proyecto full-stack completo, no solo "backend + admin".
- **CVdeador** (`7a04b7f`) — modelos de Gemini actualizados (los viejos ya no
  existen) + vista previa del CV generado con opción de guardar.
- **LectorApp** (`11e8dfb`) — arreglado el crash en web (`<Link asChild>` + style array).
- **AppPers** (`fb555bd`) — soporte web (react-native-web + stub de mapas).

---

## Notas de capturas

- Carpeta `capturas/` (commiteada al repo). Estructura: `capturas/<slug>/00-*.png`.
- Estado detallado por proyecto: `capturas/_ESTADO.md`.
