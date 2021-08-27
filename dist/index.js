"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const youtubeUrl = ["https://www.youtube.com/c/StudyIQcoachingcenter", "https://www.youtube.com/c/DataStaxDevs", "https://www.youtube.com/c/DefenceSquad", "https://www.youtube.com/user/Niccakun"];
const reg = new RegExp('"rssUrl":"https://www.youtube.com/feeds/videos.xml\\?channel_id=[A-Za-z0-9_-]*"', 'g');
const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36' };
const rss = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const responce = yield axios_1.default.get(url);
    switch (responce.status) {
        case 200:
            const template = yield responce.data;
            const rss = reg.exec(template);
            if (rss != null) {
                const obj = {
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
});
const result = (urls) => {
    urls.forEach(url => rss(url));
};
result(youtubeUrl);
