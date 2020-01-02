/**
 *
 */
const XLSX = require('xlsx');
const path = require('path');

exports.createXlsx = (header, content, filePath) => {
    const wb = { SheetNames: ['cdss_norm'], Sheets: {}, Props: {} };
    wb.Sheets['cdss_norm'] = XLSX.utils.json_to_sheet(content);
    XLSX.writeFile(wb, path.resolve(__dirname, filePath));
};
