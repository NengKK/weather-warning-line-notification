import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import axios, { AxiosRequestConfig } from 'axios';
import { IWeatherWarningNews } from '../model/IWeatherWarningNews';
import { getDataByAnnounceDate, putAnnounceDate } from '../lib/dynamo-client';
import { WEATHER_WARNING_QUEUE_NAME } from '../lib/constant';
import { addMessageToQueue } from '../lib/sqs-client';

export async function getWeatherWarningNews(
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) {
  context.callbackWaitsForEmptyEventLoop = false;

  const options: AxiosRequestConfig = {
    method: 'GET',
    url: `http://data.tmd.go.th/api/WeatherWarningNews/v1/?uid=${process.env.UID}&ukey=${process.env.UKEY}&format=json`,
  };
  await axios(options)
    .then(
      async res => {
        const news = JSON.parse(res.data.replace(/\ufeff/g, '')) as IWeatherWarningNews;
        const latestNews = await getDataByAnnounceDate(news.WarningNews.AnnounceDateTime);
        if (latestNews.length === 0) {
          await putAnnounceDate(news.WarningNews.AnnounceDateTime);
          await addMessageToQueue(news, WEATHER_WARNING_QUEUE_NAME); 
        } else {
          console.log(`event=NO_LATEST_WARNING_NEWS_TO_UPDATE, latest_announce_date=${latestNews[0].AnnounceDateTime.S}`);
        }
      }
    )
    .catch(error => {
      throw new Error(error);
    });

  console.log('event=GET_WEATHER_WARNING_NEWS_SUCCESSFUL');
  callback();
}
