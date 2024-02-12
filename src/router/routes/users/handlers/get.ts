import { IncomingMessage } from 'http';
import { validate } from 'uuid';

import { MESSAGE, REQUESTS } from '../../../../constants';
import { TServerResponse, User } from '../../../../types';
import { parseReqParams, sendData } from '../../../../utils';
import { handleDataRequest } from '../../../handleDataRequest';

export const handleGet = (req: IncomingMessage, res: TServerResponse) => {
  const params = parseReqParams(req.url?.slice(1));

  if (params?.length) {
    const userID = params[0]!;

    if (validate(userID)) {
      handleDataRequest(REQUESTS.GET_USER, (user: User[]) => {
        if (user) {
          return sendData(res, user, 200);
        } else {
          return sendData(res, MESSAGE.NO_USER, 404);
        }
      }, userID);
    } else {
      sendData(res, MESSAGE.INVALID_ID, 400);
    }
  } else {
    handleDataRequest(REQUESTS.GET_USERS, (users: User[]) => {
      sendData(res, users, 200);
    });
  }
};

