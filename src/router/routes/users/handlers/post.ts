import { IncomingMessage } from 'http';

import { MESSAGE_WRONG_USER_DATA, REQUESTS } from '../../../../constants';
import { TServerResponse, User } from '../../../../types';
import { sendData } from '../../../../utils';
import { handleDataRequest } from '../../../handleDataRequest';

export const handlePost = (req: IncomingMessage, res: TServerResponse) => {
  const chunks: Uint8Array[] = [];

  req.on('data', (chunk) => {
    chunks.push(chunk);
  });
  req.on('end', () => {
    const data = Buffer.concat(chunks).toString();

    try {
      handleDataRequest(REQUESTS.POST_USER, (newUser: User) => {
        sendData(res, newUser, 201);
      }, data);
    } catch {
      sendData(res, MESSAGE_WRONG_USER_DATA, 400);
    }
  });
};
