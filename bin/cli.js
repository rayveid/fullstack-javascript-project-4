#!/usr/bin/env node
import { program } from "commander";
import pageLoader from "../src/index.js";


program
    .name('page-loader')
    .description('Page loader utility')
    .version('0.0.1')
    .arguments('<url>')
    .option('-o, --output [dir]', // опция для выбора папки вывода
        'output dir',
        process.cwd())  // папка по-умолчанию
    .action((url, options) => {
        const { output } = options; // извлекаем папку вывода из опций
        const result = pageLoader(url,output);
        console.log(result);
    })
    .parse(); // запуск программы
