import nconf from 'nconf'

nconf.env().argv()

nconf.defaults({
})

const CONFIG = nconf.get()

export { CONFIG }
