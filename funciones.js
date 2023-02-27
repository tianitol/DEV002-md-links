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

//5. Es un directorio?
const isADirectory = (pathInput) => {
    let stats = fs.statSync(pathInput);
    let dir = stats.isDirectory();
    return dir ? true : false;
};

//6. Leer directorios para obtener archivos .md

const readDir = (pathInput) => {
    return fs.readdirSync(pathInput);
};

//7. Almacenar todos los .md en un array de archivos md (se aplica la recursividad con createMdArray)

function createMdArray(pathInput) {
    let mdArray = []; //debo colocarlo dentro de la función para que no se dupliquen los archivos dentro del array
    if (isAFile(pathInput) && isMdFile(pathInput)) {
        mdArray.push(pathInput);
    } else if (isADirectory(pathInput)) {
        const filesDirArray = readDir(pathInput);
        filesDirArray.map((filesDirArray) => {
            mdArray = mdArray.concat(createMdArray(`${pathInput}/${filesDirArray}`));
        });
    }
    return mdArray;
};

//console.log(createMdArray('/Users/tsukito/Library/CloudStorage/OneDrive-Personal/LABORATORIA/mdlinks/DEV002-md-links'))


//8. Leer archivos md en busca de links (utilizar exreg) Asincrono

//podría comenzar leyendo el o los archivos (mdArray) Async transformandolo/s en un array con split ' '
//Luego aplicar un filter por la urlExpReg, así se obtiene el arrayde URLS

//8.1 leer archivos de forma asincrona(promesas)

const readMdFile = (pathInput) => {
    return new Promise((resolve, reject) => {
        fs.readFile(pathInput, 'utf-8', (error, archivo) => {
            if (error) {
                reject('error');
            }
            resolve(archivo);
        });
    });
};

console.log(readMdFile('markdownFiles/archivo.txt'))

//8.2 obrener los links 
const createLinkArray = (pathInput) => {
    return new Promise ((resolve, reject) => {
        let LinkArray = [];
        readMdFile(pathInput)
            .then((data) => {
                const urlExpReg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
                // let fileArray = data.split(' ');
                // console.log(fileArray);//las url no están separadas por espacio en algunos casos, por lo que no sirve split(' ')
                // let links = fileArray.filter(urlExpReg);
                //console.log(data)
                let link = urlExpReg.exec(data);
                while(link !== null){
                    LinkArray.push(link);
                    link =urlExpReg.exec(data);
                }
                resolve(LinkArray);
            })
            .catch((error)=> reject('error'));
    });
};
//console.log(createLinkArray('/Users/tsukito/Library/CloudStorage/OneDrive-Personal/LABORATORIA/mdlinks/DEV002-md-links/markdownFiles/markdownLinks.md'))

//9. Guardar todos los links en un array 
//-----API------
//10. Desea validad los links? Desea estadísticas? imprimir la info por defecto (array de todos los links encontrados)
//11. --validate:true, realizar la petición HTTP mediante fetch() para obtener estado y codigo
//12. --status, a través de lo obtenido mediante la validación, arrojar links totales y unicos
//12.1 se debe hacer una función para eliminar los links repetidos (puede ser un array que no permita dos elementos iguales)
//-----CLI------
//13. 

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

module.exports = {
    isAbsolute,
    relativeToAbsolute,
    realPath,
    isAFile,
    isMdFile,
    isADirectory,
    createMdArray,
    readMdFile,
    createLinkArray
};