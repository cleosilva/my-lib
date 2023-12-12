import fs from 'fs';
import chalk from "chalk";


function getLinks(text) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capture = [...text.matchAll(regex)];
    const result = capture.map((capture) => ({ [capture[1]]: capture[2] }))
    return result.length !== 0 ? result : 'There is no links on the file.';
}

function getError(error) {
    throw new Error(chalk.red(error.code, 'File empty or invalid path.'));
}

async function getFile(filePath) {
    try {
        // aqui coloca o que você quer que aconteça, o caminho feliz
        const encoding = 'utf-8';
        const response = await fs.promises.readFile(filePath, encoding)
        return getLinks(response);
    } catch (error) {
        console.log(getError(error));
    }
}

export default getFile;


