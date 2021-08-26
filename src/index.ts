const Fetch = require("node-fetch");
const youtubeUrl: string[] = [ "https://www.youtube.com/c/StudyIQcoachingcenter", "https://www.youtube.com/c/DataStaxDevs", "https://www.youtube.com/c/DefenceSquad" , "https://www.youtube.com/user/Niccakun"];
const reg = new RegExp('"rssUrl":"https://www.youtube.com/feeds/videos.xml\\?channel_id=[A-Za-z0-9_-]*"', 'g');

interface rssObject{
    channel: string,
    rssUrl: string
}

const rss: Function = async ( url: string ) => {

    const responce = await Fetch(url);

    switch(responce.status) {
        case 200:
            const template: string = await responce.text();
            const rss = reg.exec(template);
            if(rss != null) {
                const obj: rssObject = {
                    channel: url,
                    rssUrl: rss[0]
                };
                console.log(obj);
                break;
            }
            console.log("Duck");
            break;
        case 404:
            console.log("Not Found");
            break;
        default:
            console.log("something other happened");
            break;
    }

}

const result: Function = ( urls: string[]) => {
   urls.map( url => rss(url));
}

result(youtubeUrl);