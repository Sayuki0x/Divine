const WB = require('turtlecoin-wallet-backend');
const daemon = new WB.BlockchainCacheApi('blockapi.turtlepay.io', true);
let blessed = require('blessed');
let screen = blessed.screen({
  smartCSR: true
});

screen.title = 'DivineWallet v0.0.1';

drawSplashScreen();

async function drawSplashScreen() {

  let splashBox = blessed.box({
    top: 'center',
    left: 'center',
    width: '100%',
    height: '100%',
    tags: true,
    style: {
      fg: 'white',
      bg: 'black',
    }
  });

  let navBar = blessed.box({
    parent: splashBox,
    top: '0%',
    left: '0%',
    width: '100%',
    height: '10%',
    bg: 'black'
  })

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


  let splashScreen = blessed.box({
    parent: splashBox,
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

  screen.append(navBar);
  screen.append(splashScreen);

  let asciiArt = blessed.text({
    parent: splashScreen,
    top: 0,
    left: 'center',
    width: '100%',
    fg: 'red',
    tags: true
  })

  let welcomeMessage = blessed.text({
    parent: splashScreen,
    top: 15,
    left: 'center',
    fg: 'white',
    tags: true
  });

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
  
  screen.key(['enter'], function (ch, key) {
    splashScreen.destroy();
    drawStartMenu();
  })

  // quit on top right button
  closeWalletButton.on('press', function () {
    return process.exit(0);
  })

  splashScreen.on('click', function () {
    splashScreen.destroy();
    drawStartMenu();
  })

  screen.render();
}

async function drawStartMenu() {
  // Create a welcomeScreen
  let startMenu = blessed.box({
    top: 'center',
    left: 'center',
    width: '100%',
    height: '100%',
    tags: true,
    style: {
      fg: 'white',
      bg: 'black',
    }
  });

  // Append our welcomeScreen to the screen.
  screen.append(startMenu);

  // create the opening menu
  let startMenuForm = blessed.form({
    parent: startMenu,
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

  let closeWalletButton = blessed.button({
    parent: startMenu,
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

  let openWalletButton = blessed.button({
    parent: startMenuForm,
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

  let createWalletButton = blessed.button({
    parent: startMenuForm,
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

  let importWalletButton = blessed.button({
    parent: startMenuForm,
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
    startMenu.destroy();
    drawOpenMenuForm();
  });

  createWalletButton.on('press', function () {
    startMenu.destroy();
    drawCreateMenuForm();
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

function drawOpenMenuForm() {

  let navBar = blessed.box({
    top: '0%',
    left: '0%',
    width: '100%',
    height: '10%',
    bg: 'black'
  })

  let openMenuForm = blessed.box({
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

  screen.append(openMenuForm);
  screen.append(navBar);

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

  let openForm = blessed.form({
    parent: openMenuForm,
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

  let openLabel = blessed.text({
    parent: openForm,
    top: 0,
    left: 0,
    fg: 'white',
    content: 'Filename:'
  });

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

  let openPasswordLabel = blessed.text({
    parent: openForm,
    top: 4,
    left: 0,
    fg: 'white',
    content: 'Password:'
  });

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

  screen.render();

  openWalletButton.on('press', function () {
    openForm.submit();
    openMenuForm.destroy();
    screen.render();
  });

  // quit on top right button
  closeWalletButton.on('press', function () {
    return process.exit(0);
  })

  openForm.on('submit', function (data) {
    launchWallet(data.filename, data.password)
  });
}

function drawCreateMenuForm() {

  let navBar = blessed.box({
    top: '0%',
    left: '0%',
    width: '100%',
    height: '10%',
    bg: 'black'
  })

  let createMenuForm = blessed.box({
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

  screen.append(createMenuForm);
  screen.append(navBar);

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

  let createForm = blessed.form({
    parent: createMenuForm,
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

  let createLabel = blessed.text({
    parent: createForm,
    top: 0,
    left: 0,
    fg: 'white',
    content: 'Filename:'
  });

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

  let openPasswordLabel = blessed.text({
    parent: createForm,
    top: 4,
    left: 0,
    fg: 'white',
    content: 'Password:'
  });

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

  screen.render();

  createWalletButton.on('press', function () {
    createForm.submit();
    createMenuForm.destroy();
    navBar.destroy();
    screen.render();
  });

  // quit on top right button
  closeWalletButton.on('press', function () {
    return process.exit(0);
  })

  createForm.on('submit', function (data) {
    createWallet(data.filename, data.password);
  });
}

function launchWallet(fileName, password) {

  // do something
  let walletScreen = blessed.box({
    top: 'center',
    left: 'center',
    width: '100%',
    height: '100%',
    tags: true,
    style: {
      fg: 'white',
      bg: 'black',
    }
  });
  screen.append(walletScreen);

  let navBar = blessed.box({
    parent: walletScreen,
    top: '0%',
    left: '0%',
    width: '100%',
    height: '10%',
    bg: 'black'
  })

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

  let transferNavButton = blessed.button({
    parent: navBar,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
      left: 1,
      right: 1
    },
    left: 10,
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

  let settingsNavButton = blessed.button({
    parent: navBar,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
      left: 1,
      right: 1
    },
    left: 20,
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

  let walletAddressInfo = blessed.box({
    parent: walletScreen,
    top: '10%',
    left: '0%',
    width: '50%',
    height: '90%',
    tags: true,
    style: {
      fg: 'white',
      bg: 'black',
    }

  });


  let walletAddress = blessed.text({
    parent: walletAddressInfo,
    top: '0%',
    left: '0%',
    fg: 'white',
    tags: true,
    style: {
      fg: 'red',
    }
  });
  const [wallet, error] = WB.WalletBackend.openWalletFromFile(daemon, `${fileName}.wallet`, password);
  if (error) {
    walletAddress.setContent('Error opening wallet...\n' + error);
  } else {
    walletAddress.setContent(`{red-fg}{bold}${wallet.getPrimaryAddress()}{/}`);
  }

  wallet.start();

  let syncStatus = blessed.text({
    parent: walletScreen,
    top: '95%',
    fg: 'white',
    tags: true
  })

  let walletBalance = blessed.text({
    parent: walletScreen,
    top: '30%',
    fg: 'white',
    tags: true
  })

  function ready() {
    screen.render()
  }

  ready();
  screen.render();

  refreshSync(syncStatus, walletBalance, wallet, walletScreen);
  setInterval(refreshSync.bind(null, syncStatus, walletBalance, wallet, walletScreen), 1000);



  // const primaryAddress = wallet.getPrimaryAddress();
};

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

function createWallet(fileName, password) {
  const wallet = WB.WalletBackend.createWallet(daemon);
  wallet.saveWalletToFile(`${fileName}.wallet`, password);
  wallet.stop();
  launchWallet(fileName, password);
}