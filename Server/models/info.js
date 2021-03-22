const fs = require('fs');


class infoRead{
    getCounries() {
        const readContentFile = fs.readFileSync(`${__dirname}/../data/countries.json`);
        return JSON.parse(readContentFile);
    }
    getPhoneCode() {
        const readContentFile = fs.readFileSync(`${__dirname}/../data/phoneCode.json`);
        return JSON.parse(readContentFile);
    }
}
module.exports = infoRead;