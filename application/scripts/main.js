const {app, BrowserWindow,session} = require('electron');
const path = require('path');
const os = require('os');
// const { default: installExtension } = require('electron-devtools-installer');

function newWindow(){
  const newWindow = new BrowserWindow({
    webPreferences:{
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration : true,
      enableRemoteModule: true,
      allowRunningInsecureContent: true
    }
  });
  newWindow.loadURL('https://www.linkedin.com/feed');
}



app.whenReady().then(() => {
  BrowserWindow.addExtension(__dirname+'/AdminAutoLiker').then((name) => console.log(`Added Extension:  ${name}`)).catch((err) => console.log('An error occurred: ', err));
  setTimeout(()=>{
    newWindow();
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


