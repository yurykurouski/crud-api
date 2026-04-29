import { TSendData } from '../types';

export const parseReqParams = (url: string | undefined) =>
  url?.split('/').slice(1);

export const sendData: TSendData = (res, data, code) => {
  res.statusCode = code;

  res.write(JSON.stringify(data));
  res.end();
};

export const readParams = (param?: string) => {
  if (param) {
    const test = process.argv.slice(2);
    for (const element of test) {
      const [key, value] = element.split('=');
      if (key === param) {
        return value;
      }
    }
    return process.argv.slice(2);
  } else {
    return process.argv.slice(2);
  }
};
