import {
  MESSAGE_INVALID_URL,
  METHOD_DELETE,
  METHOD_GET,
  METHOD_POST,
  METHOD_PUT
} from "../../../constants/index.ts";
import { THandleUsersRoute } from "../../../types/index.ts";
import { sendData } from "../../../utils/index.ts";
import { handleDelete } from "./handlers/delete.ts";
import { handleGet } from "./handlers/get.ts";
import { handlePost } from "./handlers/post.ts";
import { handlePut } from "./handlers/put.ts";


export const handleUsersRoute: THandleUsersRoute = (req, method, res) => {
  switch (method) {
    case METHOD_POST:
      handlePost(req, res);
      break;
    case METHOD_GET:
      handleGet(req, res);
      break;
    case METHOD_PUT:
      handlePut(req, res);
      break;
    case METHOD_DELETE:
      handleDelete(req, res);
      break;

    default:
      sendData(res, MESSAGE_INVALID_URL, 404);
  }
};