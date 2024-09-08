const os = require('node:os')

console.log('Informacion del SO')
console.log('------------------')

console.log('Nombre:', os.platform())
console.log('Version:', os.release())
console.log('Arquitectura:', os.arch())
console.log('CPUs:', os.cpus())
console.log('Mem libre:', os.freemem() / 1024 / 1024)
console.log('Mem usada:', os.totalmem() / 1024 / 1024)
console.log('uptime:', os.uptime() / 60 / 60)
