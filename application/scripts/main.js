const {app, BrowserWindow, electron} = require('electron')
const path = require('path')
const os = require('os');
const { default: installExtension } = require('electron-devtools-installer');

function newWindow(){
  const newWindow = new BrowserWindow({
    webPreferences:{
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration : true,
      enableRemoteModule: true,
      allowRunningInsecureContent: true
    }
  });
  newWindow.loadFile('application/pages/index.html');
}



app.whenReady().then(() => {
  installExtension('/AdminAutoLiker')
  .then((name) => console.log(`Added Extension:  ${name}`))
  .catch((err) => console.log('An error occurred: ', err));
  setTimeout(()=>{
    // newWindow();
    reloadWindow();
  },5000);

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// app.setLoginItemSettings({
//   openAtLogin: true

// })

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});


function reloadWindow(){
  const newWindow = new BrowserWindow({
    webPreferences:{
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration : true,
      enableRemoteModule: true,
      allowRunningInsecureContent: true
    }
  });
  newWindow.loadURL("https://www.linkedin.com/feed");
}

// function reloadWindow(){
//   const newWindow = electron.getCurrentWindow();
//   newWindow.loadURL("https://www.linkedin.com/feed");
// }


