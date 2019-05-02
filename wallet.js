let blessed = require('blessed');
const WB = require('turtlecoin-wallet-backend');
const daemon = new WB.BlockchainCacheApi('blockapi.turtlepay.io', true);

let screen = blessed.screen({
  smartCSR: true
});

screen.title = 'DivineWallet v0.0.1';

init();

async function init() {
// Create a screen object.


// Create a welcomeScreen perfectly centered horizontally and vertically.
let welcomeScreen = blessed.box({
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
screen.append(welcomeScreen);

// create the opening menu
let welcomeForm = blessed.form({
  parent: welcomeScreen,
  keys: true,
  left: 'center',
  top: 'center',
  width: '100%',
  height: '100%',
  bg: 'black',
  fg: 'red',
  content:

    '████████▄   ▄█   ▄█    █▄   ▄█  ███▄▄▄▄      ▄████████\n' +
    '███   ▀███ ███  ███    ███ ███  ███▀▀▀██▄   ███    ███\n' +
    '███    ███ ███▌ ███    ███ ███▌ ███   ███   ███    █▀  \n' +
    '███    ███ ███▌ ███    ███ ███▌ ███   ███  ▄███▄▄▄     \n' +
    '███    ███ ███▌ ███    ███ ███▌ ███   ███ ▀▀███▀▀▀     \n' +
    '███    ███ ███  ███    ███ ███  ███   ███   ███    █▄  \n' +
    '███   ▄███ ███   ██    ██  ███  ███   ███   ███    ███ \n' +
    '████████▀  █▀     ▀████▀   █▀    ▀█   █▀    ██████████\n'

});

let welcomeMessage = blessed.text({
  parent: welcomeForm,
  top: '45%',
  left: '0%',
  fg: 'white',
  tags: true
});

welcomeMessage.setContent('Welcome to {red-fg}{bold}Divine.{/} Please select an option...');

let closeWalletButton = blessed.button({
  parent: welcomeForm,
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
  parent: welcomeForm,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: '0%',
  top: '50%',
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
  parent: welcomeForm,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: '0%',
  top: '55%',
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
  parent: welcomeForm,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: '0%',
  top: '60%',
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

  let openForm = blessed.form({
    parent: welcomeForm,
    width: '50%',
    left: '25%',
    top: '50%',
    keys: true,
    vi: true
  });

  let openLabel = blessed.text({
    parent: openForm,
    top: '0%',
    left: '0%',
    fg: 'white',
    content: 'Filename:'
  });

  let fileName = blessed.textbox({
    parent: openForm,
    name: 'filename',
    top: '15%',
    left: '0%',
    width: '100%',
    mouse: true,
    inputOnFocus: true,
    keys: true,
    height: 3,
    content: 'first',
    border: {
      type: 'line',
      fg: 'white'
    },
    fg: 'white',
  });

  let openPasswordLabel = blessed.text({
    parent: openForm,
    top: '35%',
    left: '0%',
    fg: 'white',
    content: 'Password:'
  });

  let password = blessed.textbox({
    parent: openForm,
    name: 'password',
    top: '45%',
    left: '0%',
    width: '100%',
    mouse: true,
    inputOnFocus: true,
    keys: true,
    height: 3,
    content: 'first',
    border: {
      type: 'line',
      fg: 'white'
    },
    fg: 'black',
  });

  let openWalletButton = blessed.button({
    parent: openForm,
    mouse: true,
    keys: true,
    shrink: true,
    tags: true,
    padding: {
      left: 1,
      right: 1
    },
    left: '0%',
    top: '70%',
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
    welcomeScreen.destroy();
    screen.render();
  });


  openForm.on('submit', function (data) {
    launchWallet(data.filename, data.password)
  });

});

// if create button is pressed
createWalletButton.on('press', function () {

  let createForm = blessed.form({
    parent: welcomeForm,
    width: '50%',
    left: '25%',
    top: '50%',
    keys: true,
    vi: true
  });

  let createLabel = blessed.text({
    parent: createForm,
    top: '0%',
    left: '0%',
    fg: 'white',
    content: 'Filename:'
  });

  let fileName = blessed.textbox({
    parent: createForm,
    name: 'filename',
    top: '15%',
    left: '0%',
    width: '100%',
    mouse: true,
    inputOnFocus: true,
    keys: true,
    height: 3,
    content: 'first',
    border: {
      type: 'line',
      fg: 'white'
    },
    fg: 'white',
  });

  let createPasswordLabel = blessed.text({
    parent: createForm,
    top: '35%',
    left: '0%',
    fg: 'white',
    content: 'Password:'
  });

  let password = blessed.textbox({
    parent: createForm,
    name: 'password',
    top: '45%',
    left: '0%',
    width: '100%',
    mouse: true,
    inputOnFocus: true,
    keys: true,
    height: 3,
    content: 'first',
    border: {
      type: 'line',
      fg: 'white'
    },
    fg: 'black',
  });

  let createWalletButton = blessed.button({
    parent: createForm,
    mouse: true,
    keys: true,
    shrink: true,
    tags: true,
    padding: {
      left: 1,
      right: 1
    },
    left: '0%',
    top: '70%',
    shrink: true,
    name: 'createwallet',
    content: 'create wallet (enter)',
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
    welcomeScreen.destroy();
    screen.render();
  });


  createForm.on('submit', function (data) {
    createWallet(data.filename, data.password)
  });

});

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


function createWallet(fileName, password) {
  const wallet = WB.WalletBackend.createWallet(daemon);
  wallet.saveWalletToFile(`${fileName}.wallet`, password);
  launchWallet(fileName, password);
  wallet.stop();
}

function humanReadable(amount) {
  return (amount / 100).toFixed(2);
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
    left:'0%',
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
  if(error) {
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

  screen.render();  

  refreshSync(syncStatus, walletBalance, wallet, walletScreen);
  setInterval(refreshSync.bind(null, syncStatus, walletBalance, wallet, walletScreen), 1000);

  

  // const primaryAddress = wallet.getPrimaryAddress();
};

function refreshSync(syncStatus, walletBalance, wallet, walletScreen) {
  let syncBarFill = (wallet.getSyncStatus()[0]/wallet.getSyncStatus()[2]*100).toFixed(0);
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

function return0IfNotNumber(value) {
  if (value === NaN) {
    return 0;
  } else {
    return value;
  }
}