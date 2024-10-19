import { Crawlora } from "../main";
import { ZProxyResponse } from "./types";

export class Proxy extends Crawlora {
    constructor(apiKey?: string, baseUrl?: URL) {
      super(apiKey, baseUrl);
    }
  

    async getProxy(country_code?: string){
        const { data } = await this.api().get('proxy', {params: { country_code: country_code?.toUpperCase() }})
        return ZProxyResponse.parse(data)
    }
  
  }
  