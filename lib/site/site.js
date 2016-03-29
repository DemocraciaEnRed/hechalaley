var page = require('page')

// Polyfill Promises
window.Promise = require('promise')

// Workaround for loading locale. See http://momentjs.com/docs/#/use-it/browserify/
require('moment/locale/es')

require('../material/material')
require('../politician-modal/politician-modal')

require('../home/home')
require('../bills/bills')

page()
