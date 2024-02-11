import {
  MESSAGE_INVALID_URL,
  METHOD_DELETE,
  METHOD_GET,
  METHOD_POST,
  METHOD_PUT,
} from '../../../constants';
import { THandleUsersRoute } from '../../../types';
import { sendData } from '../../../utils';
import { handleDelete } from './handlers/delete';
import { handleGet } from './handlers/get';
import { handlePost } from './handlers/post';
import { handlePut } from './handlers/put';

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
