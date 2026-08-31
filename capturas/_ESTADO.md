# Estado de capturas — ronda del 2026-08-31

Capturas de pantalla de los 16 proyectos del portfolio, agrupadas por proyecto.
Generadas de forma automatizada (Playwright para web, CDP sobre los binarios
Tauri, `expo start --web` para las apps RN, renders headless para PDFs/planillas).
Los backends dados de baja se cubrieron con **mock data local realista**.

Leyenda: ✅ hecho · 🟡 parcial · ⚠️ pendiente manual

| # | Proyecto | Carpeta | Shots | Estado | Notas |
|---|----------|---------|:---:|:---:|-------|
| 1 | CAJIX | `cajix/` | 13 | ✅ | login, dashboard (fiscal + privacidad), movimientos, turnos (agenda/calendario/config), superadmin (MRR / empresas / settings), reserva pública, reportes, equipo. Supabase caído → mock. |
| 2 | PlugToSell | `plugtosell/` | 7 | 🟡 | tienda demo compuesta (barra envío gratis + badges + trust) + previews de los 6 widgets. Falta la vista de la consola de GTM (requiere login a GTM). |
| 3 | AppSheet Silos | `appsheet-silos/` | 2 | ⚠️ | Es AppSheet (no-code). `portada.png` + `galeria1.png` del repo. Captura fina = entrar manual a la consola AppSheet. |
| 4 | GolLog | `gollog/` | 13 | ✅ | Frontend Vue **completado** (home, ligas, equipos, ficha de equipo, todos los partidos, **formulario de calificación**, registro, perfil) + Django admin poblado. Fixes commiteados y pusheados al repo. |
| 5 | DCA King | `dca-king/` | 9 | ✅ | DashboardDCA (dashboard/bot+órdenes/create-bot/API docs) + widget ComponenteBots embebido + dca-king-interface (login / monitor grid / historial de webhooks TradingView). |
| 6 | Aberturas Miño | `aberturas-mino/` | 7 | ✅ | catálogo, categoría, producto, carrito, admin (dashboard/productos/pedidos). Supabase caído → mock. |
| 7 | Burger House | — | — | — | ABANDONADO — ver `../ToDo.md`. |
| 8 | Lil PDF | `lil-pdf/` | 3 | ✅ | unir (cola de archivos), dividir (rango), organizar (thumbnails reales). App real corriendo con PDFs demo. |
| 9 | Slot Math Model | `slot-math-model/` | 3 | ✅ | terminal (theory_check + verify reproducible + simulación 400 sesiones / 80M giros) + Parsheet .xlsx con fórmulas + paytable. |
| 10 | GYMORA | `gymora/` | 8 | ✅ | kiosco idle, **kiosco ACCESO PERMITIDO (verde)**, login PIN, dashboard, alumnos, caja (cobro), reporte PDF de cierre de caja. |
| 11 | CVdeador | `cvdeador/` | 3 | ✅ | pantalla principal, ajustes (API key), CV HTML generado. Se actualizaron los modelos de Gemini y se agregó vista previa del CV (fixes pusheados). Capturas del resultado con mock. |
| 12 | LectorApp · Florecillas | `lectorapp-florecillas/` | 5 | ✅ | biblioteca, lectura, **TTS activo**, modo noche, índice + favoritos. Se arregló el crash de `react-native-web` (fix pusheado). Corre en web. |
| 13 | AirwiLens | `airwilens/` | 0 | ⚠️ | RN + servidor Python + cámara virtual. Necesita 2 dispositivos + una cámara real. Captura **manual** (ver `_PENDIENTE.md`). |
| 14 | AppPers | `apppers/` | 5 | ✅ | panel de los 3 módulos, cronómetro (clima real), anotador de precios (menú + lista con productos), seguimiento gym. Se agregó soporte web (fix pusheado). Geofencing/background siguen siendo solo nativos. |
| 15 | Comida Callejera | — | — | — | ABANDONADO — ver `../ToDo.md`. |
| 16 | AppCC | — | — | — | ABANDONADO — ver `../ToDo.md`. |

## Fixes aplicados y pusheados a los repos

- **GolLog** (`a25f2d3`): frontend Vue completo + auth por Token + serializer de
  calificaciones + migraciones faltantes de la app `partidos` + registros de admin.
- **CVdeador** (`7a04b7f`): modelos de Gemini vigentes + vista previa del CV generado
  (`ResultModal`) + comando `save_html_cv`.
- **LectorApp** (`11e8dfb`): fix del crash en web (`<Link asChild>` + style array).
- **AppPers** (`fb555bd`): soporte web (react-native-web + stub de mapas + wasm de sqlite).

## Repos: estado tras esta ronda

- **Actualizados con GitHub**: todos los de `Luguin8`. `CV-HTML` (−6) y
  `DashboardDCA` (−18) se pullearon.
- `dca-king-interface`: su remoto en GitHub ya no existe. Copia local intacta.
- **Clonados nuevos**: `GolLog`, `PlugToSell`.
- **Modificaciones locales revertidas** (no eran para commitear): AberturasMino,
  saas-backoffice, DashboardDCA, dca-king-interface, SlotsPython, `settings_local`
  de GolLog. Para re-correr GolLog: apuntar `settings_local.py` a sqlite y correr
  `seed_mock.py`.

## Toolchain instalada en la máquina para esta ronda

- JDK 17 (`C:\Android\jdk`), Android SDK + cmdline-tools (`C:\Android\sdk`),
  AVD `pixel_api34`. **El emulador x86_64 NO arranca**: requiere acelerador de
  hardware (AEHD/WHPX) y su instalación necesita permisos de administrador que
  este entorno no otorga. Las apps RN se capturaron por web.
