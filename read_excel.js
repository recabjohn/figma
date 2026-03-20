const xlsx = require('xlsx');
const fs = require('fs');
const workbook = xlsx.readFile('C:\\\\Users\\\\recabjohnsamuel_p\\\\Downloads\\\\figma\\\\TC-GL-ND-10012026-V01.xlsx');
let out = '';
workbook.SheetNames.forEach(sheetName => {
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  out += `\n\n=== Sheet: ${sheetName} ===\n`;
  out += JSON.stringify(data, null, 2);
});
fs.writeFileSync('output_utf8.json', out, 'utf8');
