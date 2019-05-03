   ///////////////////////////////////////////////////////////////
  //    Copyright ExtraHash 2019                               //
 //     Please see included LICENSE files for more details    //
///////////////////////////////////////////////////////////////

// requires
const WB = require('turtlecoin-wallet-backend');
let blessed = require('blessed');
const clipboardy = require('clipboardy');

// set daemon
const daemon = new WB.BlockchainCacheApi('blockapi.turtlepay.io', true);

// setup and configure screen instance
let screen = blessed.screen({
  smartCSR: true,
  title: 'DivineWallet v0.0.2'
});

// run the initial function
drawSplashScreen();

// splash screen code
function drawSplashScreen() {

  // draw the navbar
  let navBar = blessed.box({
    top: '0%',
    left: '0%',
    width: '100%',
    height: '10%',
    bg: 'black'
  })

  // draw the window
  let splashWindow = blessed.box({
    top: 'center',
    left: 'center',
    width: '100%',
    height: '90%',
    tags: true,
    style: {
      fg: 'white',
      bg: 'black',
    }
  });

  // append the areas
  screen.append(navBar);
  screen.append(splashWindow);

  // render the X button
  let closeWalletButton = blessed.button({
    parent: navBar,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
      left: 1,
      right: 1
    },
    left: '97%',
    top: '0%',
    shrink: true,
    name: 'close',
    content: 'X',
    style: {
      bg: 'black',
      fg: 'red',
      hover: {
        bg: 'red',
        fg: 'white'
      }
    }
  })

  // set ascii art column
  let splashText = blessed.box({
    parent: splashWindow,
    top: 'center',
    left: 'center',
    width: 55,
    height: '90%',
    tags: true,
    style: {
      fg: 'white',
      bg: 'black',
    }
  });

  // set text fields for start screen 
  let asciiArt = blessed.text({
    parent: splashText,
    top: 0,
    left: 'center',
    width: '100%',
    fg: 'red',
    tags: true
  })
  let welcomeMessage = blessed.text({
    parent: splashText,
    top: 15,
    left: 'center',
    fg: 'white',
    tags: true
  });

  // set the content of the text fields
  asciiArt.setContent(
    '\n████████▄   ▄█   ▄█    █▄   ▄█  ███▄▄▄▄      ▄████████\n' +
    '███   ▀███ ███  ███    ███ ███  ███▀▀▀██▄   ███    ███\n' +
    '███    ███ ███▌ ███    ███ ███▌ ███   ███   ███    █▀  \n' +
    '███    ███ ███▌ ███    ███ ███▌ ███   ███  ▄███▄▄▄     \n' +
    '███    ███ ███▌ ███    ███ ███▌ ███   ███ ▀▀███▀▀▀     \n' +
    '███    ███ ███  ███    ███ ███  ███   ███   ███    █▄  \n' +
    '███   ▄███ ███   ██    ██  ███  ███   ███   ███    ███ \n' +
    '████████▀  █▀     ▀████▀   █▀    ▀█   █▀    ██████████\n'
  )
  welcomeMessage.setContent('{bold}PRESS START{/}');

  // Quit on Escape, q, or Control-C.
  screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
  });
  
  // quit on top right button
  closeWalletButton.on('press', function () {
    return process.exit(0);
  })

  // keyboard commands for PRESS START
  screen.key(['enter'], function (ch, key) {
    splashWindow.destroy();
    navBar.destroy();
    drawStartWindow();
  })
  splashWindow.on('click', function () {
    splashWindow.destroy();
    navBar.destroy();
    drawStartWindow();
  })

  // render the screen
  screen.render();
}

function drawStartWindow() {

  // draw the navbar
  let navBar = blessed.box({
    top: '0%',
    left: '0%',
    width: '100%',
    height: '10%',
    bg: 'black'
  })  

  // Create a opening menu window
  let startWindow = blessed.box({
    top: 'center',
    left: 'center',
    width: '100%',
    height: '90%',
    tags: true,
    style: {
      fg: 'white',
      bg: 'black',
    }
  });

  // Append our welcomeScreen to the screen.
  screen.append(navBar);
  screen.append(startWindow);

  // create the opening menu
  let startForm = blessed.form({
    parent: startWindow,
    keys: true,
    left: 'center',
    top: 'center',
    width: 15,
    height: 5,
    bg: 'black',
    fg: 'red',
    border: {
      type: 'line',
      fg: 'white'
    }
  });

  // define the close button
  let closeWalletButton = blessed.button({
    parent: navBar,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
      left: 1,
      right: 1
    },
    left: '97%',
    top: '0%',
    shrink: true,
    name: 'close',
    content: 'X',
    style: {
      bg: 'black',
      fg: 'red',
      hover: {
        bg: 'red',
        fg: 'white'
      }
    }
  })

  // define the "open wallet" button
  let openWalletButton = blessed.button({
    parent: startForm,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
      left: 2,
      right: 5
    },
    left: 0,
    top: 0,
    shrink: true,
    name: 'open',
    content: '(o)pen',
    style: {
      bg: 'black',
      fg: 'white',
      hover: {
        bg: 'red'
      }
    }
  });

  // define the "create wallet" button
  let createWalletButton = blessed.button({
    parent: startForm,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
      left: 2,
      right: 3
    },
    left: 0,
    top: 1,
    shrink: true,
    name: 'create',
    content: '(c)reate',
    style: {
      bg: 'black',
      fg: 'white',
      hover: {
        bg: 'red'
      }
    }
  });

  // define the "import wallet" button
  let importWalletButton = blessed.button({
    parent: startForm,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
      left: 2,
      right: 3
    },
    left: 0,
    top: 2,
    shrink: true,
    name: 'import',
    content: '(i)mport',
    style: {
      bg: 'black',
      fg: 'white',
      hover: {
        bg: 'red'
      }
    }
  });

  // if open button is pressed
  openWalletButton.on('press', function () {
    startWindow.destroy();
    navBar.destroy();
    drawOpenWindow();
  });

  // if create button is pressed
  createWalletButton.on('press', function () {
    startWindow.destroy();
    navBar.destroy();
    drawCreateWindow();
  })

  // Quit on Escape, q, or Control-C.
  screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
  });

  // quit on top right button
  closeWalletButton.on('press', function () {
    return process.exit(0);
  })

  // initial render
  screen.render();
}

function drawOpenWindow() {

  // draw the navbar
  let navBar = blessed.box({
    top: '0%',
    left: '0%',
    width: '100%',
    height: '10%',
    bg: 'black'
  })

  // draw the window
  let openWindow = blessed.box({
    top: 'center',
    left: 'center',
    width: '100%',
    height: '90%',
    tags: true,
    style: {
      fg: 'white',
      bg: 'black',
    }
  });

  // append the elements to the screen
  screen.append(openWindow);
  screen.append(navBar);

  //  define close wallet button
  let closeWalletButton = blessed.button({
    parent: navBar,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
      left: 1,
      right: 1
    },
    left: '97%',
    top: '0%',
    shrink: true,
    name: 'close',
    content: 'X',
    style: {
      bg: 'black',
      fg: 'red',
      hover: {
        bg: 'red',
        fg: 'white'
      }
    }
  })

  // define "open wallet" info form
  let openForm = blessed.form({
    parent: openWindow,
    keys: true,
    left: 'center',
    top: 'center',
    width: 35,
    height: 11,
    bg: 'black',
    fg: 'red',
    border: {
      type: 'line',
      fg: 'white'
    }
  });

  // define filename textbox label
  let openLabel = blessed.text({
    parent: openForm,
    top: 0,
    left: 0,
    fg: 'white',
    content: 'Filename:'
  });

  // define filename textbox
  let fileName = blessed.textbox({
    parent: openForm,
    name: 'filename',
    top: 1,
    left: 0,
    width: 33,
    mouse: true,
    inputOnFocus: true,
    keys: true,
    height: 3,
    content: 'first',
    border: {
      type: 'line',
      fg: 'red'
    },
    fg: 'white',
  });

  // define password textbox label
  let openPasswordLabel = blessed.text({
    parent: openForm,
    top: 4,
    left: 0,
    fg: 'white',
    content: 'Password:'
  });

  // defind password textbox
  let password = blessed.textbox({
    parent: openForm,
    name: 'password',
    top: 5,
    left: 0,
    width: 33,
    mouse: true,
    inputOnFocus: true,
    keys: true,
    height: 3,
    content: 'first',
    border: {
      type: 'line',
      fg: 'red'
    },
    fg: 'white',
  });

  // define submit button
  let openWalletButton = blessed.button({
    parent: openForm,
    mouse: true,
    keys: true,
    shrink: true,
    tags: true,
    padding: {
      left: 7,
      right: 7
    },
    left: 0,
    top: 8,
    shrink: true,
    name: 'openwallet',
    content: 'open wallet (enter)',
    style: {
      bg: 'black',
      fg: 'white',
      hover: {
        bg: 'red'
      }
    }
  });

  // render the screen
  screen.render();

  // on submit button press
  openWalletButton.on('press', function () {
    openForm.submit();
    openWindow.destroy();
    navBar.destroy();
    screen.render();
  });

  // open form post handling
  openForm.on('submit', function (data) {
    drawWalletWindow(data.filename, data.password)
  });

  // quit on top right button
  closeWalletButton.on('press', function () {
    return process.exit(0);
  })
}

function drawCreateWindow() {

  // draw the navbar
  let navBar = blessed.box({
    top: '0%',
    left: '0%',
    width: '100%',
    height: '10%',
    bg: 'black'
  })

  // draw the window
  let createWindow = blessed.box({
    top: 'center',
    left: 'center',
    width: '100%',
    height: '90%',
    tags: true,
    style: {
      fg: 'white',
      bg: 'black',
    }
  });

  // append elements to screen instance
  screen.append(createWindow);
  screen.append(navBar);

  // define close wallet buton
  let closeWalletButton = blessed.button({
    parent: navBar,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
      left: 1,
      right: 1
    },
    left: '97%',
    top: '0%',
    shrink: true,
    name: 'close',
    content: 'X',
    style: {
      bg: 'black',
      fg: 'red',
      hover: {
        bg: 'red',
        fg: 'white'
      }
    }
  })

  // define open wallet form
  let createForm = blessed.form({
    parent: createWindow,
    keys: true,
    left: 'center',
    top: 'center',
    width: 35,
    height: 11,
    bg: 'black',
    fg: 'red',
    border: {
      type: 'line',
      fg: 'white'
    }
  });

  // define filename textbox label
  let createLabel = blessed.text({
    parent: createForm,
    top: 0,
    left: 0,
    fg: 'white',
    content: 'Filename:'
  });

  // define filename textbox
  let fileName = blessed.textbox({
    parent: createForm,
    name: 'filename',
    top: 1,
    left: 0,
    width: 33,
    mouse: true,
    inputOnFocus: true,
    keys: true,
    height: 3,
    content: 'first',
    border: {
      type: 'line',
      fg: 'red'
    },
    fg: 'white',
  });

  // define password textbox label
  let openPasswordLabel = blessed.text({
    parent: createForm,
    top: 4,
    left: 0,
    fg: 'white',
    content: 'Password:'
  });

  // define password textbox
  let password = blessed.textbox({
    parent: createForm,
    name: 'password',
    top: 5,
    left: 0,
    width: 33,
    mouse: true,
    inputOnFocus: true,
    keys: true,
    height: 3,
    content: 'first',
    border: {
      type: 'line',
      fg: 'red'
    },
    fg: 'white',
  });

  // define create form submit button
  let createWalletButton = blessed.button({
    parent: createForm,
    mouse: true,
    keys: true,
    shrink: true,
    tags: true,
    padding: {
      left: 7,
      right: 7
    },
    left: 0,
    top: 8,
    shrink: true,
    name: 'openwallet',
    content: 'open wallet (enter)',
    style: {
      bg: 'black',
      fg: 'white',
      hover: {
        bg: 'red'
      }
    }
  });

  // render the screen
  screen.render();

  // on create wallet button press
  createWalletButton.on('press', function () {
    createForm.submit();
    createWindow.destroy();
    navBar.destroy();
    screen.render();
  });

  // create form post handling
  createForm.on('submit', function (data) {
    createWallet(data.filename, data.password);
  });

  // quit on top right button
  closeWalletButton.on('press', function () {
    return process.exit(0);
  })

}

function drawWalletWindow(fileName, password) {

  // set the navbar
  let navBar = blessed.box({
    top: '0%',
    left: '0%',
    width: '100%',
    height: '10%',
    bg: 'black'
  })

  // set the window
  let walletWindow = blessed.box({
    top: 'center',
    left: 'center',
    width: '100%',
    height: '90%',
    tags: true,
    style: {
      fg: 'white',
      bg: 'black',
    }
  });

  // append the elements
  screen.append(walletWindow);
  screen.append(navBar);

  // render the X button
  let closeWalletButton = blessed.button({
    parent: navBar,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
      left: 1,
      right: 1
    },
    left: '97%',
    top: '0%',
    shrink: true,
    name: 'close',
    content: 'X',
    style: {
      bg: 'black',
      fg: 'red',
      hover: {
        bg: 'red',
        fg: 'white'
      }
    }
  })

  // define wallet button
  let walletNavButton = blessed.button({
    parent: navBar,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
      left: 2,
      right: 2
    },
    left: 0,
    top: '0%',
    shrink: true,
    name: 'wallet',
    content: 'wallet',
    style: {
      bg: 'red',
      fg: 'white',
      hover: {
        bg: 'red',
        fg: 'white'
      }
    }
  })

  // define transfers button
  let transferNavButton = blessed.button({
    parent: navBar,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
      left: 1,
      right: 1
    },
    left: 11,
    top: '0%',
    shrink: true,
    name: 'transfer',
    content: 'transfer',
    style: {
      bg: 'grey',
      fg: 'white',
      hover: {
        bg: 'red',
        fg: 'white'
      }
    }
  })

  // define settings button
  let settingsNavButton = blessed.button({
    parent: navBar,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
      left: 1,
      right: 1
    },
    left: 22,
    top: '0%',
    shrink: true,
    name: 'settings',
    content: 'settings',
    style: {
      bg: 'grey',
      fg: 'white',
      hover: {
        bg: 'red',
        fg: 'white'
      }
    }
  })

  // define left column
  let leftColumn = blessed.box({
    parent: walletWindow,
    top: '10%',
    left: '0%',
    width: '50%',
    height: '100%',
    tags: true,
    style: {
      fg: 'white',
      bg: 'black',
    }
  });

  // define wallet address
  let errorPrinter = blessed.text({
    parent: leftColumn,
    top: '0%',
    left: '0%',
    fg: 'white',
    tags: true,
    style: {
      fg: 'red',
    }
  });

  // define and start the wallet
  const [wallet, error] = WB.WalletBackend.openWalletFromFile(daemon, `${fileName}.wallet`, password);
  if (error) {
    errorPrinter.setContent('Error opening wallet...\n' + error);
  } 
  wallet.start();

  // get the wallet address
  const addressString = wallet.getPrimaryAddress();

  // define the address button
  let addressButton = blessed.button({
  parent: leftColumn,
  mouse: false,
  keys: true,
  shrink: true,
  left: 0,
  top: 0,
  shrink: true,
  name: 'address',
  content: addressString,
  style: {
    bg: 'black',
    fg: 'white',
    hover: {
      bg: 'black',
      fg: 'red'
    }
  }
}) 

  // define the progress bar for sync
  let syncStatus = blessed.text({
    parent: walletWindow,
    top: '100%',
    fg: 'white',
    tags: true
  })

  // define the wallet balance
  let walletBalance = blessed.text({
    parent: walletWindow,
    top: '30%',
    fg: 'white',
    tags: true
  })

  // render the screen
  screen.render();

  // refresh the progress bar every second
  refreshSync(syncStatus, walletBalance, wallet, walletWindow);
  setInterval(refreshSync.bind(null, syncStatus, walletBalance, wallet, walletWindow), 1000);

  // Quit on Escape, q, or Control-C.
  screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
  });
  
  // quit on top right button
  closeWalletButton.on('press', function () {
    return process.exit(0);
  })

  addressButton.on('press'), function() {
    clipboardy.write('testing lol');
  }

};

function createWallet(fileName, password) {
  const wallet = WB.WalletBackend.createWallet(daemon);
  wallet.saveWalletToFile(`${fileName}.wallet`, password);
  wallet.stop();
  drawWalletWindow(fileName, password);
}

function refreshSync(syncStatus, walletBalance, wallet, walletScreen) {
  let syncBarFill = (wallet.getSyncStatus()[0] / wallet.getSyncStatus()[2] * 100).toFixed(0);
  let walletBalanceData = wallet.getBalance();
  syncStatus.setContent(`{bold}Synchronization:{/} ${syncBarFill}%`);
  walletBalance.setContent(`Unlocked Balance:    {bold}${humanReadable(walletBalanceData[0])} TRTL{/}\n` +
    `Locked Balance:      {bold}{red-fg}${humanReadable(walletBalanceData[1])} TRTL{/}\n` +
    `Total Balance:       ${humanReadable(walletBalanceData[1] + walletBalanceData[0])} TRTL`)
  let progress = blessed.progressbar({
    parent: walletScreen,
    style: {
      fg: 'red',
      bg: 'default',
      bar: {
        bg: 'default',
        fg: 'red'
      },
      border: {
        fg: 'default',
        bg: 'default'
      }
    },
    ch: ':',
    width: '100%',
    height: 1,
    top: '98%',
    left: '0%',
    filled: 0
  });
  progress.setProgress(syncBarFill);
  screen.render();
}

function humanReadable(amount) {
  return (amount / 100).toFixed(2);
}