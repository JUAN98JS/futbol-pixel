// Versión de PC: abre index.html en una ventana propia, a pantalla completa y con la tarjeta de video potente
const {app,BrowserWindow,Menu,ipcMain}=require('electron');
const path=require('path'),fs=require('fs');

// Ajustes que se aplican al arrancar (el límite de FPS no se puede cambiar con el juego abierto)
const cfgFile=path.join(app.getPath('userData'),'config.json');
let cfg={};try{cfg=JSON.parse(fs.readFileSync(cfgFile,'utf8'))}catch(_){}
if(cfg.fpsUnlock){app.commandLine.appendSwitch('disable-frame-rate-limit');app.commandLine.appendSwitch('disable-gpu-vsync')}
ipcMain.on('cfg-get',e=>{e.returnValue=cfg});
ipcMain.on('fps-unlock',(e,on)=>{cfg.fpsUnlock=!!on;try{fs.writeFileSync(cfgFile,JSON.stringify(cfg))}catch(_){}app.relaunch();app.exit(0)});

app.commandLine.appendSwitch('force_high_performance_gpu');  // portátiles: usar la GPU dedicada, no la integrada
app.commandLine.appendSwitch('ignore-gpu-blocklist');
app.commandLine.appendSwitch('autoplay-policy','no-user-gesture-required');  // sonido aunque se empiece con el control

app.whenReady().then(()=>{
  Menu.setApplicationMenu(null);
  const win=new BrowserWindow({width:1600,height:900,fullscreen:true,backgroundColor:'#0d1322',title:'Fútbol Pixel 26',
    webPreferences:{backgroundThrottling:false,preload:path.join(__dirname,'preload.js')}});
  win.loadFile(path.join(__dirname,'..','index.html'));
  ipcMain.on('full',(e,on)=>win.setFullScreen(on));  // ajuste "Pantalla completa" del menú
  ipcMain.on('quit',()=>app.quit());
  win.webContents.on('before-input-event',(e,i)=>{  // F11: pantalla completa / ventana
    if(i.type==='keyDown'&&i.key==='F11'){win.setFullScreen(!win.isFullScreen());e.preventDefault()}
  });
});
app.on('window-all-closed',()=>app.quit());
