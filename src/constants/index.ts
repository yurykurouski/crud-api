import { readParams } from "../utils";

export enum METHOD {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

export const URL_PATH_USERS = 'users';

export const ALLOWED_USER_FIELDS = ['username', 'age', 'hobbies'];

export enum MESSAGE {
  WRONG_USER_DATA = 'Wrong user data',
  INVALID_PARAM = 'Invalid param',
  NO_USER = "User doesn't exist",
  INVALID_ID = 'Invalid user ID',
  INVALID_URL = 'Invalid URL',
  INTERNAL_ERROR = 'Please try later',
  PROVIDE_PORT = 'Provide a port!',
}

export enum CLI_ARG {
  MULTI = '--multi',
  MODE = '--mode'
}

export const IS_MULTI = readParams().includes(CLI_ARG.MULTI);
export const MODE = readParams(CLI_ARG.MODE);

export const PORT = Number(process.env.PORT);

export enum REQUESTS {
  GET_USERS = "GET_USERS",
  GET_USER = "GET_USER",
  DELETE_USER = "DELETE_USER",
  POST_USER = "POST_USER",
  PUT_USER = "PUT_USER",
}
