const { app, BrowserWindow, screen } = require("electron")

const createWindow = () => {

  const primaryDisplay = screen.getPrimaryDisplay()
  const { width: monitorWidth, height: monitorHeight } = primaryDisplay.workAreaSize;

  const windowWidth = Math.round(monitorWidth * .8);
  const windowHeight = Math.round(monitorHeight * .7);

  console.info(`Monitor Resolution : ${monitorWidth} x ${monitorHeight}, Window Size: ${windowWidth} x ${windowHeight}`);

  const mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    center: true,
    show: false,
    title: "JXFR",
  });
  mainWindow.loadFile("./dist/index.html").then(() => {

    splash.close();
    mainWindow.center();
    mainWindow.show();
  })
  
  // and load the index.html of the app.
  var splash = new BrowserWindow({ 
    width: 500, 
    height: 300, 
    transparent: true, 
    frame: false, 
    alwaysOnTop: true 
  });
  
  splash.loadFile('./src/splash.html');
  splash.center();
  // setTimeout(function () {
  //   splash.close();
  //   mainWindow.center();
  //   mainWindow.show();
  // }, 800);
}

app.whenReady().then(() => {

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  });
});

app.on("window-all-closed", () => {
  app.quit();
});