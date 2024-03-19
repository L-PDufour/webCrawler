
import { crawlPage } from "./crawl.js";

const main = () => {
    if (process.argv.length < 3) {
        console.log('Usage: node main.js <input_file>');
        return;
    }
    crawlPage(process.argv[2], process.argv[2], {});
}

main();
