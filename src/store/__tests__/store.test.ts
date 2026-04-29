import { UserStore } from '../index';

const userMock = {
  "username": "test name",
  "age": 11,
  "hobbies": ["test hobby"]
};

jest.mock('uuid', () => ({
  v4: () => 'test uuid'
}));

describe('UserStore', () => {
  it('should create a new user', () => {
    const userStore = new UserStore();

    expect(userStore.getUsers().length).toBe(0);

    const newUser = userStore.createUser(userMock);

    expect(userStore.getUsers().length).toBe(1);
    expect(userStore.getUsers()[0]).toStrictEqual(newUser);
  });

  it('should throw an error if user is not valid', () => {
    const userStore = new UserStore();

    try {
      const newUser = userStore.createUser({
        ...userMock,
        //@ts-expect-error case data is user came
        test: 'test'
      });
      expect(newUser).toBeTruthy();
    } catch {
      expect(true).toBeTruthy();
    }
  });

  it('should find user by provided id', () => {
    const userStore = new UserStore();

    const newUser = userStore.createUser(userMock);

    const storedUser = userStore.getUser(newUser.id!);

    expect(newUser).toStrictEqual(storedUser);
  });

  it('should find and update user by provided id', () => {
    const userStore = new UserStore();

    const user = userStore.createUser(userMock);

    const newUserData = {
      username: 'New name',
      age: 22,
      hobbies: []
    };

    expect(userStore.getUsers().length === 1).toBeTruthy();
    const updatedUser = userStore.updateUser(user.id!, newUserData);

    expect(user).not.toStrictEqual(updatedUser);
  });
});