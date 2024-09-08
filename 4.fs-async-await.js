//* asincronia secuencual

const { readFile } = require('node:fs/promises')

// IIFE - Inmediatly Invoked Function Expression
;(
  async () => {
    console.log('Leyendo primer archivo...')
    const text = await readFile('./archivo.txt', 'utf-8')
    console.log('primer text:', text)

    console.log('Hacer cosas mientras lee el archivo')

    console.log('Leyendo segundo archivo...')

    const secondText = await readFile('./archivo2.txt', 'utf-8')
    console.log(secondText)
  }
)()
