const fs = require('node:fs/promises')

/*
* Transformar de callback a promesa
! solo en modulos sin promesas nativas

const fs = require('node:fs/promises')
const { promisify } = require('node:util')

const readFilePromise = promisify(fs.readFile)
*/

console.log('Leyendo primer archivo...')
fs.readFile('./archivo.txt', 'utf-8')
  .then(text => {
    console.log(text)
  })

console.log('Hacer cosas mientras lee el archivo')

console.log('Leyendo segundo archivo...')
fs.readFile('./archivo2.txt', 'utf-8')
  .then(text => {
    console.log(text)
  })
