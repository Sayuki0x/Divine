///////////////////////////////////////////////////////////////
//    Copyright ExtraHash 2019                              //
//    Please see included LICENSE file for more details    //
////////////////////////////////////////////////////////////

// imports
import WB = require('turtlecoin-wallet-backend');
import clipboardy = require('clipboardy');
import blessed = require('blessed');
import contrib = require('blessed-contrib');
import fs from 'fs';

let walletLogStream = fs.createWriteStream(`divinewallet.log`, {
    flags: 'a'
});
let wallet;

// set daemon
const daemon = new WB.BlockchainCacheApi('blockapi.turtlepay.io', true);

// setup and configure screen instance
let screen = blessed.screen({
    smartCSR: true,
    title: 'DivineWallet v0.1.1'
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
    })

    // draw the window
    let splashWindow = blessed.box({
        top: '10%',
        left: '0%',
        width: '100%',
        height: '100%',
        style: {
            fg: 'white'
        }
    });

    // focus the window
    splashWindow.focus();

    // on click for splashwindow
    splashWindow.on('click', function() {
        splashWindow.destroy();
        navBar.destroy();
        drawStartWindow();
    })

    // keyboard commands for PRESS START
    splashWindow.key(['enter'], function(ch, key) {
        splashWindow.destroy();
        navBar.destroy();
        drawStartWindow();
    })

    // x command
    splashWindow.key(['x'], function(ch, key) {
        return process.exit(0);
    })

    // append the areas
    screen.append(navBar);
    screen.append(splashWindow);

    // render the X button
    let closeWalletButton = blessed.button({
        parent: navBar,
        mouse: true,
        shrink: true,
        left: '97%',
        top: '0%',
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

    // quit on top right button
    closeWalletButton.on('press', function() {
        return process.exit(0);
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

    // render the screen
    screen.render();

}

// draw the start window
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
        style: {
            fg: 'white',
            bg: 'black',
        }
    });

    // focus the window
    startWindow.focus();

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

    // Append our welcomeScreen to the screen.
    screen.append(navBar);
    screen.append(startWindow);

    // create the opening menu
    let startForm = blessed.form({
        parent: startWindow,
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
        shrink: true,
        left: '97%',
        top: '0%',
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


    // quit on top right button
    closeWalletButton.on('press', function() {
        startWindow.destroy();
        navBar.destroy();
        drawSplashScreen();
    })

    // define the "open wallet" button
    let openWalletButton = blessed.button({
        parent: startForm,
        mouse: true,
        shrink: true,
        padding: {
            left: 2,
            right: 5
        },
        left: 0,
        top: 0,
        content: '(o)pen',
        style: {
            bg: 'black',
            fg: 'white',
            hover: {
                bg: 'red'
            }
        }
    });

    // if open button is pressed
    openWalletButton.on('press', function() {
        startWindow.destroy();
        navBar.destroy();
        drawOpenWindow();
    });

    // define the "create wallet" button
    let createWalletButton = blessed.button({
        parent: startForm,
        mouse: true,
        shrink: true,
        padding: {
            left: 2,
            right: 3
        },
        left: 0,
        top: 1,
        content: '(c)reate',
        style: {
            bg: 'black',
            fg: 'white',
            hover: {
                bg: 'red'
            }
        }
    });

    // if create button is pressed
    createWalletButton.on('press', function() {
        startWindow.destroy();
        navBar.destroy();
        drawCreateWindow();
    })

    // define the "import wallet" button
    let importWalletButton = blessed.button({
        parent: startForm,
        mouse: true,
        shrink: true,
        padding: {
            left: 2,
            right: 3
        },
        left: 0,
        top: 2,
        content: '(i)mport',
        style: {
            bg: 'black',
            fg: 'white',
            hover: {
                bg: 'red'
            }
        }
    });

    // render screen
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
        style: {
            fg: 'white',
            bg: 'black',
        }
    });

    openWindow.focus();

    openWindow.on('click', function() {
        screen.focusPop();
        openWindow.focus();
    });

    // enter keypress

    openWindow.key(['enter'], function(ch, key) {
        openForm.submit();
        openWindow.destroy();
        navBar.destroy();
    })


    // x keypress
    openWindow.key(['x'], function(ch, key) {
        openWindow.destroy();
        navBar.destroy();
        drawSplashScreen();
    })

    // append the elements to the screen
    screen.append(openWindow);
    screen.append(navBar);

    //  define close wallet button
    let closeWalletButton = blessed.button({
        parent: navBar,
        mouse: true,
        shrink: true,
        left: '97%',
        top: '0%',
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

    // quit on top right button
    closeWalletButton.on('press', function() {
        openWindow.destroy();
        navBar.destroy();
        drawSplashScreen();
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

    // open form post handling
    openForm.on('submit', function(data) {
        drawWalletWindow(data.filename, data.password)
    });

    // define filename textbox label
    let openLabel = blessed.text({
        parent: openForm,
        keys: true,
        top: 0,
        left: 0,
        fg: 'white',
        content: 'Filename:'
    });

    // define filename textbox
    let fileName = blessed.textbox({
        parent: openForm,
        name: 'filename',
        mouse: true,
        keys: true,
        vi: false,
        top: 1,
        left: 0,
        width: 33,
        inputOnFocus: true,
        height: 3,
        content: 'first',
        border: {
            type: 'line',
            fg: 'grey'
        },
        fg: 'white',
    });

    // pop focus on textbox click
    fileName.on('click', function() {
        screen.focusPop();
        screen.render();
    });

    // enter keypress
    fileName.key(['enter'], function(ch, key) {
        screen.focusPop();
        openForm.submit();
        openWindow.destroy();
        navBar.destroy();
    })

    fileName.on('blur', function() {
        screen.focusPop();
    })

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
        mouse: true,
        keys: true,
        vi: false,
        top: 5,
        left: 0,
        width: 33,
        inputOnFocus: true,
        censor: true,
        height: 3,
        content: 'first',
        border: {
            type: 'line',
            fg: 'grey'
        },
        fg: 'white',
    });

    // pop focus on textbox click
    password.on('click', function() {
        screen.focusPop();
    });

    // enter keypress
    password.key(['enter'], function(ch, key) {
        screen.focusPop();
        openForm.submit();
        openWindow.destroy();
        navBar.destroy();
        screen.render();
    })

    fileName.on('blur', function() {
        screen.focusPop();
    })

    // define submit button
    let openWalletButton = blessed.button({
        parent: openForm,
        mouse: true,
        shrink: true,
        padding: {
            left: 7,
            right: 7
        },
        left: 0,
        top: 8,
        content: 'open wallet (enter)',
        style: {
            bg: 'black',
            fg: 'white',
            hover: {
                bg: 'red'
            }
        }
    });

    // on submit button press
    openWalletButton.on('press', function() {
        screen.focusPop();
        openForm.submit();
        openWindow.destroy();
        navBar.destroy();
    });

    // render the screen
    fileName.focus();
    screen.render();

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
        style: {
            fg: 'white',
            bg: 'black',
        }
    });

    // focus the window
    createWindow.focus();

    // pop focus on window click
    createWindow.on('click', function() {
        screen.focusPop();
        createWindow.focus();
    });

    // enter keypress
    createWindow.key(['enter'], function(ch, key) {
        createForm.submit();
        createWindow.destroy();
        navBar.destroy();
    })

    // exit on x keypress
    createWindow.key('x', function() {
        createWindow.destroy();
        drawSplashScreen();
    })

    // append elements to screen instance
    screen.append(createWindow);
    screen.append(navBar);

    // define close wallet buton
    let closeWalletButton = blessed.button({
        parent: navBar,
        mouse: true,
        shrink: true,
        left: '97%',
        top: '0%',
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

    // quit on top right button
    closeWalletButton.on('press', function() {
        createWindow.destroy();
        drawSplashScreen();
    })

    // define open wallet form
    let createForm = blessed.form({
        parent: createWindow,
        keys: true,
        left: 'center',
        top: '20%',
        mouse: true,
        width: 35,
        height: 11,
        bg: 'black',
        fg: 'red',
        border: {
            type: 'line',
            fg: 'white'
        }
    });

    // create form post handling
    createForm.on('submit', function(data) {
        createWallet(data.filename, data.password);
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
        mouse: true,
        keys: true,
        top: 1,
        left: 0,
        width: 33,
        inputOnFocus: true,
        vi: false,
        height: 3,
        content: 'first',
        border: {
            type: 'line',
            fg: 'grey'
        },
        fg: 'white',
    });

    // focus on the textbox
    fileName.focus();

    // pop focus on click
    fileName.on('click', function() {
        screen.focusPop();
    });

    // define password textbox label
    let createPasswordLabel = blessed.text({
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
        mouse: true,
        top: 5,
        left: 0,
        width: 33,
        inputOnFocus: true,
        vi: false,
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

    // pop focus on click
    password.on('click', function() {
        screen.focusPop();
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
        content: 'create wallet (enter)',
        style: {
            bg: 'black',
            fg: 'white',
            hover: {
                bg: 'red'
            }
        }
    });

    // on create wallet button press
    createWalletButton.on('press', function() {
        screen.focusPop();
        createForm.submit();
        createWindow.destroy();
        navBar.destroy();
    });

    // render the screen
    screen.render();

}

// draw the wallet window
function drawWalletWindow(fileName, password) {

    ///////////////////////////////////////////////////////////////////
    // WALLET CODE
    ///////////////////////////////////////////////////////////////////

    // delete log file if currently present
    if (fs.existsSync(`${fileName}.log`)) {
        fs.unlinkSync(`${fileName}.log`);
    };

    // define and start the wallet
    const [wallet, error] = WB.WalletBackend.openWalletFromFile(daemon, `${fileName}.wallet`, password);
    if (error) {
        logFile(error);
    }

    // configure logging
    wallet.setLogLevel(WB.LogLevel.DEBUG);
    wallet.setLoggerCallback((prettyMessage, message, level, categories) => {
        let logStream = fs.createWriteStream(`${fileName}.log`, {
            flags: 'a'
        });
        logStream.write(prettyMessage + '\n');
    });

    // start the wallet
    wallet.start();

    // get transaction data
    const txData = wallet.getTransactions();
    const txArray = getRecentTransactions(txData)

    // get the wallet address
    const addressString = wallet.getPrimaryAddress();

    ///////////////////////////////////////////////////////////////////
    // UI CODE
    ///////////////////////////////////////////////////////////////////

    // draw all of the windows
    let navBar = blessed.box({
        top: 0,
        left: 0,
        width: '100%',
        height: '10%',
        bg: 'black'
    })

    let transferWindow = blessed.box({
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

    transferWindow.on('click', function() {
        screen.focusPop();
        transferWindow.focus();
    })

    // t keypress
    transferWindow.key(['s'], function(ch, key) {
        screen.focusPop();
        settingsWindow.setFront();
        settingsWindow.focus();
        screen.render();
    })

    transferWindow.key(['w'], function(ch, key) {
        // draw the window
        screen.focusPop();
        walletWindow.setFront();
        walletWindow.focus();
        screen.render();
    })

    // t keypress
    transferWindow.key(['t'], function(ch, key) {
        screen.focusPop();
        transferWindow.setFront();
        addressInput.focus();
        screen.render();
    })

    let settingsWindow = blessed.box({
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

    // t keypress
    settingsWindow.key(['t'], function(ch, key) {
        screen.focusPop();
        transferWindow.setFront();
        addressInput.focus();
        screen.render();
    })

    // s keypress
    settingsWindow.key(['s'], function(ch, key) {
        screen.focusPop();
        settingsWindow.setFront();
        settingsWindow.focus();
        screen.render();
    })

    // w keypress
    settingsWindow.key(['w'], function(ch, key) {
        // draw the window
        screen.focusPop();
        walletWindow.setFront();
        walletWindow.focus();
        screen.render();
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

    // x keypress
    walletWindow.key(['x'], function(ch, key) {
        wallet.saveWalletToFile(`${fileName}.wallet`, password);
        wallet.stop();
        walletWindow.destroy();
        navBar.destroy();
        drawSplashScreen();
    })

    // t keypress
    walletWindow.key(['t'], function(ch, key) {
        screen.focusPop();
        transferWindow.setFront();
        addressInput.focus();
        screen.render();
    })

    // t keypress
    walletWindow.key(['s'], function(ch, key) {
        screen.focusPop();
        settingsWindow.setFront();
        settingsWindow.focus();
        screen.render();
    })

    walletWindow.key(['w'], function(ch, key) {
        // draw the window
        screen.focusPop();
        walletWindow.setFront();
        walletWindow.focus();
        screen.render();
    })

    // append the elements
    walletWindow.focus();
    screen.append(navBar);
    screen.append(transferWindow);
    screen.append(settingsWindow);
    screen.append(walletWindow);

    ///////////////////////////////////////////////////////////////////
    // NAVIGATION BAR
    ///////////////////////////////////////////////////////////////////

    // render the X button
    let closeWalletButton = blessed.button({
        parent: navBar,
        mouse: true,
        keys: true,
        shrink: true,
        left: '97%',
        top: '0%',
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

    // quit on top right button
    closeWalletButton.on('press', function() {
        wallet.saveWalletToFile(`${fileName}.wallet`, password);
        wallet.stop();
        walletWindow.destroy();
        navBar.destroy();
        drawSplashScreen();
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
        content: '(w)allet',
        style: {
            bg: 'black',
            fg: 'white',
            hover: {
                bg: 'red',
                fg: 'white'
            }
        }
    })

    walletNavButton.on('press', function() {
        screen.focusPop();
        walletWindow.setFront();
        walletWindow.focus();
        screen.render();
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

    transferNavButton.on('press', function() {
        screen.focusPop();
        transferWindow.setFront();
        addressInput.focus();
        screen.render();
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

    settingsNavButton.on('press', function() {
        screen.focusPop();
        settingsWindow.setFront();
        settingsWindow.focus();
        screen.render();
    })

    // define notification text
    let notificationText = blessed.text({
        parent: navBar,
        top: 0,
        left: '60%',
        fg: 'grey',
    })

    ///////////////////////////////////////////////////////////////////
    //  WALLET WINDOW
    //////////////////////////////////////////////////////////////////

    //////////////////////////////////// LEFT COLUMN CODE STARTS HERE
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

    // define the address button
    let addressButton = blessed.button({
        parent: leftColumn,
        mouse: false,
        keys: true,
        shrink: true,
        left: 0,
        top: 0,
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

    // on addressbutton click
    addressButton.on('click', async function() {

        // copy to clipboard
        clipboardy.writeSync(addressString);

        // wait .5s and destroy the notification text
        await sleep(500);
        notificationText.destroy();

    });

    // define the synchronization text label
    let syncStatus = blessed.text({
        parent: leftColumn,
        top: '75%',
        left: 0,
        fg: 'white',
        tags: true
    });

    // define the wallet balance
    let walletBalance = blessed.text({
        parent: leftColumn,
        top: 5,
        left: 0,
        fg: 'white',
        tags: true
    });

    // define balance labels
    let walletBalanceLabels = blessed.text({
        parent: leftColumn,
        top: 5,
        left: 0,
        fg: 'white',
        tags: true
    });

    // set balance labels content
    walletBalanceLabels.setContent(
        ' {bold}Available:{/}\n' +
        ' {bold}{red-fg}Locked:{/}\n' +
        ' {grey-fg}Total:{/}'
    );

    // get balance
    let walletBalanceData = wallet.getBalance();

    // set balance content
    walletBalance.setContent(
        `{|}{bold}${WB.prettyPrintAmount(walletBalanceData[0])}{/} \n` +
        `{|}{bold}{red-fg}${WB.prettyPrintAmount(walletBalanceData[1])}{/} \n` +
        `{|}{grey-fg}${WB.prettyPrintAmount(walletBalanceData[1] + walletBalanceData[0])}{/} `);


    //////////////////////////////////// RIGHT COLUMN CODE STARTS HERE
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

    // NOTE: commented out invalid TableOptions
    let transactionTable = contrib.table({
        parent: rightColumn,
        bg: 'black',
        fg: 'grey',
        selectedFg: 'white',
        selectedBg: 'black',
        label: 'Recent Transactions',
        width: '100%',
        height: '100%',
        border: {
        type: "line",
        fg: "white"
        },
        columnSpacing: 6,
        columnWidth: [18, 20]
    })

    transactionTable.setData({
        headers: ['Time', 'Amount'],
        data: txArray
    })


    ///////////////////////////////////////////////////////////////////
    //  SYNC BAR
    //////////////////////////////////////////////////////////////////
    let progress = blessed.progressbar({
        parent: walletWindow,
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

    // refresh the sync information every second
    refreshSync(syncStatus, wallet, progress);
    setInterval(refreshSync.bind(null, syncStatus, wallet, progress), 1000);

    ///////////////////////////////////////////////////////////////////
    //  TRANSFER WINDOW
    //////////////////////////////////////////////////////////////////

    // create the opening menu
    let transferForm = blessed.form({
        parent: transferWindow,
        keys: true,
        left: 'center',
        top: '5%',
        width: 42,
        height: 15,
        bg: 'black',
        fg: 'red',
        border: {
            type: 'line',
            fg: 'white'
        }
    });

    transferForm.on('click', function() {
        screen.focusPop();
    })

    // transfer form post handling
    transferForm.on('submit', async function(data) {
        let paymentID;
        if (data.paymentid === '') {
            paymentID = undefined;
        }
        try {
            const [hash, error] = await wallet.sendTransactionBasic(data.address, atomicUnits(parseInt(data.amount)), paymentID);
        } catch(err) {
            logFile(err);
        }
    });

    // define filename textbox label
    let transferFormLabel = blessed.text({
        parent: transferForm,
        top: -1,
        left: 'center',
        fg: 'white',
        content: 'Send TRTL'
    });

    // define filename textbox label
    let addressLabel = blessed.text({
        parent: transferForm,
        top: 0,
        left: 0,
        fg: 'white',
        content: 'Address:'
    });

    // define filename textbox
    let addressInput = blessed.textbox({
        parent: transferForm,
        name: 'address',
        top: 1,
        left: 0,
        width: 40,
        mouse: true,
        inputOnFocus: true,
        height: 3,
        vi: false,
        border: {
            type: 'line',
            fg: 'grey'
        },
        fg: 'white',
    });

    addressInput.on('click', function() {
        screen.focusPop();
    });

    addressInput.on('blur', function() {
        screen.focusPop();
    })
    

    // define password textbox label
    let idLabel = blessed.text({
        parent: transferForm,
        top: 4,
        left: 0,
        fg: 'white',
        content: 'Payment ID: (optional)'
    });

    // defind password textbox
    let idInput = blessed.textbox({
        parent: transferForm,
        name: 'paymentid',
        top: 5,
        left: 0,
        width: 40,
        mouse: true,
        vi: false,
        inputOnFocus: true,
        height: 3,
        border: {
            type: 'line',
            fg: 'grey'
        },
        fg: 'white',
    });

    idInput.on('click', function() {
        screen.focusPop();
    });

    idInput.on('blur', function() {
        screen.focusPop();
    })

    // define password textbox label
    let amountLabel = blessed.text({
        parent: transferForm,
        top: 8,
        left: 0,
        fg: 'white',
        content: 'Amount:'
    });

    // defind password textbox
    let amountInput = blessed.textbox({
        parent: transferForm,
        name: 'amount',
        top: 9,
        left: 0,
        width: 20,
        mouse: true,
        vi: false,
        inputOnFocus: true,
        height: 3,
        border: {
            type: 'line',
            fg: 'grey'
        },
        fg: 'white',
    });

    amountInput.on('click', function() {
        screen.focusPop();
    });

    amountInput.on('blur', function() {
        screen.focusPop();
    })

    let availableBalanceText = blessed.text({
        parent: transferForm,
        top: 9,
        left: 21,
        fg: 'white',
        tags: true,
        content: `{bold}Available:{/}\n${WB.prettyPrintAmount(walletBalanceData[0])}`
    })

    // define submit button
    let transferButton = blessed.button({
        parent: transferForm,
        mouse: true,
        shrink: true,
        padding: {
            left: 14,
            right: 14
        },
        left: 0,
        top: 12,
        content: 'send (enter)',
        style: {
            bg: 'black',
            fg: 'white',
            hover: {
                bg: 'red'
            }
        }
    });

    // on send transfer button press
    transferButton.on('press', function() {
        screen.focusPop();
        transferForm.submit();
        walletWindow.setFront();
        walletWindow.focus();
        screen.render();
    });

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
            `{|}{bold}${WB.prettyPrintAmount(updateBalance[0])}{/}\n` +
            `{|}{bold}{red-fg}${WB.prettyPrintAmount(updateBalance[1])}{/}\n` +
            `{|}{grey-fg}${WB.prettyPrintAmount(updateBalance[1] + updateBalance[0])}{/}`);

        let updateTransactionList = wallet.getTransactions();

        const updateTxArray = getRecentTransactions(updateTransactionList);

        transactionTable.setData({
            headers: ['Time', 'Amount'],
            data: updateTxArray
        })

        // render the screen
        screen.render();
    })

    // focus window and render screen
    walletWindow.focus();
    screen.render();

}

// create new wallet and launch it
function createWallet(fileName, password) {
    const wallet = WB.WalletBackend.createWallet(daemon);
    wallet.saveWalletToFile(`${fileName}.wallet`, password);
    wallet.stop();
    drawWalletWindow(fileName, password);
}

// refresh the sync bar
function refreshSync(syncStatus, wallet, progress) {

    // get sync status data
    let [walletHeight, localHeight, networkHeight] = wallet.getSyncStatus();

        /* Since we update the network height in intervals, and we update wallet
        height by syncing, occasionaly wallet height is > network height.
        Fix that here. */
        if (walletHeight > networkHeight && networkHeight !== 0 && networkHeight + 10 > walletHeight) {
            networkHeight = walletHeight;
        }

        /* if the wallet has been synced in the past, the wallet will sometimes display
        currentHeight / 0, so if networkHeight is 0 set it equal to block height */
        if (networkHeight === 0 && walletHeight !== 0) {
            networkHeight = walletHeight;
        }

        // Don't divide by zero 
        let syncFill = networkHeight === 0 ? 0 : walletHeight / networkHeight;
        let percentSync = 100 * syncFill;

        // Prevent bar looking full when it's not 
        if (syncFill > 0.97 && syncFill < 1) {
            syncFill = 0.97;
        }

        // Prevent 100% when just under 
        if (percentSync > 99.99 && percentSync < 100) {
            percentSync = 99.99;
        }    

    syncStatus.setContent(
        ` {bold}Status:{/}{|}{red-fg}${walletHeight}{/red-fg} of{/bold} ${networkHeight} \n` +
        `{|}${percentSync}% `
        );
    progress.setProgress(percentSync);
    screen.render();
}

// convert atomic units to human readable amount
function humanReadable(amount) {
    return (amount / 100).toFixed(2);
}

function atomicUnits(amount) {
    return (amount * 100);
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
    return amountArray;
}

// convert unix timestamp into human readable
function convertTimestamp(timestamp) {
    let d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
        hh = ('0' + d.getHours()).slice(-2),
        min = ('0' + d.getMinutes()).slice(-2), // Add leading 0.
        time;
    // ie: 2013-02-18, 16:35
    time = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min;
    return time;
}

// lot to divinewallet.log
function logFile(data) {
    walletLogStream.write(`${convertTimestamp(Date.now())} ${data} \n`);
}