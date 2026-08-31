# LectorApp · Florecillas — captura PENDIENTE (manual)

App React Native / Expo. No se pudo capturar automáticamente:

- `expo start --web` **crashea**: `react-native-web` + React 19.1
  (`Failed to set an indexed property [0] on 'CSSStyleDeclaration'`).
  Probado con react-dom 19.0.0 y 19.1.0 — mismo error.
- No hay Android SDK / emulador en esta máquina (la virtualización de firmware
  sí está disponible).

## Cómo capturar a mano

1. `cd C:\Remoto\LectorApp && npx expo start`
2. Abrir en Expo Go (dispositivo físico) o en un emulador Android.
3. Capturas necesarias (portrait):
   - Catálogo de libros (grid)
   - Pantalla de lectura con TTS activo (barra de progreso de narración)
   - Modo noche activado
   - Marcadores / preferencias
