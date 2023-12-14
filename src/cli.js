import chalk from "chalk";
import fs from 'fs';
import getFile from "./index.js";
import validatedList from "./http-validation.js";

const path = process.argv;

async function printList(valid, result, identifier = '') {

    if (valid) {
        console.log(
            chalk.yellow('Validated List'),
            chalk.black.bgGreen(identifier),
            await validatedList(result)
        );
    } else {
        console.log(
            chalk.yellow('Link List'),
            chalk.black.bgGreen(identifier),
            result

        );
    }

}

async function textProcess(args) {
    const path = args[2];
    const valid = args[3] === '--valid';

    try {
        fs.lstatSync(path)
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('Invalid Path or Directory');
            return;
        }
    }

    if (fs.lstatSync(path).isFile()) {
        const result = await getFile(path);
        printList(valid, result)
    } else if (fs.lstatSync(path).isDirectory()) {
        const files = await fs.promises.readdir(path);
        files.forEach(async (fileName) => {
            const list = await getFile(`${path}/${fileName}`);
            printList(valid, list, fileName);
        });
    }
}

textProcess(path)

