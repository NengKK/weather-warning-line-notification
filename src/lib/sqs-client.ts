import { SQS } from 'aws-sdk';

export async function addMessageToQueue(message: any, queueName: string) {
    console.log(`event=ADD_MESSAGE_TO_QUEUE queue=${queueName}`);
    return new SQS().sendMessage({
        QueueUrl: await getQueueUrl(queueName) || '',
        MessageBody: JSON.stringify(message)
    }).promise();
}

export async function getQueueUrl(queueName: string) {
    const { QueueUrl } = await new SQS().getQueueUrl({ QueueName: queueName }).promise();
    return QueueUrl;
}