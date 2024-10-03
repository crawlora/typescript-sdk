import puppeteer, { Browser } from "puppeteer";

export type FunArgs = { puppeteer: Browser };

export async function browser(func: (args: FunArgs) => Promise<void>) {
  let browser: Browser | null = null;

  try {
    browser = await puppeteer.launch();

    await func({ puppeteer: browser });
  } catch (e) {
    throw e;
  } finally {
    await browser?.close();
  }
}
