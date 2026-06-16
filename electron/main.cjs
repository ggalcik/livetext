const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const devUrl = process.env.ELECTRON_START_URL;
  const distPath = path.join(__dirname, "..", "dist", "index.html");

  if (devUrl) {
    win.loadURL(devUrl);
    return;
  }

  if (fs.existsSync(distPath)) {
    win.loadFile(distPath);
    return;
  }

  win.loadURL("data:text/plain,Build the app first with npm run build");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
