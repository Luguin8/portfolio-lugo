# Estado de capturas — ronda del 2026-08-31

Carpeta de trabajo con las capturas de los 16 proyectos del portfolio.
Generadas de forma automatizada (Playwright + CDP sobre los binarios Tauri +
renders headless). Todos los backends caídos se cubrieron con **mock data
local realista** (ver `../ToDo.md`).

Leyenda: ✅ hecho · 🟡 parcial · ⚠️ pendiente manual

| # | Proyecto | Carpeta | Shots | Estado | Notas |
|---|----------|---------|:---:|:---:|-------|
| 1 | CAJIX | `cajix/` | 13 | ✅ | login, dashboard (fiscal + privacidad), movimientos, turnos (agenda/calendario/config), superadmin (panel MRR / empresas / settings), reserva pública, reportes, equipo. Backend Supabase caído → mock. |
| 2 | PlugToSell | `plugtosell/` | 7 | 🟡 | tienda demo compuesta (barra envío gratis + badges + trust) + previews de los 6 widgets. **Falta**: vista de GTM (requiere login). |
| 3 | AppSheet Silos | `appsheet-silos/` | 2 | ⚠️ | Es AppSheet (no-code). Se usan `portada.png` + `galeria1.png` del repo. Captura fina = entrar manual a la consola AppSheet. |
| 4 | GolLog | `gollog/` | 11 | 🟡 | frontend Vue (home/ligas/equipos/login/registro) + **Django admin poblado** (51 partidos, 25 calificaciones). El front Vue está incompleto (varias vistas son stubs). |
| 5 | DCA King | `dca-king/` | 9 | ✅ | DashboardDCA (dashboard/bot+órdenes/create-bot/API docs) + widget ComponenteBots embebido + dca-king-interface (login / monitor grid / historial de webhooks TradingView). |
| 6 | Aberturas Miño | `aberturas-mino/` | 7 | ✅ | catálogo, categoría, producto, carrito, admin (dashboard/productos/pedidos). Supabase caído → mock. |
| 7 | Burger House | — | — | — | ABANDONADO — ver `../ToDo.md`. |
| 8 | Lil PDF | `lil-pdf/` | 3 | ✅ | unir (cola de archivos), dividir (rango), organizar (thumbnails reales). App real corriendo con PDFs demo. |
| 9 | Slot Math Model | `slot-math-model/` | 3 | ✅ | terminal (theory_check + verify reproducible + simulación 400 sesiones / 80M giros) + Parsheet .xlsx con fórmulas + paytable. |
| 10 | GYMORA | `gymora/` | 8 | ✅ | kiosco idle, **kiosco ACCESO PERMITIDO (verde)**, login PIN, dashboard, alumnos, caja (cobro), reporte PDF de cierre de caja. |
| 11 | CVdeador | `cvdeador/` | 3 | 🟡 | pantalla principal (IA conectada + vacante), ajustes (API key), CV HTML generado. La API Gemini real falla con nombres de modelo nuevos → mock. |
| 12 | LectorApp · Florecillas | `lectorapp-florecillas/` | 0 | ⚠️ | RN/Expo. Crashea en web (`react-native-web` + React 19 — `CSSStyleDeclaration indexed setter`). Necesita **emulador Android o dispositivo**. No hay Android SDK en esta máquina. |
| 13 | AirwiLens | `airwilens/` | 0 | ⚠️ | RN + servidor Python + cámara virtual. Necesita 2 dispositivos + cámara. Captura **manual**. |
| 14 | AppPers | `apppers/` | 0 | ⚠️ | RN/Expo. Mismo crash de web que LectorApp + módulos de geofencing/background que solo corren nativos. Captura **manual en dispositivo**. |
| 15 | Comida Callejera | — | — | — | ABANDONADO — ver `../ToDo.md`. |
| 16 | AppCC | — | — | — | ABANDONADO — ver `../ToDo.md`. |

## Repos: estado tras esta ronda

- **Actualizados con GitHub**: todos los de `Luguin8`. Estaban al día salvo
  `CV-HTML` (−6) y `DashboardDCA` (−18), ya pulleados.
- `dca-king-interface`: su remoto en GitHub ya no existe. Queda la copia local.
- **Clonados nuevos**: `GolLog`, `PlugToSell` (faltaban en `C:\Remoto`).
- **Modificaciones revertidas** al terminar: AberturasMino, saas-backoffice,
  DashboardDCA, dca-king-interface, SlotsPython (parsheet).
- **GolLog** queda con un setup local funcional NO commiteado (`.venv`,
  `settings_local.py`→sqlite, `main.js`+baseURL, `admin.py`, `seed_mock.py`,
  `db.sqlite3`). Documentado en `../ToDo.md`.
