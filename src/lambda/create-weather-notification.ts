import {Callback, Context} from 'aws-lambda';

export async function creatWeatherNotification(
  event: AWSLambda.SQSEvent,
  context: Context,
  callback: Callback
) {
  context.callbackWaitsForEmptyEventLoop = false;

  callback();
}
