// Puente seguro entre el juego y la ventana de PC: pantalla completa, límite de FPS y salir
const {contextBridge,ipcRenderer}=require('electron');
const cfg=ipcRenderer.sendSync('cfg-get')||{};
contextBridge.exposeInMainWorld('pcApp',{
  setFullscreen:on=>ipcRenderer.send('full',!!on),
  fpsUnlocked:!!cfg.fpsUnlock,
  setFpsUnlock:on=>ipcRenderer.send('fps-unlock',!!on),  // guarda y reinicia la app
  quit:()=>ipcRenderer.send('quit'),
});
