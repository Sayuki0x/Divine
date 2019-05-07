[![NPM](https://nodei.co/npm/divinewallet.png?compact=true)](https://npmjs.org/package/divinewallet)


# Divine

Divine, a TUI (Textual User Interface) wallet for TurtleCoin. CLI-esque with full mouse support.

https://github.com/turtlecoin/turtlecoin-wallet-nodejs

## Dependencies

1. `nodejs` installed, check [here](https://nodejs.org/en/download/package-manager/) for information on how to do so.
2. `git`
3. `typescript`  `npm i -g typescript`

## Installation

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
