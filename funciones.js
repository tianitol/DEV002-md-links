const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { resolve } = require('path');

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
    //console.log(mdArray)
    return mdArray;
};

//console.log(createMdArray('/Users/tsukito/Library/CloudStorage/OneDrive-Personal/LABORATORIA/mdlinks/DEV002-md-links'))

//podría comenzar leyendo el o los archivos (mdArray) Async transformandolo/s en un array con split ' '
//Luego aplicar un filter por la urlExpReg, así se obtiene el arrayde URLS

//8. leer archivos de forma asincrona(promesas)

const readMdFile = (pathInput) => {
    return new Promise((resolve, reject) => {
        fs.readFile(pathInput, 'utf-8', (error, contenido) => {
            if (error) {
                return reject('error');
            }
            return resolve(contenido);
        });
    });
};

//console.log(readMdFile('markdownFiles/archivo.txt'))

//9. obtener y guardar todos los links en un array de objetos, c/link es un objeto, contiene lo siguiente {href: , text: , file: pathInput}

const createLinkArray = (pathInput) => {
    const urlExpReg = /\[(.+?)\]\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig;
    return new Promise((resolve, reject) => {
        const linkArray = [];
        readMdFile(pathInput)
            .then((data) => {
                //console.log(data)
                let link = urlExpReg.exec(data);
                // console.log(link)
                while (link !== null) {
                    linkArray.push({
                        href: link[2],
                        text: link[1],
                        file: pathInput,
                    });

                    link = urlExpReg.exec(data);

                }
                //console.log(linkArray)

                return resolve(linkArray);
            })
            .catch((error) => reject('error'));
    });
};




//10. imprimir el array de links como respuesta por defecto

//11. imprimir  links validados (options validate) ---> los imprime como objetos, c/link es un objeto separado
//Ya teniendo el array de links, someter cada uno a la petición HTTP con fetch() para obtener el status y el ok

//const arrayObjectRes = [];

const resLinks = (linkArray) => Promise.all(linkArray.map((objectLink) => fetch(objectLink.href)
    .then((res) => {

        const objectRes = {
            ...objectLink,
            status: res.status,
            ok: res.ok ? 'ok' : 'fail',
        };
        //console.log(objectRes)

        return objectRes;
    })
    .catch((error) => 'error con la obtención de links')
));

//12. Estadisticas y validación

//links totales y únicos (--stats)
const stadistics = (linkArray) => {
    const linkArrayHref = linkArray.map((link) => link.href);
    const uniqueLinks = [...new Set(linkArrayHref)];
    return {
        total: linkArrayHref.length,
        unique: uniqueLinks.length
    }
};

//links totales, unicos y rotos (--stats, --validate)
const brokenLinkStats = (linkArray) => {
    const broken = linkArray.filter((link) => link.ok === 'fail');
    return {
        total: linkArray.length,
        unique: stadistics(linkArray).unique,
        broken: broken.length
    }
};



//createLinkArray('/Users/tsukito/Library/CloudStorage/OneDrive-Personal/LABORATORIA/mdlinks/DEV002-md-links/markdownFiles/markdownLinks.md');


//resLinks([{href:1}])
//createLinkArray('README.md')

// validar que rutas existan y sean absolutas para pasarlas a la función que crea el array de archivos .md
const areAllMd = (pathInput) => {
    if (realPath(pathInput)) {
        isAbsolute(pathInput) ? pathInput : (pathInput = relativeToAbsolute(pathInput));
    } else {
        console.error('la ruta no existe');
    }
    return createMdArray(pathInput);
};




module.exports = {
    isAbsolute,
    relativeToAbsolute,
    realPath,
    isAFile,
    isMdFile,
    isADirectory,
    createMdArray,
    readMdFile,
    createLinkArray,
    resLinks,
    areAllMd,
    stadistics,
    brokenLinkStats
};