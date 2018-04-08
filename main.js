const {app, BrowserWindow} = require('electron');
const path = require('path')
const url = require('url')
const WallpaperManager = require('./src/wallpaper_manager.js')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win


const AutoLaunch = require('auto-launch');

const appAutoLauncher = new AutoLaunch({
	name: 'Walllpaper',
});

appAutoLauncher.isEnabled().then(function(isEnabled){
	if (isEnabled) {
	    return;
	}
	appAutoLauncher.enable();
})
.catch(function(err){});

function runApp () {
  WallpaperManager.run();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', runApp)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    runApp()
  }
})
