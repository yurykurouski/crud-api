import { IncomingMessage } from "http";
import { validate } from 'uuid';

import { MESSAGE_INVALID_ID, MESSAGE_WRONG_USER_DATA } from "../../../constants/index.ts";
import UserStore from '../../../store/index.ts';
import { TServerResponse } from "../../../types/index.ts";
import { parseReqParams, sendData } from "../../../utils/index.ts";

export const handlePut = (
  req: IncomingMessage,
  res: TServerResponse
) => {
  const userId = parseReqParams(req.url?.slice(1))?.[0];

  if (validate(userId)) {
    const chunks: Uint8Array[] = [];

    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", () => {
      const data = Buffer.concat(chunks).toString();

      try {
        const updatedUser = UserStore.updateUser(userId!, JSON.parse(data));

        sendData(res, updatedUser, 200);
      } catch {
        sendData(res, MESSAGE_WRONG_USER_DATA, 400);
      }
    });
  } else {
    sendData(res, MESSAGE_INVALID_ID, 400);
  }
};