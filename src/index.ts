const Fetch = require("node-fetch");
const url: string = "https://www.youtube.com/user/Niccakun";
const reg = new RegExp('"rssUrl":"https://www.youtube.com/feeds/videos.xml\\?channel_id=\\w+"', 'g');

const html: Function = async () => {

    const responce = await Fetch(url);

    switch(responce.status) {
        case 200:
            const template: string = await responce.text();
            const rss = reg.exec(template);
            if(rss != null) {
                console.log(rss[0])
                break;
            }
            console.log('Fuck');
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