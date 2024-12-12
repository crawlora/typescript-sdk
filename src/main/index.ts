import axios from "axios";
import { admin_key, auth_key, base_url } from "../config";

export class Crawlora {
  protected apikey?: string;
  protected baseUrl: URL = new URL(base_url);

  constructor(apiKey?: string, baseUrl?: URL) {
    if (apiKey) {
      this.setApikey(apiKey);
    }

    if (baseUrl) {
      this.setBaseUrl(baseUrl);
    }
  }

  setBaseUrl(url: URL) {
    this.baseUrl = url;
  }

  setApikey(key: string) {
    this.apikey = key || auth_key;
  }

  protected api() {
    return axios.create({
      baseURL: this.baseUrl.toString(),
      headers: {
        "x-api-key": this.apikey,
        "x-admin-key": admin_key,
      },
    });
  }
}
