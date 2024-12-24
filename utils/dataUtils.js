const keysJson = require('../data/keys.json');

class DataUtils {
  
    getVariable(key) {
        return keysJson[key];
    }
}

module.exports = new DataUtils();