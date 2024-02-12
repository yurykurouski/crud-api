import { Serializable } from 'child_process';
import { v4 as uuidv4 } from 'uuid';

import {
  ALLOWED_USER_FIELDS,
  MESSAGE_NO_USER,
  MESSAGE_WRONG_USER_DATA,
  REQUESTS,
} from '../constants';
import { User } from '../types';

export class UserStore {
  private _users: User[];

  constructor() {
    this._users = [];
  }

  private _addUser(user: User): User {
    this._users.push(user);
    return user;
  }

  private _validateUser(user: User): void {
    let count = 0;

    for (const prop in user) {
      count += 1;

      if (!ALLOWED_USER_FIELDS.includes(prop)) {
        throw new Error(MESSAGE_WRONG_USER_DATA);
      }
    }

    if (count < 3) {
      count = 0;
      throw new Error(MESSAGE_WRONG_USER_DATA);
    }
  }

  public getUsers(): User[] {
    return this._users;
  }

  public createUser(data: User) {
    const uuid = uuidv4();

    this._validateUser(data);

    const user = {
      id: uuid,
      ...data,
    };
    return this._addUser(user);
  }
  public getUser(userID: string): User | undefined {
    return this._users.find((u) => u.id === userID);
  }

  public updateUser(userID: string, userData: User): User {
    this._validateUser(userData);

    const userIndex = this._users.findIndex((u) => u.id === userID);

    if (userIndex < 0) {
      throw new Error(MESSAGE_NO_USER);
    }

    return (this._users[userIndex] = {
      id: userID,
      ...userData,
    });
  }

  public deleteUser(userID: string) {
    const index = this._users.findIndex((u) => u.id === userID);

    if (index < 0) {
      throw new Error(MESSAGE_NO_USER);
    }

    this._users = [
      ...this._users.slice(0, index),
      ...this._users.slice(index + 1),
    ];
  }

  public storageRequests(type: REQUESTS, param?: Serializable) {
    switch (type) {
      case REQUESTS.GET_USERS:
        return this.getUsers();
      case REQUESTS.GET_USER:
        return this.getUser(param as string);
      case REQUESTS.DELETE_USER:
        try {
          return this.deleteUser(param as string);
        } catch (e) {
          return MESSAGE_NO_USER;
        }
      case REQUESTS.POST_USER:
        return this.createUser(JSON.parse(param as string));
      case REQUESTS.PUT_USER:
        //@ts-expect-error
        return this.updateUser(param?.userId, param?.data);
    }
  }
}

