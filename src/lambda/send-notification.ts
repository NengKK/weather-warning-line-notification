import { Callback, Context } from 'aws-lambda';
import { SendNotify } from '../lib/line-notify';
import { IWeatherWarningNews } from '../model/IWeatherWarningNews';
import { buildMessage } from '../lib/build-message';

export async function sendNotification(
    event: AWSLambda.SQSEvent,
    context: Context,
    callback: Callback
) {
    context.callbackWaitsForEmptyEventLoop = false;

    const [record] = event.Records;

    try {
        const news = JSON.parse(record.body) as IWeatherWarningNews;
        const message = buildMessage(news);
        await SendNotify(message);
        console.log(`event=SEND_NOTIFY_WEATHER_WARNING_SUCCESSFUL`);
        callback();
    } catch (error) {
        throw error;
    }
}