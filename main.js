
import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";
async function main() {
    if (process.argv.length < 3) {
        console.log('Usage: node main.js <input_file>');
        return;
    }
    const pages = await crawlPage(process.argv[2], process.argv[2], {});
    printReport(pages);
}

main();
