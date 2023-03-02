#!/usr/bin/env node

//configuración para que se pueda llamar desde la linea de comandos

const {argv} = require('process');
const {md_links} = require('./CLI.js');

//argumentos para utilizar en la interfaz de la línea de comando con NODE

let path = agrv[2];
let option1 = argv[3];
let option2 = agrv[4];
let options = [option1, option2];

md_links(path, options)
.catch((error) => {
    console.error('argumentos inválidos')
})
;

module.exports = {md_links};