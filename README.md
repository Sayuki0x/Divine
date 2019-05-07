[![NPM](https://nodei.co/npm/divinewallet.png?compact=true)](https://npmjs.org/package/divinewallet)

# Divine

Divine, a TUI (Textual User Interface) wallet for TurtleCoin.

https://github.com/turtlecoin/turtlecoin-wallet-nodejs

![walletscreen screenshot](https://raw.githubusercontent.com/turtlecoin/turtlecoin-wallet-nodejs/development/screenshots/walletscreen.png)

https://raw.githubusercontent.com/turtlecoin/turtlecoin-wallet-nodejs/development/screenshots/walletscreen.png

## Dependencies

1. `nodejs`

[nodejs installation instructions](https://nodejs.org/en/download/package-manager/)

2. `git`

3. `typescript` 

`npm i -g typescript`

## Installation

1. Install Divine globally with the `npm` package manager.

`npm i -g divinewallet`

2. You can now run Divine from anywhere:

`divine`

## Development Setup

1. Clone the repository

`mkdir Divine && cd Divine`

`git clone https://github.com/turtlecoin/turtlecoin-wallet-nodejs/ .`

2. Install the dependencies

`npm install`

4. Compile the typscript

`tsc`

4. Start the program

`npm start`

## todo

1. add import from keys and seed
2. allow custom wallet directory in settings
3. change daemon in settings
4. allow to click / key through the transaction list and press enter for more info (hash, block explorer url, etc)
5. add notificaton queue that you can look at the history of and "clear"
6. add address book
7. add one to many and tx extra encoding "advanced transactions"
8. add support to send keys to a printer
