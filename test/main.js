const { Analytics } = require('../dist')

async function main(){
    const crawl = new Analytics()
    const { data } =  await crawl.get()
    console.log(data)
}

main()