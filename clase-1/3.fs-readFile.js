const fs = require('node:fs')

console.log('Leyendo primer archivo...')
const text = fs.readFile('./archivo.txt', 'utf-8', (err, text) => { // asincronia con callbacks
  console.log(text)
})

console.log('Hacer cosas mientras lee el archivo')

console.log('Leyendo segundo archivo...')
const secondtext = fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
  console.log(text)
})
