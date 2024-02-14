import {
  MESSAGE,
  METHOD,
} from '../../../constants';
import { THandleUsersRoute } from '../../../types';
import { sendData } from '../../../utils';
import { handleDelete } from './handlers/delete';
import { handleGet } from './handlers/get';
import { handlePost } from './handlers/post';
import { handlePut } from './handlers/put';

export const handleUsersRoute: THandleUsersRoute = (req, method, res) => {
  switch (method) {
    case METHOD.POST:
      handlePost(req, res);
      break;
    case METHOD.GET:
      handleGet(req, res);
      break;
    case METHOD.PUT:
      handlePut(req, res);
      break;
    case METHOD.DELETE:
      handleDelete(req, res);
      break;

    default:
      sendData(res, MESSAGE.INVALID_URL, 404);
  }
};
