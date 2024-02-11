import { IncomingMessage } from 'http';

import { MESSAGE_WRONG_USER_DATA } from '../../../../constants';
import UserStore from '../../../../store';
import { TServerResponse } from '../../../../types';
import { sendData } from '../../../../utils';

export const handlePost = (req: IncomingMessage, res: TServerResponse) => {
  const chunks: Uint8Array[] = [];

  req.on('data', (chunk) => {
    chunks.push(chunk);
  });
  req.on('end', () => {
    const data = Buffer.concat(chunks).toString();

    try {
      const newUser = UserStore.createUser(JSON.parse(data));

      sendData(res, newUser, 201);
    } catch {
      sendData(res, MESSAGE_WRONG_USER_DATA, 400);
    }
  });
};
