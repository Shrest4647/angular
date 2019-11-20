import { app, BrowserWindow, screen, ipcMain, dialog, shell } from 'electron';
import * as windowStateKeeper from 'electron-window-state';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs-extra';

let win, workerWindow, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  let mainWindowState = windowStateKeeper({
    defaultWidth: size.width,
    defaultHeight: size.height
  });
  // Create the browser window.
  win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    backgroundColor: '#fff',
    icon: path.join(__dirname, 'build/icon/icon.png'),
    // frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }


  workerWindow = new BrowserWindow({ show: false });
  workerWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/worker.html'),
    protocol: 'file:',
    slashes: true
  }));

  workerWindow.on("closed", () => {
    workerWindow = undefined;
  });


  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;

    app.quit();
  });

}

try {

  // Print
  ipcMain.on('print', (event: any, content: any) => {
    // workerWindow.webContents.send('print', content);
    console.log(content);
    win.webContents.print({silent: false, printBackground: false});
  });

  ipcMain.on('readyToPrint', (event: any) => {
    workerWindow.webContents.print({ silent: false, printBackground: true });
  });

  // PrintPDF
  ipcMain.on('printPDF', (event: any, content: any) => {
    workerWindow.webContents.send('printPDF', content);
  });

  ipcMain.on('readyToPrintPDF', (event: any, safePath: string) => {
    workerWindow.webContents.printToPDF({}, function (error: any, data: any) {
      if (error) {
        throw error;
      }

      fs.writeFile(safePath, data, function (error: any) {
        if (error) {
          throw error;
        }

        shell.openItem(safePath);
      })
    })
  });


  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

