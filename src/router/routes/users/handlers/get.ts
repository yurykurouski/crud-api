import { IncomingMessage } from 'http';
import { validate } from 'uuid';

import { MESSAGE_INVALID_ID, MESSAGE_NO_USER } from '../../../../constants';
import UserStore from '../../../../store';
import { TServerResponse } from '../../../../types';
import { parseReqParams, sendData } from '../../../../utils';

export const handleGet = (req: IncomingMessage, res: TServerResponse) => {
  const params = parseReqParams(req.url?.slice(1));

  if (params?.length) {
    const userID = params[0]!;

    if (validate(userID)) {
      const user = UserStore.getUser(userID);

      if (user) {
        return sendData(res, user, 200);
      } else {
        return sendData(res, MESSAGE_NO_USER, 404);
      }
    } else {
      sendData(res, MESSAGE_INVALID_ID, 400);
    }
  } else {
    const users = UserStore.getUsers();

    sendData(res, users, 200);
  }
};
