import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import axios, { AxiosRequestConfig } from 'axios';
import { addMessageToQueue } from '../lib/sqs-client';

export async function getWeatherWarningNews(
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) {
  context.callbackWaitsForEmptyEventLoop = false;

  const options: AxiosRequestConfig = {
    method: 'GET',
    url: `http://data.tmd.go.th/api/WeatherWarningNews/v1/?uid=${process.env.UID}.khamdaeng&ukey=${process.env.UKEY}&format=json`
  };
  await axios(options)
    .then(async res => await addMessageToQueue(res.data.replace(/\ufeff/g, ''), ''))
    .catch(error => { throw new Error(error); });

  console.log(`event=GET_WEATHER_WARNING_NEWS_SUCCESSFUL`);
  callback();
}
