import {DynamoDB} from 'aws-sdk';
import { DYNAMO_DB_TABLE_NAME } from './constant';

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

export async function putAnnounceDate(announceDate: string): Promise<void> {
    const params = {
        TableName: DYNAMO_DB_TABLE_NAME,
        Item: {
            "AnnounceDateTime": {
                S: announceDate
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