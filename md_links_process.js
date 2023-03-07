
const { createLinkArray, resLinks, areAllMd, stadistics, brokenLinkStats } = require('./funciones.js');

function md_links(pathInput, options) {
    console.log('\nBienvenide a nito-md-links');
    return new Promise((resolve, reject) => {
        if (options[0] === undefined && options[1] === undefined) {
            console.log('\nNo se han ingresado opciones')
            const path = areAllMd(pathInput);
            path.forEach(el => {
                createLinkArray(el)
                    .then(data => {
                        resolve(data);
                        if(Object.keys(data).length == 0) {
                            console.log('\n------------------------------------');
                            console.log(`\nLa ruta:\n\n${el}\n\nNo contiene links\n`);
                        }else{
                            console.log('------------------------------------');
                            console.log(`\nLa ruta:\n\n${el}\n\nContiene los links:\n`);
                            console.log(data);
                        }


                    })

                    .catch(error => console.log(error));
            });
        } else {
            if (options[0] === '--validate' && options[1] == undefined) {
                console.log('\nHa ingresado opción: --validate');
                const path = areAllMd(pathInput);
                path.forEach(el => {
                    createLinkArray(el)
                        .then((link) => {

                            resLinks(link)
                                .then(item => {
                                    resolve(item);
                                    if(Object.keys(item).length == 0) {
                                        console.log('\n------------------------------------');
                                        console.log(`\nLa ruta:\n\n${el}\n\nNo contiene links\n`);                                
                                    }else{
                                        console.log('\n------------------------------------');
                                        console.log(`\nValidación para links en:\n\n${el}\n\n`)
                                        console.log(item);
                                    }
                                }).catch((error) => console.error(error));
                        })
                });
            }else if(options[0] === '--stats' && options[1] == undefined){
                console.log('\nHa ingresado opción: --stats');
                const path = areAllMd(pathInput);
                path.forEach(el => {
                    createLinkArray(el)
                        .then((link) => {
                           // console.log(link)
                               const stats = (stadistics(link));
                               //console.log(stats)
                               resolve(stats)
                        
                                    if(Object.keys(link).length == 0) {
                                        console.log('\n------------------------------------');
                                        console.log(`\nLa ruta:\n\n${el}\n\nNo contiene links\n`);
                                    }else{
                                        console.log('\n------------------------------------');
                                        console.log(`\nEstadísticas para links en:\n\n${el}\n\n`)
                                        console.log(stats);
                                    }
                                }).catch((error) => console.error(error));
                        })
                }else if((options[0] === '--validate' && options[1] === '--stats') || (options[0] === '--stats' && options[1] === '--validate')){
                    console.log('\nHa ingresado opciones: --validate y --stats');
                const path = areAllMd(pathInput);
                path.forEach(el => {
                    createLinkArray(el)
                        .then((link) => {
                            resLinks(link)
                            .then(resultado => {
                                // console.log(resutado)
                               const combi = (brokenLinkStats(resultado));
                               //console.log(combi)
                               resolve(combi)
                        
                                    if(Object.keys(resultado).length == 0) {
                                        console.log('\n------------------------------------');
                                        console.log(`\nLa ruta:\n\n${el}\n\nNo contiene links\n`);
                                    }else{
                                        console.log('\n------------------------------------');
                                        console.log(`\nEstadísticas para links en:\n\n${el}\n\n`);
                                        console.log(combi);
                                    }
                                })

                            })
                           .catch((error) => reject('error al resolver promesa que valida los links'));
                        })

                }else{
                    console.log('\n------------------------------------');
                    console.log('\nDebe ingresar opciones válidas\n')
                }
            }
        
});
};

md_links('markdownFiles', ['--stat', '--validat']);

module.exports = { md_links };