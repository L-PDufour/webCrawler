import { JSDOM } from 'jsdom';

const normalizeURL = (url) => {
    const urlObj = new URL(url)
    let fullPath = `${urlObj.host}${urlObj.pathname}`
    if (fullPath.length > 0 && fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1)
    }
    return fullPath
}

const getURLsFromHTML = (htmlBody, baseURL) => {

    const dom = new JSDOM(htmlBody)
    const links = dom.window.document.querySelectorAll('a')
    const urls = []
    for (let link of links) {
        urls.push(link.href)
    }
    return urls
}

export const crawlPage = async (url) => {
    try {
        const response = await fetch(url);
        if (response.status !== 200) {
            throw new Error(`Failed to fetch page: ${url}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType.includes('text/html')) {
            console.log(`Skipping non-HTML page: ${url}`);
            return;
        }
        console.log(await response.text());
    } catch (err) {
        console.error(err);
    }
}






