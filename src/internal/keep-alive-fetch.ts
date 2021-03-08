import http from 'http';
import https from 'https';
import nodeFetch, { RequestInfo, RequestInit, Response } from 'node-fetch';
import type { URL } from 'url';

const options = { keepAlive: true };
const httpAgent = new http.Agent(options);
const httpsAgent = new https.Agent(options);

const agent = (url: URL) => (url.protocol === 'http:' ? httpAgent : httpsAgent);
const fetch = (url: RequestInfo, init?: RequestInit): Promise<Response> => nodeFetch(url, { agent, ...init });

export default fetch;
