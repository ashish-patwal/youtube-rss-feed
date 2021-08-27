import axios from 'axios';
const youtubeUrl: string[] = [ "https://www.youtube.com/c/StudyIQcoachingcenter", "https://www.youtube.com/c/DataStaxDevs", "https://www.youtube.com/c/DefenceSquad" , "https://www.youtube.com/user/Niccakun"];
const reg: RegExp = new RegExp('"rssUrl":"https://www.youtube.com/feeds/videos.xml\\?channel_id=[A-Za-z0-9_-]*"', 'g');
const headers: object = { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'};
interface rssObject{
    channel: string,
    rssUrl: string
}

const rss: Function = async ( url: string ) => {

    const responce = await axios.get(url);

    switch(responce.status) {
        case 200:
            const template: string = await responce.data;
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
   urls.forEach( url => rss(url));
}

result(youtubeUrl);