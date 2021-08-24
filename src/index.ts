const Fetch = require("node-fetch");
const url: string = "https://www.youtube.com/c/Fireship";
const reg = new RegExp('"rssUrl":"https://www.youtube.com/feeds/videos.xml\\?channel_id=\\w+"', 'g');

const html: Function = async () => {

    const responce = await Fetch(url);

    switch(responce.status) {
        case 200:
            const template = await responce.text();
            console.log(reg.exec(template)![0])
            break;
        case 404:
            console.log("Not Found");
            break;
        default:
            console.log("something other happened");
            break;
    }

}

html();