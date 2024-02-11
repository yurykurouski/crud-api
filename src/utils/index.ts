import { TServerResponse } from '../types';

export const parseReqParams = (url: string | undefined) =>
  url?.split('/').slice(1);

export const sendData = (res: TServerResponse, data: unknown, code: number) => {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json');

  res.write(JSON.stringify(data));
  res.end();
};
