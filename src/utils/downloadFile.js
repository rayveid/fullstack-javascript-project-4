import axios from "axios";
import * as path from "path";
import genName from "./genName.js";
import fs from "fs/promises";

const downloadFile = (url, outputDir) => {
    const ext = path.extname(url.pathname) || '.html'; // извлекаем расширение файла, если пустая строка - подставляем html
    const filename = genName(`${url.hostname + url.pathname}`, ext); // генерируем имя файла
    const output = path.join(outputDir, filename);
    const responseType = ext === '.png' ? 'arraybuffer' : 'json';

    return fs
        .mkdir(outputDir, {recursive: true}) // создаем папку (если нет)
        .then(() => axios.get(url, { responseType })) // делаем запрос
        .then((res) => res.data) // получаем данные из запроса
        .then((data) => fs.writeFile(output, data)) // записываем файл
        .then(() => console.log(output)) // возвращаем путь к файлу
}

export default downloadFile;
