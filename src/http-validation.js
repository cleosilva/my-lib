function extractLink(arrLinks) {
    return arrLinks.map((object) => Object.values(object).join());
}

async function checkStatus(urlLinks) {
    const arrStatus = await Promise.all(
        urlLinks.map(async (url) => {
            try {
                const response = await fetch(url, { method: "HEAD" });
                return response.status;
            } catch (error) {
                console.log(error.code)
            }
        })
    );
    return arrStatus;
}

export default async function validatedList(linkList) {
    const links = extractLink(linkList);
    const status = await checkStatus(links);
    return status;
}

// [gatinho salsicha](http://gatinhosalsicha.com.br/)