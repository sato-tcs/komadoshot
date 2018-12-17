const program = require('commander');
const puppeteer = require('puppeteer');

program
  .arguments('<uri>')
  .option('--width <width>')
  .option('--height <height>')
  .action(async (uri, cmd) => {
    const width = (cmd.width ? Number(cmd.width) : 800);
    const height = (cmd.height ? Number(cmd.height) : 600);

    const browser = await puppeteer.launch({
      defaultViewport: {
        width: width,
        height: height,
      }
    });

    const page = await browser.newPage();

    await page.goto(uri);
    await page.screenshot({ path: 'screenshot.png' });
    await browser.close();
  });

program.parse(process.argv);
