import axios from 'axios';
import randomUseragent from 'random-useragent'

const reg: RegExp = new RegExp('"rssUrl":"https://www.youtube.com/feeds/videos.xml\\?channel_id=[A-Za-z0-9_-]*"', 'g');

interface rssObject {
  channel: string,
  rssUrl: string
}

const rss: Function = async (url: string) => {

  const responce = await axios.get(url, {
    headers: {
      "user-agent": `${randomUseragent.getRandom()}`
    }
  });

  switch (responce.status) {
    case 200:
      const template: string = await responce.data;
      const rssString = reg.exec(template);
      if (rssString) {
        //       const obj: rssObject = {
        //          channel: url,
        //          rssUrl: rssString[0]
        //        };
        //        return obj;
        console.log(rssString[0])
      }
      return "DUCK";
    case 404:
      console.log("Not Found");
      break;
    default:
      console.log("something other happened");
      break;
  }

}

export const youtubeRss: Function = async (urls: string[]) => {
  const res: string[] = [];
  for (const url of urls) {
    res.push(await rss(url));
  }
  console.log(res);
}

