import { IWeatherWarningNews } from "../model/IWeatherWarningNews";
import { generateThaiDateText } from "./generate-thai-date-text";

export function buildMessage(news: IWeatherWarningNews): string {
    const warningNews = news.WarningNews;
    return `${warningNews.WarningTypeThai} ประกาศ ณ วันที่ ${generateThaiDateText(warningNews.AnnounceDateTime)}\r\n${warningNews.TitleThai}\r\n${warningNews.DocumentFile.replace(/\\/g, '/')}`;
}
