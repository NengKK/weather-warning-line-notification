import axios, { AxiosRequestConfig } from 'axios';
import { LINE_NOTIFY_ACCESS_TOKEN, LINE_NOTIFY_URL } from '../lib/constant';
const qs = require('qs');

export async function SendNotify(message: string) {
    const data = {
        message
    };
    const options: AxiosRequestConfig = {
        method: 'POST',
        url: LINE_NOTIFY_URL,
        data: qs.stringify(data),
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': `Bearer ${LINE_NOTIFY_ACCESS_TOKEN}` }
    };

    return axios(options);
}
