let blessed = require('blessed');
const WB = require('turtlecoin-wallet-backend');
const daemon = new WB.BlockchainCacheApi('blockapi.turtlepay.io', true);

// Create a screen object.
let screen = blessed.screen({
  smartCSR: true
});

screen.title = 'DivineWallet v0.0.1';

// Create a box perfectly centered horizontally and vertically.
let box = blessed.box({
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

// Append our box to the screen.
screen.append(box);

// create the opening menu
let welcomeForm = blessed.form({
  parent: box,
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
    '███   ▄███ ███  ███    ███ ███  ███   ███   ███    ███ \n' +
    '████████▀  █▀    ▀██████▀  █▀    ▀█   █▀    ██████████\n'

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
    width: '30%',
    left: '0%',
    top: '70%',
    keys: true,
    vi: true
  });

  let openLabel = blessed.text({
    parent: openForm,
    top: '10%',
    left: '0%',
    fg: 'white',
    content: 'Please enter your wallet filename...'
  });

  let fileName = blessed.textbox({
    parent: openForm,
    name: 'filename',
    top: '40%',
    left: '0%',
    mouse: true,
    inputOnFocus: true,
    height: 3,
    content: 'first',
    border: {
      type: 'line',
      fg: 'white'
    },
    fg: 'white',
  });

  let openFileButton = blessed.button({
    parent: openForm,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
      left: 1,
      right: 1
    },
    left: '0%',
    top: '85%',
    shrink: true,
    name: 'openfile',
    content: 'Open File (enter)',
    style: {
      bg: 'black',
      fg: 'white',
      hover: {
        bg: 'red'
      }
    }
  });

  screen.render();

  openFileButton.on('press', function () {
    box.destroy();
    screen.render();
  });
});



// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0);
});

// Render the screen.
screen.render();

function createWallet() {
  const wallet = WB.WalletBackend.createWallet(daemon);
  wallet.saveWalletToFile('test.wallet', 'test');
}

function humanReadable(amount) {
  return (amount / 100).toFixed(2);
}