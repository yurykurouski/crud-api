import { IncomingMessage, ServerResponse } from 'http';

export type User = {
  username: string,
  age: number,
  hobbies: string[],
  id?: string,
}

export type TServerResponse = ServerResponse<IncomingMessage> & {
  req: IncomingMessage;
}

export type THandleRequest = (
  req: IncomingMessage,
  res: TServerResponse
) => void;

export type THandleUsersRoute = (
  req: IncomingMessage,
  method: string | undefined,
  res: TServerResponse,
) => void;