import chalk from "chalk";
import { error } from "console";

function extractLink(arrLinks) {
    return arrLinks.map((object) => Object.values(object).join());
}

async function checkStatus(urlLinks) {
    const arrStatus = await Promise.all(
        urlLinks.map(async (url) => {
            try {
                const response = await fetch(url);
                return response.status;
            } catch (error) {
                return manageErrors(error)
            }
        })
    );
    return arrStatus;
}

function manageErrors(error) {
    if (error.cause.code === 'ENOTFOUND') {
        return 'Link not found!';
    } else {
        return 'Something wrong';
    }
}

export default async function validatedList(linkList) {
    const links = extractLink(linkList);
    const status = await checkStatus(links);
    return linkList.map((object, indice) => ({
        ...object,
        status: status[indice]
    }))
}
