import fs from 'fs';
import chalk from "chalk";

function getError(error) {
    throw new Error(chalk.red(error.code, 'Não há arquivo ou caminho inválido!'));
}

async function getFile(filePath) {
    try {
        // aqui coloca o que você quer que aconteça, o caminho feliz
        const encoding = 'utf-8';
        const response = await fs.promises.readFile(filePath, encoding)
        console.log(chalk.green(response))
        return response;
    } catch (error) {
        console.log(getError(error));
    }
}

getFile('./files/text.md');