import { MESSAGE, URL_PATH_USERS } from '../constants';
import { THandleRequest } from '../types';
import { parseReqParams, sendData } from '../utils';
import { handleUsersRoute } from './routes/users';

export const router: THandleRequest = (req, res) => {
  const params = parseReqParams(req.url);

  switch (params?.[0]) {
    case URL_PATH_USERS:
      handleUsersRoute(req, req.method, res);
      break;

    default:
      sendData(res, MESSAGE.INVALID_URL, 404);
  }
};
