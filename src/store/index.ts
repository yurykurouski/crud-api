import { v4 as uuidv4 } from 'uuid';

import { ALLOWED_USER_FIELDS } from "../constants/index.ts";
import { User } from "../types/index.ts";

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
    // TODO: add more validation
    for (let prop in user) {
      if (!ALLOWED_USER_FIELDS.includes(prop)) {
        throw new Error("Invalid user data");
      }
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
    return this._users.find(u => u.id === userID);
  }
}

export default new UserStore();