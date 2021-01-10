const { info } = require('console');
const fs = require('fs');


class infoRead{
    getCounries() {
        const readContentFile = fs.readFileSync(`${__dirname}/../data/countries.json`);
        return JSON.parse(readContentFile);
    }
}
module.exports = infoRead;