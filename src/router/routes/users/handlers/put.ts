import { IncomingMessage } from 'http';
import { validate } from 'uuid';

import {
  MESSAGE,
  REQUESTS,
} from '../../../../constants';
import { TServerResponse, User } from '../../../../types';
import { parseReqParams, sendData } from '../../../../utils';
import { handleDataRequest } from '../../../handleDataRequest';

export const handlePut = (req: IncomingMessage, res: TServerResponse) => {
  const userId = parseReqParams(req.url?.slice(1))?.[0];

  if (!userId) {
    return sendData(res, MESSAGE.INVALID_ID, 400);
  }

  if (validate(userId)) {
    const chunks: Uint8Array[] = [];

    req.on('data', (chunk) => {
      chunks.push(chunk);
    });
    req.on('end', () => {
      const data = Buffer.concat(chunks).toString();

      try {
        handleDataRequest(REQUESTS.PUT_USER, (newUser: User) => {
          sendData(res, newUser, 200);
        }, { userId, data: JSON.parse(data) });
      } catch {
        sendData(res, MESSAGE.WRONG_USER_DATA, 400);
      }
    });
  } else {
    sendData(res, MESSAGE.INVALID_ID, 400);
  }
  req.on('error', () => sendData(res, MESSAGE.INTERNAL_ERROR, 500));
};
