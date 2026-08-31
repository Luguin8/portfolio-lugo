# AirwiLens (WebcamPro) — captura PENDIENTE (manual)

Único proyecto sin capturas automáticas. Sistema de 2 partes:
cliente React Native (Vision Camera) + servidor Python (Tkinter + OpenCV +
pyvirtualcam). No capturable sin hardware: necesita un teléfono físico con
cámara y la cámara virtual instalada en la PC.

## Cómo capturar a mano

- **Móvil** (`cd C:\Remoto\WebcamPro && npx expo start`):
  - Viewfinder de cámara activo con overlay de controles
  - Pantalla de conexión (código / IP del servidor)
  - Telemetría de batería visible
- **Escritorio**: correr el servidor Python y abrir OBS mostrando el feed como
  cámara virtual — captura de pantalla completa del sistema.
