import * as path from "path";
import fs from "fs/promises";
import * as cheerio from "cheerio";
import genName from "./utils/genName.js";
import axios from "axios";

// const getFixture = (filename) => path.join(process.cwd(), '__fixtures__', filename);

const downloadImages = (pageData, outputDir) => {
    const $ = cheerio.load(pageData)
    const fileUrl = new URL($('img').attr('src')); // излвекаем ссылку на файл

    const name = path.parse(fileUrl.pathname).name;
    const dir = path.parse(fileUrl.pathname).dir;
    const ext = path.extname(fileUrl.pathname)
    const prefix = `${fileUrl.host}${dir}${name}`; // префикс для названия файла
    const fileName = genName(prefix, ext);
    console.log(fileName)

    const filePath = path.join(outputDir, fileName);

    return fs.mkdir(outputDir, {recursive: true}) // создаем папку для файлов
        .then(() => axios.get(fileUrl, { responseType: "arraybuffer"}))
        .then(({ data }) => fs.writeFile(filePath, data))
}

const pageLoader = (urlString, outputDir = process.cwd()) => {
    const pageUrl = new URL(urlString); // формируем url из переданной строки
    const prefix = `${pageUrl.host}${pageUrl.pathname}`; // префикс для названий стр и файлов

    const output = outputDir === process.cwd() ? process.cwd() : path.join(process.cwd(), outputDir);
    const outputPage = path.join(output, genName(prefix, '.html')); // адрес для сохранения страницы
    const outputFiles = path.join(output, genName(prefix, '_files')) // адрес для сохранения файлов

    return fs.mkdir(output, {recursive: true}) // создаем папку выхода (если нет)
        .then(() => axios.get(pageUrl)) // делаем запрос к странице
        .then((res) => res.data) // извлекаем данные
        .then((data) => fs.writeFile(outputPage, data)) // записываем файл
        .then(() => fs.readFile(outputPage, 'utf8')) // читаем записанный файл
        .then((data) => downloadImages(data, outputFiles)) // загружаем все ресурсы со страницы
};

export default pageLoader;
