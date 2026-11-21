# SampledHead Editor — Hoja de proyecto

Familia de apps de **Sampled Head**. **Versión actual:** 1.19 (21-11-2026) ·
**Web:** https://sampledhead-dot.github.io/sampledhead-editor/ · **Repo:** sampledhead-dot/sampledhead-editor

## Descripción
Editor de audio y masterización en el navegador (PWA) y en Windows/Mac/Android (envoltorio de SH-apps): recorta, limpia,
separa stems con IA, analiza acordes y tempo, pone marcadores y exporta (WAV/MP3, lote, secciones). Bilingüe ES/EN.

## Arquitectura
- `index.html` — toda la app. Estado en `S` (audio `S.L/S.R`, `S.sr`, selección `S.a/S.b`, cursor, marcadores `S.mk`,
  historial `S.hist/S.hp` con `pushHist(label)` / `restore(h)`). Vista: `s2x/x2s`, `S.vs` (inicio), `S.spp` (muestras por píxel).
- Pestañas: Editor, Máster (cadena EQ, compresor, multibanda, exciter, cinta, imager, maximizer; 424 presets), Grabar,
  Importar, Stems (htdemucs_6s con onnxruntime-web), Análisis, Acordes, Exportar, Lote.
- Proyectos `.shproj` (audio + máster + selección + marcadores + metadatos + portada + stems). Desde 1.19 hay biblioteca «Mis proyectos»: IndexedDB `shed-projects` (almacén `meta` con nombre, fecha, duración, tamaño y mini-onda; almacén `data` con el Blob .shproj), `PL` en el código; entra en la copia `.shdatos` (sh-core 1.2.2: `OWN.editor.idb`).
- `sh-core.js` — base común (bandeja «⇄ Apps», «Enviar a…», modelos compartidos, copia `.shdatos`). Se edita solo en
  `SH-apps/sh-core` y se reparte con `node sh-core/sync.js`.
- Puente antiguo con el sampler: IndexedDB `sh-bridge` (`toEditor` / `toSampler`), WAV 24 bit.
- Idioma: diccionarios en `#i18ndata` (`x` exactos, `f` fragmentos, `r` regex). Todo texto nuevo necesita su entrada.
- `sw.js` — caché `shed-<versión>`; conserva LAME, ORT y `sh-models-v1`; solo borra sus propias cachés.

## Historial
- **1.19** (21-11-2026): **«Mis proyectos»**: 💾 guarda por defecto dentro de la app (nombre, versión ligera, y casilla para descargar además un .shproj; avisa si el nombre ya existe y lo sustituye); 📂 abre la lista (Abrir, Renombrar, Descargar, Borrar con confirmación, Abrir archivo…, Guardar el actual). **Arreglo Android:** el selector de archivos tenía `accept=".shproj"` y no mostraba los proyectos; ahora no filtra por extensión. sh-core 1.2.2 (cambio de una línea: `editor.idb=['shed-projects']`; hay que hacerlo también en `SH-apps/sh-core`).
- **1.18** (19-11-2026): **marcadores arrastrables** desde su bandera en la regla (se puede deshacer: «Mover marcador»;
  un toque en la bandera lleva el cursor); **informe de error .txt** automático (`window.onerror`, promesas, máx. 3 por
  sesión) y botón **Informe** con la versión en la barra inferior.
- **1.17** (19-11-2026): conexión con todas las apps (sh-core): «⇄ Apps», bandeja compartida, carpeta Documentos/SampledHead
  en Windows/Mac, modelos compartidos; copia `.shdatos`.
- **1.16c**: direcciones del sampler y del editor por defecto. **1.16b**: ES/EN y guía. **1.16**: conexión con el sampler,
  Análisis y Acordes, quitar ruido y silencios, marcadores con exportación de secciones, Stems de la selección, LUFS, tonalidad.
- **1.15**: modo de poca memoria (Stems). **1.14**: pestaña Stems. **1.11–1.13**: Extraer, `.shproj`, lote, bloqueos de inicio/fin.

## Reglas permanentes
- Entrega `sampledhead-editor-vN.zip` con carpeta, standalone de un archivo y esta hoja; versión en la guía y en la barra inferior.
- Informe de error .txt automático y botón manual.
- Al cambiar de versión: `window.__VER`, `gverE` (ES/EN), comentario de cabecera y `sw.js` (`shed-<versión>`).
- Probar en Chrome headless y decir qué no se ha probado.

## Límites conocidos
- Stems con el modelo real no probado en el móvil del usuario (el error `Aborted()` de la 1.14 quedó mitigado, no confirmado).
- Acordes y tempo probados solo con audio sintético.
- Bloqueos de inicio/fin: comprobar a mano que el fin no pasa por detrás del inicio.
- Los nombres de los 424 presets de máster siguen en español (solo se traducen las categorías).
- Marcadores arrastrables (1.18): probados con ratón en Chrome headless; no probados con el dedo en un móvil real.
