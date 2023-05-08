import http from 'http';
import https from 'https';

const options = { keepAlive: false };
const httpAgent = new http.Agent(options);
const httpsAgent = new https.Agent(options);

export const agent = (url: URL) => (url.protocol === 'http:' ? httpAgent : httpsAgent);
