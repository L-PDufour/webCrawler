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
    const dom = new JSDOM(htmlBody, { url: baseURL });
    const baseUrlObject = new URL(baseURL);
    const links = dom.window.document.querySelectorAll('a');
    const urls = [];
    for (let link of links) {
        // Resolve relative URLs against the base URL
        const resolvedUrl = new URL(link.href, baseUrlObject).href;
        urls.push(resolvedUrl);
    }
    return urls;
}

export async function crawlPage(baseURL, currentURL, pages) {
    const baseURLObject = new URL(baseURL);
    const currentURLObject = new URL(currentURL);
    if (baseURLObject.hostname !== currentURLObject.hostname) {
        // console.log(`Skipping external link: ${currentURL}`);
        return pages;
    }
    const normalizedURL = normalizeURL(currentURL);
    if (pages[normalizedURL]) {
        pages[normalizedURL]++;
        return pages;
    }
    pages[normalizedURL] = 1;

    try {
        const response = await fetch(currentURL);
        if (response.status !== 200) {
            throw new Error(`Failed to fetch page: ${url}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType.includes('text/html')) {
            // console.log(`Skipping non-HTML page: ${currentURL}`);
            return;
        }

        const htmlBody = await response.text();
        const links = getURLsFromHTML(htmlBody, currentURL);
        // console.log("Links found on page:", links);
        for (let link of links) {
            await crawlPage(baseURL, link, pages);
        }

    } catch (err) {
        console.error(err);
    }
    // console.log(pages);
    return pages;
}






