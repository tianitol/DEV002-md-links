#!/usr/bin/env node

//configuración para que se pueda llamar desde la linea de comandos

const {argv} = require('process');
const {md_links} = require('./md_links_process.js');

//argumentos para utilizar en la interfaz de la línea de comando con NODE

let path = argv[2];
let option1 = argv[3];
let option2 = argv[4];
let options = [option1, option2]

console.log('nito-mdlinks');

md_links(path, options);

module.exports = {md_links};