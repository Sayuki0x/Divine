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
  wallet.stop();
  launchWallet(fileName, password);
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
  let walletMessage = blessed.text({
    parent: walletScreen,
    top: '1%',
    left: '0%',
    fg: 'white',
    tags: true
  });
  const [wallet, error] = WB.WalletBackend.openWalletFromFile(daemon, `${fileName}.wallet`, password);
  if(error) {
    walletMessage.setContent('Error opening wallet...\n' + error);
  } else {
    walletMessage.setContent(`{red-fg}{bold}${wallet.getPrimaryAddress()}{/}`);
  }

  let syncStatus = blessed.text({
    parent: walletScreen,
    top: '90%',
    fg: 'white',
    tags: true
  })
  screen.render();  

  refreshSync(syncStatus, wallet);
  setInterval(refreshSync.bind(null,syncStatus,wallet), 5000);

  

  // const primaryAddress = wallet.getPrimaryAddress();
};

function refreshSync(syncStatus, wallet) {
  syncStatus.setContent(`Synchronizing: ${wallet.getSyncStatus()[0]} / ${wallet.getSyncStatus()[2]}`);
}