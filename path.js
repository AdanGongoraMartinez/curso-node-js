const path = require('node:path')

// barra separadora de tareas segun SO
console.log(path.sep)

// unir rutas con path.join
const filePath = path.join('content','subfolder','test.txt')
console.log(filePath)

const base = path.basename('/tmp/secret/password.txt')
console.log(base)

const filename = path.basename('/tmp/secret/password.txt', '.txt')
console.log(filename)

const extensions = path.extname('image.png')
console.log(extensions)