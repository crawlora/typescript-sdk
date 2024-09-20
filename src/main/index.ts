import axios from 'axios'

export class Crawlora {
    protected apikey?: string;
    protected baseUrl: URL = new URL("https://api.crawlora.com/api/v1");

    constructor(
        apiKey?: string,
        baseUrl?: URL,
    ) {
        if (apiKey) {
            this.setApikey(apiKey)
        }

        if (baseUrl) {
            this.setBaseUrl(baseUrl)
        }

        // Initialize the Profile instance using the same API key and base URL
    }

    setBaseUrl(url: URL) {
        this.baseUrl = url
    }

    setApikey(key: string) {
        this.apikey = key
    }


    protected api() {
        return axios.create({
            baseURL: this.baseUrl.toString(),
            headers: {
                "x-api-key": this.apikey
            }
        })
    }
}


