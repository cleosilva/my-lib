import fs from 'fs';
import chalk from "chalk";


function getLinks(text) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capture = [...text.matchAll(regex)];
    const result = capture.map((capture) => ({ [capture[1]]: capture[2] }))
    return result;
}

function getError(error) {
    throw new Error(chalk.red(error.code, 'Não há arquivo ou caminho inválido!'));
}

async function getFile(filePath) {
    try {
        // aqui coloca o que você quer que aconteça, o caminho feliz
        const encoding = 'utf-8';
        const response = await fs.promises.readFile(filePath, encoding)
        console.log(getLinks(response));
        return response;
    } catch (error) {
        console.log(getError(error));
    }
}

getFile('../files/text.md');


