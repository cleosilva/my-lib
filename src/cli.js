import chalk from "chalk";
import fs from 'fs';
import getFile from "./index.js";

const path = process.argv;

function printList(result, identifier = '') {
    console.log(
        chalk.yellow('Link List'),
        chalk.black.bgGreen(identifier),
        result

    );
}

async function textProcess(args) {
    const path = args[2];

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
        printList(result)
    } else if (fs.lstatSync(path).isDirectory()) {
        const files = await fs.promises.readdir(path);
        files.forEach(async (fileName) => {
            const list = await getFile(`${path}/${fileName}`);
            printList(list, fileName);
        });
    }
}

textProcess(path)

