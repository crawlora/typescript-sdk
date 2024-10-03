import { Browser, Page, PuppeteerLaunchOptions } from "puppeteer";
import puppeteer from 'puppeteer-extra'
import { SequenceOutput } from "../apps";
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import PortalPlugin, { PluginOptions } from 'puppeteer-extra-plugin-portal';
import AnonymizeUa from 'puppeteer-extra-plugin-anonymize-ua';
import { ZProxy } from "./proxy";
import { z } from "zod";
import chromium from '@sparticuz/chromium';
import { CHROME_PATH } from "../config";

const defaultConfigs: PuppeteerLaunchOptions = {
  args: [
    "--no-sandbox",
    '--disable-web-security',
    '--disable-features=IsolateOrigins,site-per-process,SitePerProcess',
    '--flag-switches-begin',
    '--disable-site-isolation-trials',
    '--flag-switches-end',
  ],
  headless: false
}

export type FunArgs = 
{ 
  puppeteer: Browser;
  page: Page;
  output: SequenceOutput
};

puppeteer.use(StealthPlugin())
puppeteer.use(AnonymizeUa())

export async function browser(
  func: (args: FunArgs) => Promise<void>,
  headless = true,
  apikey?: string,
  proxy?: z.infer<typeof ZProxy>,
  remotePortalConfig?: Partial<PluginOptions>,
  browserPath?: string
) {
  let browser: Browser | null = null;
  
  try {

    chromium.setHeadlessMode = true;
    const executablePath = browserPath || await CHROME_PATH();
    
    puppeteer.use(PortalPlugin(remotePortalConfig))
    
    let proxyUrl = '';
    
    if (proxy) {
      const { host, protocol, port } = proxy;
      proxyUrl = `${protocol}://${host}:${port}`;
    }
    
    const proxyLinks = proxyUrl ? `--proxy-server=${proxyUrl}` : '';
    
    const args = [proxyLinks, ...chromium.args, ...defaultConfigs?.args || []]
    .map((v) => v)
    .filter((v) => (([
      '--headless', 
      '', 
      '--single-process' // on desktop this is not a valid options
    ] as string[]).includes(v) ? false : true))

    const conf = {...defaultConfigs, args, headless, executablePath }
    
    browser = await puppeteer.launch(conf);

    const page = await browser.newPage()

    const output = new SequenceOutput(apikey)
    
    await func({ puppeteer: browser, page, output  });

  } catch (e) {
    throw e;
  } finally {
    await browser?.close();
  }
}
