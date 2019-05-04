   ///////////////////////////////////////////////////////////////
  //    Copyright ExtraHash 2019                               //
 //     Please see included LICENSE file for more details     //
///////////////////////////////////////////////////////////////

// requires
const WB = require('turtlecoin-wallet-backend');
const clipboardy = require('clipboardy');
const blessed = require('blessed');
const contrib = require('blessed-contrib');
let wallet;

// set daemon
const daemon = new WB.BlockchainCacheApi('blockapi.turtlepay.io', true);

// setup and configure screen instance
let screen = blessed.screen({
    smartCSR: true,
    title: 'DivineWallet v0.0.3'
});

// run the initial function
drawSplashScreen();

// draw the splash screen window
function drawSplashScreen() {

    // draw the navbar
    let navBar = blessed.box({
        top: 0,
        left: 0,
        width: '100%',
        height: '10%'
        // bg: 'black'
    })

    // draw the window
    let splashWindow = blessed.box({
        top: '10%',
        left: '0%',
        width: '100%',
        height: '100%',
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
        left: '97%',
        top: '0%',
        shrink: true,
        name: 'close',
        content: '(x)',
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
        height: '100%',
        tags: true,
        style: {
            fg: 'white',
            bg: 'black',
        }
    });

    // set text fields for start screen 
    let asciiArt = blessed.text({
        parent: splashText,
        top: '10%',
        left: 'center',
        width: '100%',
        fg: 'red',
        tags: true
    })
    let welcomeMessage = blessed.text({
        parent: splashText,
        top: '60%',
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

    splashWindow.focus();

    // render the screen
    screen.render();

    // keyboard commands for PRESS START
    splashWindow.key(['enter'], function(ch, key) {
            splashWindow.destroy();
            navBar.destroy();
            drawStartWindow();
    })

    splashWindow.key(['x'], function(ch, key) {
        return process.exit(0);
})

    // quit on top right button
    closeWalletButton.on('press', function() {
        return process.exit(0);
    })

    splashWindow.on('click', function() {
        splashWindow.destroy();
        navBar.destroy();
        drawStartWindow();
    })

}

// draw the start win   dow
function drawStartWindow() {

    // draw the navbar
    let navBar = blessed.box({
        top: 0,
        left: 0,
        width: '100%',
        height: '10%',
        bg: 'black'
    })

    // draw the window
    let startWindow = blessed.box({
        top: '10%',
        left: '0%',
        width: '100%',
        height: '100%',
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
        top: '30%',
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
        left: '97%',
        top: '0%',
        shrink: true,
        name: 'close',
        content: '(x)',
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

    // focus window and render screen
    startWindow.focus();
    screen.render();

    // o keypress
    startWindow.key(['o'], function(ch, key) {
        startWindow.destroy();
        navBar.destroy();
        drawOpenWindow();
    })

    // c keypress
    startWindow.key(['c'], function(ch, key) {
        startWindow.destroy();
        navBar.destroy();
        drawCreateWindow();
    })  

    startWindow.key(['x'], function(ch, key) {
        startWindow.destroy();
        navBar.destroy();
        drawSplashScreen();
    })

    // if open button is pressed
    openWalletButton.on('press', function() {
        startWindow.destroy();
        navBar.destroy();
        drawOpenWindow();
    }); 

    // if create button is pressed
    createWalletButton.on('press', function() {
        startWindow.destroy();
        navBar.destroy();
        drawCreateWindow();
    })

    // quit on top right button
    closeWalletButton.on('press', function() {
        startWindow.destroy();
        navBar.destroy();
        drawSplashScreen();
    })

    // initial render
    screen.render();
}

// draw the open window
function drawOpenWindow() {

    // draw the navbar
    let navBar = blessed.box({
        top: 0,
        left: 0,
        width: '100%',
        height: '10%',
        bg: 'black'
    })

    // draw the window
    let openWindow = blessed.box({
        top: '10%',
        left: '0%',
        width: '100%',
        height: '100%',
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
        left: '97%',
        top: '0%',
        shrink: true,
        name: 'close',
        content: '(x)',
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
        top: '20%',
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
            fg: 'grey'
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
        censor: true,
        height: 3,
        content: 'first',
        border: {
            type: 'line',
            fg: 'grey'
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
    fileName.focus();
    screen.render();

    // enter keypress
    openWindow.key(['enter'], function(ch, key) {
        openForm.submit();
        openWindow.destroy();
        navBar.destroy();
        screen.render();
    })  

    // enter keypress
    fileName.key(['enter'], function(ch, key) {
        openForm.submit();
        openWindow.destroy();
        navBar.destroy();
        screen.render();
    })  

    // enter keypress
    password.key(['enter'], function(ch, key) {
        openForm.submit();
        openWindow.destroy();
        navBar.destroy();
        screen.render();
    })  

    // x keypress
    openWindow.key(['x'], function(ch, key) {
        openWindow.destroy();
        navBar.destroy();
        drawSplashScreen();
    })

    // on submit button press
    openWalletButton.on('press', function() {
        openForm.submit();
        openWindow.destroy();
        navBar.destroy();
        screen.render();
    });

    // open form post handling
    openForm.on('submit', function(data) {
        drawWalletWindow(data.filename, data.password)
    });

    // quit on top right button
    closeWalletButton.on('press', function() {
        openWindow.destroy();
        drawSplashScreen();
    })


}

// draw the create window
function drawCreateWindow() {

    // draw the navbar
    let navBar = blessed.box({
        top: 0,
        left: 0,
        width: '100%',
        height: '10%',
        bg: 'black'
    })

    // draw the window
    let createWindow = blessed.box({
        top: '10%',
        left: '0%',
        width: '100%',
        height: '100%',
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
        left: '97%',
        top: '0%',
        shrink: true,
        name: 'close',
        content: '(x)',
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
        top: '20%',
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
            fg: 'grey'
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
        censor: true,
        height: 3,
        content: 'first',
        border: {
            type: 'line',
            fg: 'grey'
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
            left: 6,
            right: 6
        },
        left: 0,
        top: 8,
        shrink: true,
        name: 'openwallet',
        content: 'create wallet (enter)',
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
    createWalletButton.on('press', function() {
        createForm.submit();
        createWindow.destroy();
        navBar.destroy();
        screen.render();
    });

    // create form post handling
    createForm.on('submit', function(data) {
        createWallet(data.filename, data.password);
    });

    // quit on top right button
    closeWalletButton.on('press', function() {
        createWindow.destroy();
        drawSplashScreen();
    })

}

// draw the wallet window
function drawWalletWindow(fileName, password) {

    // draw the navbar
    let navBar = blessed.box({
        top: 0,
        left: 0,
        width: '100%',
        height: '10%',
        bg: 'black'
    })

    // draw the window
    let walletWindow = blessed.box({
        top: '10%',
        left: '0%',
        width: '100%',
        height: '100%',
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
        left: '97%',
        top: '0%',
        shrink: true,
        name: 'close',
        content: '(x)',
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
            left: 1,
            right: 1
        },
        left: 0,
        top: '0%',
        shrink: true,
        name: 'wallet',
        content: '(w)allet',
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
            left: 0,
            right: 0
        },
        left: 11,
        top: '0%',
        shrink: true,
        name: 'transfer',
        content: '(t)ransfer',
        style: {
            bg: 'black',
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
            left: 0,
            right: 0
        },
        left: 22,
        top: '0%',
        shrink: true,
        name: 'settings',
        content: '(s)ettings',
        style: {
            bg: 'black',
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
        top: 0,
        left: 0,
        width: '50%',
        height: '100%',
        tags: true,
        border: {
            type: 'line',
            fg: 'white'
        },
        style: {
            fg: 'white',
            bg: 'black',
        }
    });

    // define error printer
    let errorPrinter = blessed.text({
        parent: leftColumn,
        top: '50%',
        left: '0%',
        fg: 'white',
        tags: true,
        // content: 'Error opening wallet...',
        style: {
            fg: 'white',
        }
    });

    // define and start the wallet
    const [wallet, error] = WB.WalletBackend.openWalletFromFile(daemon, `${fileName}.wallet`, password);
    if (error) {
        errorPrinter.setContent('Error opening wallet...');
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
            fg: 'grey',
            hover: {
                bg: 'black',
                fg: 'red'
            }
        }
    });

    // define the progress bar for sync
    let syncStatus = blessed.text({
        parent: leftColumn,
        top: '80%',
        left: 0,
        fg: 'white',
        tags: true
    });

    // define the wallet balance
    let walletBalance = blessed.text({
        parent: leftColumn,
        top: 5,
        left: '50%',
        fg: 'white',
        tags: true
    });

    let walletBalanceLabels = blessed.text({
        parent: leftColumn,
        top: 5,
        left: 0,
        fg: 'white',
        tags: true
    });

    walletBalanceLabels.setContent(
        '{bold}Available:{/}\n' +
        '{bold}{red-fg}Locked:{/}\n' +
        '{grey-fg}Total:{/}'
    );

    // print wallet address
    let walletBalanceData = wallet.getBalance();
    walletBalance.setContent(
        `{bold}${WB.prettyPrintAmount(walletBalanceData[0])}{/}\n` +
        `{bold}{red-fg}${WB.prettyPrintAmount(walletBalanceData[1])}{/}\n` +
        `{grey-fg}${WB.prettyPrintAmount(walletBalanceData[1] + walletBalanceData[0])}{/}`);

    // refresh the progress bar every second
    refreshSync(syncStatus, wallet, walletWindow);
    setInterval(refreshSync.bind(null, syncStatus, wallet, walletWindow), 1000);

    // define right column
    let rightColumn = blessed.box({
        parent: walletWindow,
        top: 0,
        left: '50%',
        width: '50%',
        height: '100%',
        tags: true,
        style: {
            fg: 'white',
            bg: 'black',
        }
    });

    let txData = wallet.getTransactions();
    let txArray = getRecentTransactions(txData)

    walletWindow.focus();
    screen.render();

    let transactionTable = contrib.table({ 
        parent: rightColumn,
        keys: true, 
        bg: 'black',
        fg: 'grey',
        selectedFg: 'white',
        selectedBg: 'black',
        interactive: true,
        label: 'Recent Transactions',
        width: '100%',
        height: '100%',
        border: {type: "line", fg: "white"},
        columnSpacing: 6,
        columnWidth: [18, 20] })

    transactionTable.setData(
    { headers: ['Time', 'Amount']
    , data: txArray})

    //allow control the table with the keyboard
    // transactionTable.focus()
    screen.render();

    // x keypress
    walletWindow.key(['x'], function(ch, key) {
        wallet.saveWalletToFile(`${fileName}.wallet`, password);
        wallet.stop();
        walletWindow.destroy();
        navBar.destroy();
        drawSplashScreen();
    })

    // quit on top right button
    closeWalletButton.on('press', function() {
        screen.render();
        wallet.saveWalletToFile(`${fileName}.wallet`, password);
        wallet.stop();
        walletWindow.destroy();
        navBar.destroy();
        drawSplashScreen();
    })

    // on transaction
    wallet.on('transaction', async function() {

        // define notification text
        let notificationText = blessed.text({
            parent: navBar,
            top: 0,
            left: '60%',
            fg: 'white',
            content: `New transaction found!`
        })

        // wait .5s and destroy the notification text
        await sleep(2000);
        notificationText.destroy();

        // get wallet data and set it in walletBalance
        let updateBalance = wallet.getBalance();
        walletBalance.setContent(
            `{bold}${WB.prettyPrintAmount(updateBalance[0])}{/}\n` +
            `{bold}{red-fg}${WB.prettyPrintAmount(updateBalance[1])}{/}\n` +
            `{grey-fg}${WB.prettyPrintAmount(updateBalance[1] + updateBalance[0])}{/}`);

        let updateTransactionList = wallet.getTransactions();
        
        const updateTxArray = getRecentTransactions(updateTransactionList);

        transactionTable.setData(
            { headers: ['Time', 'Amount']
            , data: updateTxArray})

        // render the screen
        screen.render();
    })

    // t keypress
    walletWindow.key(['t'], function(ch, key) {
        // some code
    })

    // t keypress
    walletWindow.key(['t'], function(ch, key) {
        // some code
    })

    // on addressbutton click
    addressButton.on('click', async function() {

        // copy to clipboard
        clipboardy.writeSync(addressString);

        // define notification text
        let notificationText = blessed.text({
            parent: navBar,
            top: 0,
            left: '60%',
            fg: 'grey',
            content: `Copied to clipboard!`
        })

        // wait .5s and destroy the notification text
        await sleep(500);
        notificationText.destroy();

    });

};

// create new wallet and launch it
function createWallet(fileName, password) {
    const wallet = WB.WalletBackend.createWallet(daemon);
    wallet.saveWalletToFile(`${fileName}.wallet`, password);
    wallet.stop();
    drawWalletWindow(fileName, password);
}

// refresh the sync bar
function refreshSync(syncStatus, wallet, walletScreen) {
    let syncBarFill = (wallet.getSyncStatus()[0] / wallet.getSyncStatus()[2] * 100).toFixed(0);
    syncStatus.setContent(`{bold}Synchronization:{/} ${wallet.getSyncStatus()[0]}/${wallet.getSyncStatus()[1]} ${syncBarFill}%`);
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
        top: '90%',
        left: '0%',
        filled: 0
    });
    progress.setProgress(syncBarFill);
    screen.render();
}

// convert atomic units to human readable amount
function humanReadable(amount) {
    return (amount / 100).toFixed(2);
}

// sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// get transactions list for recent transactions table
function getRecentTransactions(walletData) {
    let amountArray = [];
    for (const tx of walletData) {
        amountArray.push([convertTimestamp(tx.timestamp), humanReadable(tx.totalAmount())]);
    }
    return amountArray
}

// convert unix timestamp into human readable
function convertTimestamp(timestamp) {
    let d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
          yyyy = d.getFullYear(),
          mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
          dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
          hh = ('0' + d.getHours()).slice(-2),
          min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
          time;
      // ie: 2013-02-18, 16:35	
      time = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min;
      return time;
  }