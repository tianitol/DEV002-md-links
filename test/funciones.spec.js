const { isAbsolute, relativeToAbsolute, realPath, isAFile, isMdFile, isADirectory, createMdArray, readMdFile, createLinkArray, resLinks, areAllMd } = require('../funciones.js');

//RUTAS para prueba
const archivoNoMd = 'index.js';
const archivoMd = 'README.md';
const directorio = 'markdownFiles';
const rutaAbsoluta = '/Users/tsukito/Library/CloudStorage/OneDrive-Personal/LABORATORIA/mdlinks/DEV002-md-links/markdownFiles/markdownLinks.md';
const rutaNoExiste = 'Users/tsukito/Library/CloudStorage/OneDrive-Personal/LABORATORIA/mdlinks/DEV002-md-links/markdownFiles/markdownLinks.md';
const rutaRelativa = 'markdownFiles/markdownLinks.md';
const archivoTexto = '/Users/tsukito/Library/CloudStorage/OneDrive-Personal/LABORATORIA/mdlinks/DEV002-md-links/markdownFiles/archivo.txt';
const arrayLinks = [
    {
      href: 'https://docs.npmjs.com/cli/install',
      text: 'docs oficiales de `npm install` acá',
      file: '/Users/tsukito/Library/CloudStorage/OneDrive-Personal/LABORATORIA/mdlinks/DEV002-md-links/markdownFiles/markdownLinks.md'
    },
    {
      href: 'https://github.com/Laboratoria/course-parser',
      text: '`course-parser`',
      file: '/Users/tsukito/Library/CloudStorage/OneDrive-Personal/LABORATORIA/mdlinks/DEV002-md-links/markdownFiles/markdownLinks.md'
    },
    {
      href: 'https://webempresa.com/blogg.html',
      text: 'página error',
      file: '/Users/tsukito/Library/CloudStorage/OneDrive-Personal/LABORATORIA/mdlinks/DEV002-md-links/markdownFiles/markdownLinks.md'
    }
  ];

  const LinksValidados = [{
    href: 'https://docs.npmjs.com/cli/install',
    text: 'docs oficiales de `npm install` acá',
    file: '/Users/tsukito/Library/CloudStorage/OneDrive-Personal/LABORATORIA/mdlinks/DEV002-md-links/markdownFiles/markdownLinks.md',
    status: 200,
    ok: 'ok'
  },
  {
    href: 'https://github.com/Laboratoria/course-parser',
    text: '`course-parser`',
    file: '/Users/tsukito/Library/CloudStorage/OneDrive-Personal/LABORATORIA/mdlinks/DEV002-md-links/markdownFiles/markdownLinks.md',
    status: 200,
    ok: 'ok'
  },
  {
    href: 'https://webempresa.com/blogg.html',
    text: 'página error',
    file: '/Users/tsukito/Library/CloudStorage/OneDrive-Personal/LABORATORIA/mdlinks/DEV002-md-links/markdownFiles/markdownLinks.md',
    status: 404,
    ok: 'fail'
  }];

  const arrayMd = [
    '/Users/tsukito/Library/CloudStorage/OneDrive-Personal/LABORATORIA/mdlinks/DEV002-md-links/markdownFiles/markdownLinks.md',
    '/Users/tsukito/Library/CloudStorage/OneDrive-Personal/LABORATORIA/mdlinks/DEV002-md-links/markdownFiles/markdownNolinks.md'
  ];


describe('isAbsolute', () => {
    it('debe devolver true si la ruta es absoluta', () => {
        isAbsolute(rutaAbsoluta);
        expect(isAbsolute(rutaAbsoluta)).toEqual(true);
    });
    it('debe devolver false si la ruta es relativa', () => {
        isAbsolute(rutaAbsoluta);
        expect(isAbsolute(rutaRelativa)).toEqual(false);
    });
});

describe('relativeToAbsolute', () => {
    it('debe transformar la ruta relativa en absoluta', () => {
        relativeToAbsolute(rutaRelativa);
        expect(relativeToAbsolute(rutaRelativa)).toEqual(rutaAbsoluta);
    });
});

describe('realPath', () => {
    it('debe devolver true si la ruta no existe en la PC', () => {
        realPath(rutaAbsoluta);
        expect(realPath(rutaAbsoluta)).toEqual(true);
    });
    it('debe devolver false si la ruta existe en la PC', () => {
        realPath(rutaNoExiste);
        expect(realPath(rutaNoExiste)).toEqual(false);
    });
    it('debe devolver true si la ruta relativa existe en la PC', () => {
        realPath(rutaRelativa);
        expect(realPath(rutaRelativa)).toEqual(true);
    });
});

describe('isAFile', () => {
    it('debe devolver true si la ruta corresponde a un archivo', () => {
        isAFile(archivoMd);
        expect(isAFile(archivoMd)).toEqual(true);
    });
    it('debe devolver false si la ruta no corresponde a un archivo', () => {
        isAFile(directorio);
        expect(isAFile(directorio)).toEqual(false);
    });
});

describe('isMdFile', () => {
    it('debe devolver true si es un archivo con extensión .md', () => {
        isMdFile(archivoMd);
        expect(isMdFile(archivoMd)).toEqual(true);
    });
    it('debe devolver false si no es un archivo con extensión .md', () => {
        isMdFile(archivoNoMd);
        expect(isMdFile(archivoNoMd)).toEqual(false);
    });
});

describe('isADirectory', () => {
    it('debe devolver true si la ruta corresponde a un directorio', () => {
        isADirectory(directorio);
        expect(isADirectory(directorio)).toEqual(true);
    });
    it('debe devolver false si la ruta no corresponde a un directorio', () => {
        isADirectory(archivoMd);
        expect(isADirectory(archivoMd)).toEqual(false);
    });
});

describe('createMdArray', () => {
    it('debe retornar un array de archivos .md', () => {
        createMdArray(directorio);
        expect(createMdArray(directorio)).toEqual(["markdownFiles/markdownLinks.md", "markdownFiles/markdownNolinks.md"]);

    });
});

describe('readMdFile', () => {
    it('debe ser una función', () => {
        expect(typeof readMdFile).toBe('function');
    });
    it('debe devolver una promesa', () => readMdFile()
        .then(() => {
            expect(readMdFile).toBe(typeof 'promise');
        })
        .catch((error) => error));
    it('debe devolver el contenido del archivo', () => {
        return expect(readMdFile(archivoTexto)).resolves.toBe('Me puedes leer, soy un archivo .txt')
    });  
    it('debe fallar con un error', () => {
        return expect(readMdFile(rutaNoExiste)).rejects.toMatch('error');
    });  
});

describe('createLinkArray', () => {
    it('debe ser una función', () => {
        expect(typeof createLinkArray).toBe('function');
    });
    it('debe devolver una promesa', () => createLinkArray()
        .then(() => {
            expect(createLinkArray).toBe(typeof 'promise');
        })
        .catch((error) => error));
    it('debe devolver un array de links', () => {
        return expect(createLinkArray(rutaAbsoluta)).resolves.toStrictEqual(arrayLinks);
    });
    it('debe fallar con un error', () => {
        return expect(createLinkArray(rutaNoExiste)).rejects.toMatch('error');
    });

});

describe('resLinks', () => {
    it('debe devolver links validados como objetos', () => {
        return expect(resLinks(arrayLinks)).resolves.toStrictEqual(LinksValidados);
    });
    it('debe fallar con un error', () => {
        return expect(resLinks([{href:1}])).rejects.toMatch('error');
    });
});

describe('areAllMd', () => {
    it('si se llama con ruta relativa, createMdArray devuelve un array de .mds con ruta absoluta', () => {
        areAllMd(directorio);
        expect(areAllMd(directorio)).toEqual(arrayMd);
    });
    it('si se llama con ruta absoluta, createMdArray devuelve un array de .mds con ruta absoluta', () => {
        areAllMd('/Users/tsukito/Library/CloudStorage/OneDrive-Personal/LABORATORIA/mdlinks/DEV002-md-links/markdownFiles');
        expect(areAllMd('/Users/tsukito/Library/CloudStorage/OneDrive-Personal/LABORATORIA/mdlinks/DEV002-md-links/markdownFiles')).toEqual(arrayMd);
    })
    it('si la ruta no existe debe arrojar un error', () => {
        areAllMd(rutaNoExiste);
        expect(areAllMd(rutaNoExiste)).toThrow();
    });
    
});
