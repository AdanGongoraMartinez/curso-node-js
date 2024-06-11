const fs = require('node:fs/promises')
const path = require('node:path')
const picocolors = require('picocolors')

const folder = process.argv[2] ?? '.' // poder pasar una carpeta como argumento

async function ls (folder) {
    let files
    try {
        files = await fs.readdir(folder) // asincronia secuencial
    } catch{
        console.error(picocolors.red(`No se pudo leer el directorio ${folder}`))
        process.exit(1)
    }

    const filesPromises = files.map(async file => {
        const filePath = path.join(folder, file)
        let stats
        try {
            stats = await fs.stat(filePath) // map es un callback y no espera el await
            // mapea todas de una vez
        } catch {
            console.error(`No se pudo leer el directorio ${folder}`)
            process.exit(1)
        }

        const isDirectory = stats.isDirectory()
        const fileType = isDirectory ? '/' : '-'
        const fileSize = stats.size.toString()
        const fileModified = stats.mtime.toLocaleDateString()

        return `${fileType} ${picocolors.blue(file.padEnd(30))} ${picocolors.green(fileSize.padStart(10))} ${picocolors.yellow(fileModified)}`
    })


    const filesInfo = await Promise.all(filesPromises)

    filesInfo.forEach(fileInfo => {
        console.log(fileInfo)
    });
}

ls(folder)
