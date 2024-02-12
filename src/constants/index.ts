import { readParams } from "../utils";

export const METHOD_GET = 'GET';
export const METHOD_PUT = 'PUT';
export const METHOD_POST = 'POST';
export const METHOD_DELETE = 'DELETE';

export const URL_PATH_USERS = 'users';

export const ALLOWED_USER_FIELDS = ['username', 'age', 'hobbies'];

export const MESSAGE_WRONG_USER_DATA = 'Wrong user data';
export const MESSAGE_INVALID_PARAM = 'Invalid param';
export const MESSAGE_NO_USER = "User doesn't exist";
export const MESSAGE_INVALID_ID = 'Invalid user ID';
export const MESSAGE_INVALID_URL = 'Invalid URL';
export const MESSAGE_INTERNAL_ERROR = 'Please try later';
export const MESSAGE_PROVIDE_PORT = 'Provide a port!';

export const CLI_ARG_MULTI = '--multi';
export const CLI_ARG_MODE = '--mode';

export const IS_MULTI = readParams().includes(CLI_ARG_MULTI);
export const MODE = readParams(CLI_ARG_MODE);

export const PORT = Number(process.env.PORT);

// export const REQUEST_GET_USERS = "GET_USERS";
// export const REQUEST_GET_USER = "GET_USER";
// export const REQUEST_DELETE_USER = "DELETE_USER";
// export const REQUEST_POST_USER = "POST_USER";
// export const REQUEST_PUT_USER = "PUT_USER";

export enum REQUESTS {
  GET_USERS = "GET_USERS",
  GET_USER = "GET_USER",
  DELETE_USER = "DELETE_USER",
  POST_USER = "POST_USER",
  PUT_USER = "PUT_USER",
}

