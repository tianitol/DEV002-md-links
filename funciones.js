const fs = require('fs');
const path = require('path');

//----------TO DO LIST----------
//1. La ruta es absoluta? (transformarla a absoluta)
const isAbsolute = (pathInput) => {
    return path.isAbsolute(pathInput) ? true : false;
};

//1.1 transformar ruta relativa a absoluta
const relativeToAbsolute = (pathInput) => {
    return path.resolve(process.cwd(), pathInput);
};

//2. La ruta existe en la computadora?
const realPath = () => {
    const pathExist = fs.existsSync(pathInput);
    return pathExist ? true : false;
};

//3. Es un archivo?

//4. Es un archivo .md?
//5. Es un directorio? (recursividad para llegar a comprobar c/ruta dentro) Sincrono
//6. Almacenar todos los .md en un array de archivos md
//7. Leer archivos md en busca de links (utilizar exreg) Asincrono
//8. Guardar todos los links en un array 
//-----API------
//9. Desea validad los links? Desea estadísticas? imprimir la info por defecto (array de todos los links encontrados)
//10. --validate:true, realizar la petición HTTP mediante fetch() para obtener estado y codigo
//11. --status, a través de lo obtenido mediante la validación, arrojar links totales y unicos
//11.1 se debe hacer una función para eliminar los links repetidos (puede ser un array que no permita dos elementos iguales)
//-----CLI------
//12. 


//función para validar el Path (requiere el path)

function validationPath(pathInput) { //la ruta es válida?
    if (pathInput == undefined) {
        return undefined;
    }
    else if (path.isAbsolute(pathInput)) {
        console.log('La ruta: ' + pathInput + ' ingresada es absoluta')
        if(fs.existsSync(pathInput)){
            return pathInput

        }else{
            console.log('La ruta: ' + pathInput + ' no existe en esta computadora');
        }
    }else {
        console.log('La ruta: ' + pathInput + ' ingresada es relativa');
        let rutaResuelta = path.resolve(process.cwd(), pathInput);
        console.log('Ruta resuelta: ' + rutaResuelta);
        if(fs.existsSync(rutaResuelta)){
            return rutaResuelta
        }else{
            console.log('La ruta: ' + rutaResuelta + ' no existe en esta computadora')
        }

    }
};

validationPath('/Users/tsukito/Library/CloudStorage/OneDrive-Personal/LABORATORIA/mdlinks/DEV002-md-links/RADME.md');

module.exports = validationPath;