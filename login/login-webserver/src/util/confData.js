/**
 * @file conf配置文件读取
 *
 */

const YAML = require('yamljs');
const path = require('path');
const confData = YAML.load(path.resolve(__dirname, './../config/conf.yaml'));

module.exports = confData;
