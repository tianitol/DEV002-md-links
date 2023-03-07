const { md_links } = require('./md_links_process');


function mdLinksAPI(pathInput, options) {
  return new Promise((resolve, reject) => {
    if ((options === null || options === undefined || options === '') || options === '{validate:false}' || options.validate === false) {
      md_links(pathInput, '')
        .then(links => {
          resolve(links)
        })
        .catch((error) => reject(error))
    }
    else if (options === '{validate:true}' || options.validate === true) {
      md_links(pathInput, ['--validate'])
        .then(resultado => {
          resolve(resultado)
        })
        .catch((error) => reject(error))
    };
  });
};

//mdLinksAPI('markdownFiles', '{validate:true}');

module.exports = {
  mdLinksAPI
};