import { v4 as uuidv4 } from 'uuid';

import {
  ALLOWED_USER_FIELDS,
  MESSAGE_NO_USER,
  MESSAGE_WRONG_USER_DATA,
} from '../constants';
import { User } from '../types';

class UserStore {
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
}

export default new UserStore();
