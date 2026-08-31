# AppPers — captura PENDIENTE (manual)

App React Native / Expo. No se pudo capturar automáticamente:

- Mismo crash de `react-native-web` + React 19 que LectorApp.
- Los módulos centrales (geofencing con Foreground Service, background tasks,
  cronómetro con OpenWeatherMap) solo corren en Android nativo.

## Cómo capturar a mano

1. `cd C:\Remoto\AppPers && npx expo start` → Expo Go / emulador Android.
2. Capturas necesarias (portrait):
   - Dashboard de los 3 módulos
   - Módulo gimnasio: geofencing activo con mapa y radio de 100m
   - Cronómetro con temperatura del clima integrada
   - Tracker de precios con lista de supermercado
