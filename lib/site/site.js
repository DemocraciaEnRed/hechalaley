var page = require('page')

// Workaround for loading locale. See http://momentjs.com/docs/#/use-it/browserify/
require('moment/locale/es')

require('../material/material')

require('../home/home')
require('../bills/bills')

page()
