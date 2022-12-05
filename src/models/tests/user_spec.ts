import { User, UserStore } from '../user';

const store = new UserStore();

const userRecord: User = {
  firstname: 'samy',
  lastname: 'isaac',
  username: 'SamyIsaac',
  password: 'password123',
};

describe('User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('should have a login method', () => {
    expect(store.login).toBeDefined();
  });

  it('CREATE method should add a user', async () => {
    const result = await store.create(userRecord);
    const { firstname, lastname, username } = result;
    expect({ firstname, lastname, username }).toEqual({
      firstname: 'samy',
      lastname: 'isaac',
      username: 'SamyIsaac',
    });
  });

  it('INDEX method should return all users', async () => {
    const users = await store.index();
    const { firstname, lastname, username } = users[0];

    expect({ firstname, lastname, username }).toEqual({
      firstname: 'samy',
      lastname: 'isaac',
      username: 'SamyIsaac',
    });
  });

  it('SHOW method should return a user by id', async () => {
    const { firstname, lastname, username } = await store.show(1);

    expect({ firstname, lastname, username }).toEqual({
      firstname: 'samy',
      lastname: 'isaac',
      username: 'SamyIsaac',
    });
  });

  it('login method should return a user by first name ,last name ,username and password', async () => {
    // @ts-ignore
    const { firstname, lastname, username } = await store.login(
      'samy',
      'isaac',
      'password123'
    );

    expect({ firstname, lastname, username }).toEqual({
      firstname: 'samy',
      lastname: 'isaac',
      username: 'SamyIsaac',
    });
  });

  it('login method should return a user by first name ,last name ,username and  wrong password', async () => {
    // @ts-ignore
    const result = await store.login('samy', 'isaac', 'wrongPassword');

    expect(result).toEqual(null);
  });

  it('DELETE method should delete a user id', async () => {
    await store.create(userRecord);
    await store.delete(2);
    const result = await store.show(2);

    // @ts-ignore
    expect(result).toBe(undefined);
  });
});
