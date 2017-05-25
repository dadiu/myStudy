
const util = require('./lib/util');


const base_file = './source/Hero.xls';
const write_file = './writeFile/test.txt';

// 读取英雄
const workbook = util.readXlsxAsync(base_file);

// 表底 Sheet
const sheetNames = workbook.SheetNames;

//
// const worksheet = workbook.Sheets[sheetNames[0]];
console.log(sheetNames);

// util.writeFileAsync(write_file, JSON.stringify(sheetNames));
