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
exports.youtubeRss = void 0;
const axios_1 = __importDefault(require("axios"));
const random_useragent_1 = __importDefault(require("random-useragent"));
const reg = new RegExp('"rssUrl":"https://www.youtube.com/feeds/videos.xml\\?channel_id=[A-Za-z0-9_-]*"', 'g');
const rss = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const responce = yield axios_1.default.get(url, {
        headers: {
            "user-agent": `${random_useragent_1.default.getRandom()}`
        }
    });
    switch (responce.status) {
        case 200:
            const template = yield responce.data;
            const rssString = reg.exec(template);
            if (rssString) {
                //       const obj: rssObject = {
                //          channel: url,
                //          rssUrl: rssString[0]
                //        };
                //        return obj;
                console.log(rssString[0]);
            }
            return "DUCK";
        case 404:
            console.log("Not Found");
            break;
        default:
            console.log("something other happened");
            break;
    }
});
const youtubeRss = (urls) => __awaiter(void 0, void 0, void 0, function* () {
    const res = [];
    for (const url of urls) {
        res.push(yield rss(url));
    }
    console.log(res);
});
exports.youtubeRss = youtubeRss;
