import puppeteer, { Browser, PuppeteerLaunchOptions } from "puppeteer";

export type FunArgs = 
{ 
  puppeteer: Browser
};

export async function browser(
  func: (args: FunArgs) => Promise<void>,
  browserConfig: PuppeteerLaunchOptions = {}
) {
  let browser: Browser | null = null;

  try {

    browser = await puppeteer.launch(browserConfig);

    await func({ puppeteer: browser });

    
  } catch (e) {
    throw e;
  } finally {
    await browser?.close();
  }
}
