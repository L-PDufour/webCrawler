export function printReport(pages) {
    console.log('-'.repeat(80));
    console.log('Report is starting...(this may take a while)');
    const sortedPages = Object.entries(pages).sort((a, b) => b[1] - a[1]);
    for (let [url, count] of sortedPages) {
        console.log(`Found ${count} internal links to ${url}`);
    }
    console.log('-'.repeat(80));
}
