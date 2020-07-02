import {APIGatewayEvent, Callback, Context} from 'aws-lambda';

export async function getWeatherWarningNews(
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log(`event=GET_WEATHER_WARNING_NEWS_SUCCESSFUL`);
  callback();
}
