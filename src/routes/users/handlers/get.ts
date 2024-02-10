import { IncomingMessage } from 'http';

import UserStore from '../../../store/index.ts';
import { TServerResponse } from '../../../types/index.ts';
import { parseReqParams, sendData } from "../../../utils/index.ts";

export const handleGet = (
  req: IncomingMessage,
  res: TServerResponse
) => {
  const params = parseReqParams(req.url?.slice(1));

  if (params?.length) {
    const userID = params[0]!;

    const user = UserStore.getUser(userID);
    sendData(res, user, 200);
  } else {
    const users = UserStore.getUsers();

    sendData(res, users, 200);
  }
};