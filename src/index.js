import * as path from "path";
import downloadFile from "./utils/downloadFile.js";



const pageLoader = (url, outputDir = process.cwd()) => {
    const address = new URL(url); // формируем объект url
    const output = outputDir === process.cwd() ? process.cwd() : path.join(process.cwd(), outputDir)

    return downloadFile(address, output); // функция возвращает путь к загруженному файлу
};
export default pageLoader;
