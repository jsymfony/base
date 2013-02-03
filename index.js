var autoload = require('jsymfony-autoload');

if (!global.hasOwnProperty('JSymfony')) {
    global.JSymfony = {
        autoload: autoload
    };

    autoload.register('JSymfony', __dirname + '/lib');
}
