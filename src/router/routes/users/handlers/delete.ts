import { IncomingMessage } from 'http';
import { validate } from 'uuid';

import { MESSAGE_INVALID_ID, MESSAGE_NO_USER } from "../../../../constants/index.ts";
import UserStore from '../../../../store/index.ts';
import { TServerResponse } from '../../../../types/index.ts';
import { parseReqParams, sendData } from "../../../../utils/index.ts";


export const handleDelete = (
  req: IncomingMessage,
  res: TServerResponse
) => {
  const userId = parseReqParams(req.url?.slice(1))?.[0];

  if (!userId) {
    return sendData(res, MESSAGE_INVALID_ID, 400);
  }

  if (validate(userId)) {
    try {
      UserStore.deleteUser(userId);
      sendData(res, '', 204);
    } catch {
      sendData(res, MESSAGE_NO_USER, 404);
    }
  } else {
    sendData(res, MESSAGE_INVALID_ID, 400);
  }
};