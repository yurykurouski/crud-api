import { IncomingMessage } from 'http';
import { validate } from 'uuid';

import {
  MESSAGE_INTERNAL_ERROR,
  MESSAGE_INVALID_ID,
  MESSAGE_WRONG_USER_DATA,
  REQUESTS,
} from '../../../../constants';
import { TServerResponse, User } from '../../../../types';
import { parseReqParams, sendData } from '../../../../utils';
import { handleDataRequest } from '../../../handleDataRequest';

export const handlePut = (req: IncomingMessage, res: TServerResponse) => {
  const userId = parseReqParams(req.url?.slice(1))?.[0];

  if (!userId) {
    return sendData(res, MESSAGE_INVALID_ID, 400);
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
        sendData(res, MESSAGE_WRONG_USER_DATA, 400);
      }
    });
  } else {
    sendData(res, MESSAGE_INVALID_ID, 400);
  }
  req.on('error', () => sendData(res, MESSAGE_INTERNAL_ERROR, 500));
};
