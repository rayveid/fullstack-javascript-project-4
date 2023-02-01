import * as path from "path";
import axios from "axios";
import fs from 'fs/promises';

const pageLoader = (url, outputDir = process.cwd()) => {
    const address = new URL(url); // формируем объект url
    const pathFn = address.hostname + address.pathname; // получаем путь
    const filename = pathFn.replaceAll(/[^a-zA-Z0-9]/ig, '-') + '.html';
    const output = outputDir === process.cwd() ? process.cwd() : path.join(process.cwd(), outputDir)
    const filepath = path.join(output, filename);

    return axios.get(url)
        .then((res) => res.data) // извлекаем данные
        .then((data) => fs
            .mkdir(output, { recursive: true }) // создаем папку
            .then(() => fs.writeFile(filepath, data))) // записываем файл
        .then(() => filepath) // в конце отдаем строку с адресом
}; // функция должна возвращать полный путь к загруженному файлу
export default pageLoader;
