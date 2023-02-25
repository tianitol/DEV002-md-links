const fs = require('fs');
const path = require('path');

//----------TO DO LIST----------

//1. La ruta es absoluta?
const isAbsolute = (pathInput) => {
    let rutaAbsoluta = path.isAbsolute(pathInput);
    return rutaAbsoluta ? true : false;
};

//1.1 transformar ruta relativa a absoluta
const relativeToAbsolute = (pathInput) => {
    return path.resolve(process.cwd(), pathInput); //retorna la ruta absoluta
};

//2. La ruta existe en la computadora?
const realPath = (pathInput) => {
    const pathExist = fs.existsSync(pathInput);
    return pathExist ? true : false;
};

//3. Es un archivo?

const isAFile = (pathInput) => {
    let stats = fs.statSync(pathInput);
    let file = stats.isFile();
    return file ? true : false;
}

//4. Es un archivo .md?
const isMdFile = (pathInput) => {
    let extFile = path.extname(pathInput);
return (extFile === '.md') ? true : false;
};


//----------RUTAS PARA PRUEBAS---------
//console.log(isMdFile('index.js')); //archivo no .md
//console.log(isMdFile('README.md')); //archivo .md
//console.log(isMdFile('markdownFiles')); //es un directorio

//5. Es un directorio? (recursividad para llegar a comprobar c/ruta dentro) Sincrono
const isADirectory = (pathInput) => {
   let stats = fs.statSync(pathInput);
   let dir = stats.isDirectory();
   return dir ? true : false;
};


/*---------Para concatenar URLs se utiliza path.join('pathDIR', 'fileBasename) */

//6. Leer directorios para obtener archivos .md

const readDir = (pathInput) => {
    return fs.readdirSync(pathInput);
};

//7. Almacenar todos los .md en un array de archivos md

let mdArray = [];
function arrayMdCreate (pathInput){

    if(isAFile(pathInput) && isMdFile(pathInput)){
mdArray.push(pathInput);
    }else if (isADirectory(pathInput)){
        return 'es un directorio, no se puede leer aun';

    }
    return mdArray;
};

console.log(readDir('README.md'))
//console.log(mdArray)

//7. Leer archivos md en busca de links (utilizar exreg) Asincrono

// function readMdFile(pathInput){
// const promise = new Promise (function(resolve, reject){
// if(isMdFile){
//     let archivo = fs.readFile(pathInput, 'utf-8', (error, archivo) => {
//         if(error){
//             throw error;
//         }
//         console.log(archivo);
//     });
//     resolve()
// }else{
//     reject(`no es un archivo .md`)
// }
// });
// }


//8. Guardar todos los links en un array 
//-----API------
//9. Desea validad los links? Desea estadísticas? imprimir la info por defecto (array de todos los links encontrados)
//10. --validate:true, realizar la petición HTTP mediante fetch() para obtener estado y codigo
//11. --status, a través de lo obtenido mediante la validación, arrojar links totales y unicos
//11.1 se debe hacer una función para eliminar los links repetidos (puede ser un array que no permita dos elementos iguales)
//-----CLI------
//12. 

//const mdLinks = (pathInput) => {


    // if(isAbsolute){
    //     console.log('La ruta: ' + pathInput + ' ingresada es absoluta')
        // if(realPath){
        //     return pathInput;
        // }else{
        //     console.log('La ruta: ' + pathInput + ' no existe en esta computadora');
        // }
    // }else{
    //     console.log('La ruta: ' + pathInput + ' ingresada es relativa')
        // let rutaResuelta = relativeToAbsolute(pathInput);

        // if(realPath){
        //    return rutaResuelta;
        // }else{
        //     console.log('La ruta: ' + rutaResuelta + ' no existe en esta computadora')
        // }
//     }
// }
//función para validar el Path (requiere el path)

// function validationPath(pathInput) { //la ruta es válida?
//     if (pathInput == undefined) {
//         return undefined;
//     }
//     else if (path.isAbsolute(pathInput)) {
//         console.log('La ruta: ' + pathInput + ' ingresada es absoluta')
//         if(fs.existsSync(pathInput)){
//             return pathInput

//         }else{
//             console.log('La ruta: ' + pathInput + ' no existe en esta computadora');
//         }
//     }else {
//         console.log('La ruta: ' + pathInput + ' ingresada es relativa');
//         let rutaResuelta = path.resolve(process.cwd(), pathInput);
//         console.log('Ruta resuelta: ' + rutaResuelta);
//         if(fs.existsSync(rutaResuelta)){
//             return rutaResuelta
//         }else{
//             console.log('La ruta: ' + rutaResuelta + ' no existe en esta computadora')
//         }

//     }
// };

//console.log(realPath(relativeToAbsolute('RADME.md')));

//module.exports = isAbsolute;