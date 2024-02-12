import { IncomingMessage } from 'http';
import { validate } from 'uuid';

import { MESSAGE_INVALID_ID, REQUESTS } from '../../../../constants';
import { TServerResponse } from '../../../../types';
import { parseReqParams, sendData } from '../../../../utils';
import { handleDataRequest } from '../../../handleDataRequest';

export const handleDelete = (req: IncomingMessage, res: TServerResponse) => {
  const userId = parseReqParams(req.url?.slice(1))?.[0];

  if (!userId) {
    return sendData(res, MESSAGE_INVALID_ID, 400);
  }

  if (validate(userId)) {
    handleDataRequest(REQUESTS.DELETE_USER, (message: string) => {
      if (!message) {
        sendData(res, '', 204);
      } else {
        sendData(res, message, 404);
      }
    }, userId);
  } else {
    sendData(res, MESSAGE_INVALID_ID, 400);
  }
};
