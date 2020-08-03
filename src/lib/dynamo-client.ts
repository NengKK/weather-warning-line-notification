import {DynamoDB} from 'aws-sdk';
import { DYNAMO_DB_TABLE_NAME } from './constant';
import { IWeatherWarningNews } from '../model/IWeatherWarningNews';

export async function getDataByAnnounceDate(announceDate: string): Promise<DynamoDB.ItemList> {
    const params = {
        TableName: DYNAMO_DB_TABLE_NAME,
        ExpressionAttributeValues: {
            ':announceDate': {
                S: announceDate
            }
        },
        FilterExpression: 'AnnounceDateTime = :announceDate'
    };

    const dynamoDb = new DynamoDB();
    return new Promise((resolve, reject) => {
        dynamoDb.scan(params, (err, data) => {
            if (err) {
                reject(err);
            }
            if (data.Items?.length && data.Items.length > 0) {
                resolve(data.Items);
            }
            resolve([]);
        });
    });
}

export async function putNewsLog(news: IWeatherWarningNews): Promise<void> {
    const params = {
        TableName: DYNAMO_DB_TABLE_NAME,
        Item: {
            "AnnounceDateTime": {
                S: news.WarningNews.AnnounceDateTime
            },
            "DocumentFile": {
                S: news.WarningNews.DocumentFile
            }
        }
    };

    const dynamoDb = new DynamoDB();
    return new Promise((resolve, reject) => {
        dynamoDb.putItem(params, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}